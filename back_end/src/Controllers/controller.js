
const User = require('../Model/model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config.js');
const otpGenerator = require('otp-generator');
const userService = require('../services/userService');


/** middleware for verify user */
exports.verifyUser = async (req, res, next) => {
    try {

        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await User.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}


exports.home = async (req, res) => {
    try {
        const result = await User.find();
        if (!result) {
            res.json({
                status: "fail",
                message: "No smart phones found"
            });
        }
        else {
            res.json({
                status: "success",
                message: "Smart phones found",
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
exports.register = async (req, res) => {
    try {
        const { username, password, email, profile } = req.body;

        // check the existing user
        const existUsername = User.findOne({ username }).exec();
        const existEmail = User.findOne({ email }).exec();

        Promise.all([existUsername, existEmail])
            .then(([existingUsername, existingEmail]) => {
                if (existingUsername) {
                    return res.status(400).json({ error: "Please use a unique username" });
                }
                if (existingEmail) {
                    return res.status(400).json({ error: "Please use a unique email" });
                }

                if (password) {
                    bcrypt.hash(password, 10)
                        .then((hashedPassword) => {
                            const user = new User({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email,
                            });

                            // save the user to the database
                            user.save()
                                .then((result) => res.status(201).json({ msg: "User registered successfully" }))
                                .catch((error) => res.status(500).json({ error: "Failed to save user" }));
                        })
                        .catch((error) => {
                            return res.status(500).json({ error: "Failed to hash password" });
                        });
                }
            })
            .catch((error) => {
                console.log(error); // Log the specific error message for debugging
                return res.status(500).json({ error: "Failed to check for existing user" });
            });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {

        User.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // Set isOnline to true
                        user.isOnline = true;

                        // Save the updated user document
                        user.save()
                            .then(() => {
                                // Create jwt token
                                const token = jwt.sign(
                                    {
                                        userId: user._id,
                                        username: user.username
                                    },
                                    ENV.JWT_SECRET,
                                    { expiresIn: "24h" }
                                );

                                return res.status(200).send({
                                    msg: "Login Successful!",
                                    username: user.username,
                                    token
                                });
                            })
                            .catch(error => {
                                return res.status(500).send({ error: "Failed to update user" });
                            });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}

/** GET: http://localhost:8080/api/user/example123 */
exports.getUser = async (req, res) => {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).json({ error: "Invalid Username" });
        }

        const user = await User.findOne({ username }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove password from user data
        const { password, ...rest } = user.toObject();

        return res.status(200).json(rest);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        // const _id = req.params.id;
        const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!result) {
            res.json({
                status: "fail",
                message: "Failed to update"
            });
        }
        else {
            res.json({
                status: "success",
                message: "updated",
                data: result,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}




/** GET: http://localhost:8080/api/generateOTP */
exports.generateOTP = async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}

/** GET: http://localhost:8080/api/verifyOTP */
exports.verifyOTP = async (req, res) => {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
exports.createResetSession = async (req, res) => {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
exports.resetPassword = async (req, res) => {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).send({ error: "Username not found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.updateOne({ username: user.username }, { password: hashedPassword });

            req.app.locals.resetSession = false; // reset session

            return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
            return res.status(500).send({ error: "Unable to update password" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}

exports.logout = async (req, res) => {
    // Clear the session and set isOnline to false
    req.session.destroy();
    User.updateOne({ _id: req.user.userId }, { isOnline: false })
        .then(() => {
            return res.status(200).send({ msg: "Logged out successfully" });
        })
        .catch(error => {
            return res.status(500).send({ error: "Failed to update user" });
        });
};

exports.getUsersByRank = async (req, res) => {
    const { rank } = req.query;
    try {
        const users = await User.find({rank: rank}).exec();

        let resp = users.map((user) => user.toObject()).map(({ password, ...rest}) => rest)
        resp.sort((a,b) => (a.points < b.points ? 1 : ((a.points == b.points) ? 0 : -1)));
        resp = resp.slice(0, 5);
        return res.status(200).json({
            data: resp
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.updateRank = function(req, res) {

    const username = req.body.username;
    const won = req.body.won;
    return User.findOne({ username }).then(user => {
        user.games_played++;

        if(won) {
            user.points++;
            user.games_won++;
            if(user.points >= 10) {
                if(user.in_promotion_series) {
                    user.promotion_series_won++;
                    if(user.promotion_series_won >= 3) {
                        if(user.rank === 'Bronze') user.rank = 'Silver';
                        else if(user.rank === 'Silver') user.rank = 'Gold';
                        user.points = 0;
                        user.promotion_series_won = 0;
                        user.in_promotion_series = false;
                    }
                }
            }
        } else {
            user.games_lost++;
            if(user.in_promotion_series) {
                user.points = Math.max(0, user.points - 5);
                user.promotion_series_won = 0;
                user.in_promotion_series = false;
            } else {
                user.points = Math.max(0, user.points - 1);
            }
        }

        return user.save()
        .then(() => res.status(200).json({ message: "User rank updated successfully" }))
        .catch((error) => res.status(500).json({ error: "Failed to update user rank" }));
    })
    .catch((error) => {console.log(error); res.status(500).json({ error: "Internal server error" })});
};

exports.enterPromotionSeries = function (req, res) {
    const username = req.body.username;
    userService.enterPromotionSeries(username)
        .then(() => res.status(200).json({ message: 'User has entered promotion series' }))
        .catch(err => res.status(500).json({ error: err.message }));

}