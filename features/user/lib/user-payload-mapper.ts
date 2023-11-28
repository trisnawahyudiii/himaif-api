import { CreatedUser, UserWithUserRole } from "../types";

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
    tempatTanggalLahir,
    penyakitKhusus,
  } = user;

  const role = UserRole.map(({ role }) => role.name);

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
    tempatTanggalLahir,
    penyakitKhusus,
    role,
  };
}
