import "dotenv/config";
import authUser from "./lib/auth.js";
import express from "express";
import expressSession from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

// Route imports
import signupRoute from "./routes/signupRouter.js";
import loginRoute from "./routes/loginRouter.js";
import fileRoute from "./routes/fileRouter.js";
import folderRoute from "./routes/folderRouter.js";

const PORT = 3000;
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Passport setup
app.use(passport.initialize());
app.use(
  expressSession({
    cookie: {
      // 864,000,000 milliseconds is 10 days
      maxAge: 864000000,
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());

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
  } catch (error) {
    done(error);
  }
});
passport.use(new LocalStrategy(authUser));

// Routes
app.get("/", (req, res, next) => res.send("Hello!"));
// Yeah.. for logging out I'm not writing a separate controller and route file for it...
app.get("/api/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.send({ message: "Logged out!" });
  });
});

app.use(signupRoute);
app.use(loginRoute);
app.use(fileRoute);
app.use(folderRoute);

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Port listening on ${PORT}`);
});
