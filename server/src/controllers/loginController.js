import passport from "passport";

export function login(req, res, next) {
  res.send({ message: "Login success", user: req.user });
}

// * Use this for protected routes
export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: "Not logged in!" });
}
