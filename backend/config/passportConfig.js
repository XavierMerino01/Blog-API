const passport = require('passport');
require('dotenv').config();
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const prisma = require('./prisma');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(options, async function(jwt_payload, done) {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwt_payload.sub,
            },
        });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;