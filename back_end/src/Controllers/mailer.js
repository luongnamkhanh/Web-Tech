const nodemailer = require('nodemailer');
var Mailgen = require('mailgen');

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_MAILER_CLIENT_ID = '609540455854-74fug9tt3laarire4m8974t3c9k0kg49.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//048ASTpRJ9xYWCgYIARAAGAQSNwF-L9Iro0yCc3Mwmz06-JKIxiBblP8rEcwar8Ibe17n6i-66jqTq3NSeZv47V2e8LL0JvubI7Y'
const ADMIN_EMAIL_ADDRESS = 'khanhpro692@gmail.com'
// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})
//   const myAccessTokenObject = await myOAuth2Client.getAccessToken()
//   const myAccessToken = myAccessTokenObject?.token
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

exports.registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    const myAccessToken = myAccessTokenObject?.token
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
    })
    // body of the email
    var email = {
        body: {
            name: username || 'khanh luong',
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
    var emailBody = mailGenerator.generate(email);
    var emailText = mailGenerator.generatePlaintext(email);

    const mailOptions = {
        // from: 'harley.lemke@ethereal.email',
        to: userEmail|| 'khanh.ln205184@sis.hust.edu.vn',
        subject : subject || "Signup Successful",
        html : emailBody
    };

    transporter.sendMail(mailOptions)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }))
}