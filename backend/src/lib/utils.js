import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days into milliseconds
    httpOnly: true, //cookie cannot be accessed by client side script
    samesite: "strict", //cookie is sent only to the same site as the one that originated it
    secure: process.env.NODE_ENV !== "development", //cookie will only be sent over https
  });

  return token;
};
