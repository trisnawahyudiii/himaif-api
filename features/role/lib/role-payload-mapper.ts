import type {
  RoleWithAttributes,
  RoleWithUser,
} from "../types/role-with-attributes";

export const rolePayloadMapper = (data: RoleWithAttributes): RoleWithUser => {
  const { id, name, UserRole } = data;

  const users = UserRole.map((val) => ({
    userRoleId: val.id,
    name: val.user.name,
  }));

  return {
    id,
    name,
    users,
  };
};
