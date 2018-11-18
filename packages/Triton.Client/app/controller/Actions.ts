import Store from "#/store";
import { updateUser } from "./UserManager";

export const updateUserData = (id: string) =>
  updateUser({ id })
    .then(res => Store.dispatch("UpdateUserData", { id, ...res }))
    .catch(() => false);
