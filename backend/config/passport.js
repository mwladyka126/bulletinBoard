const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "637263470774-to1pps5s7cn27s7r77urend6qoccvc8c.apps.googleusercontent.com",
      clientSecret: "PGG5XfRjr-WNv6hqesgqlAL-",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
      console.log(profile);
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});
