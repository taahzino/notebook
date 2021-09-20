// Dependencies
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../models/GoogleUserModel');

const config = (passport) => {
    // Passport configuration
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'http://localhost:3000/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, callback) => {
                const newUser = new GoogleUser({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    photo: profile.photos[0].value,
                });

                try {
                    // check if the user already exists
                    const user = await GoogleUser.findOne({ googleId: profile.id });

                    if (user && typeof user === 'object' && user.googleId === profile.id) {
                        callback(null, user);
                    } else {
                        await newUser.save();
                        callback(null, newUser);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
        GoogleUser.findById(id, (err, user) => {
            if (!err && user) {
                callback(null, user.id);
            } else {
                console.error(err);
            }
        });
    });
};

module.exports = config;
