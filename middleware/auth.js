import { getUser } from "../service/auth.js";

export async function restrictToLoginUserOnly(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) return res.render("login");

  const user = getUser(userId);
  if (!user) return res.render("login");

  req.user = user;

  next();
}

export async function checkAuth(req, res, next) {
  const userId = req.cookies?.uid;

  const user = getUser(userId);

  req.user = user;

  next();
}

export default restrictToLoginUserOnly;
