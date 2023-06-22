const User = require('../models/user');

exports.getUser = function(userId) {
    return User.findById(userId);
};

exports.getAllUsers = function() {
    return User.find({});
};

exports.updateUserStatus = function(userId, status) {
    return User.findById(userId).then(user => {
        user.status = status;
        return user.save();
    });
};

exports.addMatchToUser = function(userId, matchId) {
    return User.findById(userId).then(user => {
        user.current_games.push(matchId);
        return user.save();
    });
};

exports.removeMatchFromUser = function(userId, matchId) {
    return User.findById(userId).then(user => {
        let index = user.current_games.indexOf(matchId);
        if (index > -1) {
            user.current_games.splice(index, 1);
        }
        return user.save();
    });
};

exports.createUser = (username, password, email) => {
    const user = new User({
        username,
        password,
        email
    });

    return user.save();
}

exports.updateRank = function(userId, won) {
    return User.findById(userId).then(user => {
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
            } else {
                user.points = Math.max(0, user.points - 1);
            }
        }

        return user.save();
    });
};

exports.enterPromotionSeries = function(username) {
    return User.findOne({ username }).then(user => {
        if(user.points >= 10) {
            user.in_promotion_series = true;
        } else {
            throw new Error("User does not have enough points to enter promotion series.");
        }

        return user.save();
    });
};
