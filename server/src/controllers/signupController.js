import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export async function registerUser(req, res, next) {
  // For testing, I'll just use pre-determined values
  const formValues = req.body;

  try {
    const hashedPassword = await bcrypt.hash(formValues.password, 10);
    const user = await prisma.user.create({
      data: {
        email: formValues.email,
        password: hashedPassword,
      },
    });

    // If registration is successful, log the user in automatically.
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      res.send({ message: "Registered User!" });
    });
  } catch (error) {
    // P2002 is a Prisma error when something is unique but already exists
    if (error.code === "P2002") {
      // HTTP code 409 is conflict so... I guess it's the perfect one?
      res.status(409).send({ message: "Email already exists!" });
    }
  }
}
