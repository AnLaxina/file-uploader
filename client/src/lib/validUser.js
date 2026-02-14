import * as z from "zod";

const User = z.object({
  email: z.email(),
});

function isValidEmail(emailInput) {
  const result = User.safeParse({ email: emailInput });

  if (!result.success) {
    return false;
  }
  return true;
}

export default isValidEmail;
