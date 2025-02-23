const GoogleStrategy = require("passport-google-oauth20");
import prisma from "#/prisma/prisma";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "#/utils/variables";
import { hash } from "bcrypt";

module.exports = function (passport) {
  // passport.deserializeUser(async function (id, done) {
  //   try {
  //     const user = await prisma.user.findFirst({
  //       where: { id: parseInt(id) },
  //     });
  //     if (user) {
  //       done(null, user);
  //     } else {
  //       done(new Error("User not found"), null);
  //     }
  //   } catch (error) {
  //     done(error, null);
  //   }
  // });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
     // In google.ts strategy callback
async function (_accessToken, _refreshToken, profile, cb) {
  console.log("profile",profile)
  try {
    // First, check if Google user exists
    const existingGoogleUser = await prisma.user.findFirst({
      where: { googleId: String(profile.id) },
    });

    if (existingGoogleUser) return cb(null, existingGoogleUser);

    // Check if email exists from any provider
    const existingEmailUser = await prisma.user.findUnique({
      where: { email: profile._json.email },
    });

    // Merge accounts if email exists
    if (existingEmailUser) {
      const updatedUser = await prisma.user.update({
        where: { id: existingEmailUser.id },
        data: {
          googleId: String(profile.id), // Link Google ID to existing account
          provider: "google",
          avatar: profile?.photos[0]?.value || existingEmailUser.avatar,
        },
      });
      return cb(null, updatedUser);
    }

    // Create new user if email doesn't exist
    const newUser = await prisma.user.create({
      data: {
        name: profile.displayName,
        email: profile._json.email,
        password: await hash(`${profile.provider}/12345`, 10),
        googleId: String(profile.id),
        provider: profile.provider,
        avatar: profile?.photos[0]?.value,
      },
    });
    return cb(null, newUser);
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return cb(error, null);
  }
}
    )
  );
};
