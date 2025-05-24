import passport from "passport";
let select = "login role status";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { UserModel } from "../models/user";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_SECRET!,
};

passport.use(new Strategy(options, async (payload, done) => {
  try {
    let user = await UserModel.findById(payload._id, select);
    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error, false);
  }
}));

export default passport;