const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/queries")

const initialize = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await db.getUserByEmail(email);
            if (!user) return done(null, false, { message: "Email is not registered" });

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return done(null, false, { message: "Password is not correct" });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.getUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;