const GitHubStrategy = require("passport-github2");
import prisma from "#/prisma/prisma";
import {
  GITHUB_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "#/utils/variables";
import { hash } from "bcrypt";

module.exports = function (passport) {
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
      if (user) {
        done(null, user);
      } else {
        done(new Error("User not found"), null);
      }
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: ["user:email"], // Ensure this is correct
      },
      async function (_accessToken, _refreshToken, profile, cb) {
        const user = await prisma.user.findFirst({
          where: { githubId: String(profile.id), provider: profile.provider },
        });

        if (!user) {
          const name = profile.displayName || profile.username;
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value // Get email
              : null; // Handle case where no email is available

          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: await hash(`${profile.provider}/12345`, 10), // Dummy password
              githubId: String(profile.id),
              provider: profile.provider,
              avatar: profile.photos[0]?.value,
            },
          });
          return cb(null, newUser);
        }

        return cb(null, user);
      }
    )
  );
};
