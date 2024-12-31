// /lib/fetchAppointments.ts

import { users } from "../mock-data/users";

export function mockLogin(mail: string, password: string) {
  const user = users.find((user) => user.email === mail);

  if (user) {
    document.cookie = `token=${user.token}; path=/;`;
    return {
      success: true,
      user,
    };
  } else {
    return {
      success: false,
      message: "Invalid mail or password",
    };
  }
}
