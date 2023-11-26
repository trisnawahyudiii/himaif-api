import bcryptjs from "bcryptjs";

export function encryptPass(password: string) {
  return bcryptjs.hashSync(password, process.env.SALT);
}

export function ComparePass(password: string, encriptedPassword: string) {
  return bcryptjs.compareSync(password, encriptedPassword);
}
