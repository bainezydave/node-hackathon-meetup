const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';


module.exports = function (passport)
{
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) =>
        {
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

                const newUser = {
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: image
                };

                User.findOne({
                    googleID: profile.id
                })
                    .then(user =>
                    {
                        if (user)
                        {
                            done(null, user);
                        } else
                        {
                            new User(newUser)
                                .save()
                                .then(user => done(null, user));
                        }
                    });
        })
    );


    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>
    {
        User.findOne({ id: jwt_payload.sub }, (err, user) =>
        {
            if (err) return done(err, false);
                
            if (user) return done(null, user);
                
            return done(null, false);
        });
    }));


    passport.use(new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => 
        {
            let user = await User.findOne({ email }).catch(done);

            if (!user) return done(null, false);

            if (!user.verifyPassword(password)) return done(null, false);

            return done(null, user);
        }
    ));


    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
};
