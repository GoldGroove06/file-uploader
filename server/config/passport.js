import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


passport.use(
    new LocalStrategy({ usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findMany({
            where: {
              email: email
            }
          });
        
          if (!user) return done(null, false, { message: "No user found" });
          const isMatch = await bcrypt.compare(password, user[0].password);
          if (!isMatch) return done(null, false, { message: "Incorrect password" }); 
          return done(null, user[0]);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  

  passport.deserializeUser(async (email, done) => {
    try {
      const user = prisma.user.findUnique({
        where: {
            email: email
        }
    });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });