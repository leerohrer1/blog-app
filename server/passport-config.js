const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bycrypt');

function intialilize(passport, getUserByUsername) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username);

        if (user == null) {
            return done(null, false, { message: 'No user with that username' });
        }
        try {
            if (await bycrypt.compare(password, user.password)) {
                return done(null, user);
            }
            return done(null, false, { message: 'Passsword incorrect' });
        } catch (err) {
            return done(err);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: 'username' }),
        authenticateUser
    );

    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.exports = intialilize;
