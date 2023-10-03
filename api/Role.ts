import { UpdateUserDto, User } from "./Users";
import { getAuth, putAuth } from "./_HttpHelpers";

export enum Role {
  Administrator,
  Student,
  CompanyRepresentative,
  Volunteer,
}


/**
 * Change the role of a user based on username
 * @param userName Email / username for target user
 * @param role Role the user is being changed to
 * @returns Updated user object if request was successful, else null
 */
export const updateRole = async (userName: string, role: Role | null): Promise<User | null> => {
  const dto: UpdateUserDto = {
    role: role
  }

  // Find user id for /role/<id> endpoint from email
  const usersResponse = await getAuth('/users');
  const usersJson = await usersResponse?.json();
  const users = usersJson as User[];
  const userId = users.find(usr => usr.email === userName)?.id;

  if (!userId) {
    alert("No such user!");
    return null;
  }

  // Catch Admin trying to change a role without specifying which role
  if (role === null)
    return null;

  const response = await putAuth(`/role/${userId}`, dto);
  const json = await response?.json();
  const user = json as User;

  return user;
}