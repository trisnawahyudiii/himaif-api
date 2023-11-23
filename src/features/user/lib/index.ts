import dotenv from "dotenv";
dotenv.config();

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreatedUser, UserWithUserRole } from "../types";

const SECRET_KEY: jwt.Secret = process.env.SECRET ?? "";

export function createToken(user: CreatedUser) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
}

export function userCreatePayloadMapper(user: UserWithUserRole): CreatedUser {
  const {
    id,
    name,
    email,
    image,
    nim,
    nickName,
    agama,
    address,
    phone,
    gender,
    idLine,
    UserRole,
  } = user;

  const role = UserRole.map(({ role }) => ({ id: role.id, name: role.name }));

  return {
    id,
    name,
    email,
    image,
    nim,
    nickName,
    agama,
    address,
    phone,
    gender,
    idLine,
    role,
  };
}

export function encryptPass(password: string) {
  return bcryptjs.hashSync(password, process.env.SALT);
}

export function ComparePass(password: string, encriptedPassword: string) {
  console.log(bcryptjs.compareSync(password, encriptedPassword))
  return bcryptjs.compareSync(password, encriptedPassword);
}
