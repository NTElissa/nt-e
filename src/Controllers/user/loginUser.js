import db from "../../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = db.users;

const secret = "your-secret-key";

// Token validation function
const authenticateToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        reject("Forbidden");
      } else {
        resolve(user);
      }
    });
  });
};


