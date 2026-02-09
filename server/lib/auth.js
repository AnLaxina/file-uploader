import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";

// This is the function that goes into the new LocalStrategy() constructor
export default async function authUser(email, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}
