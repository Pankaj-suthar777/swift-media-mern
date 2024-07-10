const jwt = require("jsonwebtoken");

export const createToken = async (data: any) => {
  const token = await jwt.sign(data, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};
