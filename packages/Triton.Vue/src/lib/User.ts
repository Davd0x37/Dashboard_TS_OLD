import { IUserDocType } from "@/types/Interface";
import gql from "graphql-tag";
import { query, mutation } from "./Api";
import store from "@/store";
import { pick } from "lodash";

export const signIn = async (
  login: string,
  password: string,
  addUser: boolean = false
): Promise<IUserDocType["data"] | boolean> => {
  try {
    const qry = gql`
    {
      authenticateUser(login: "${login}", password: "${password}") {
        session_id
        avatar
        email
        isOnline
        registerDate
        services {
          serviceName
          data
        }
      }
    }
    `;
    const { authenticateUser } = await query(qry);
    if (authenticateUser === null) {
      return false;
    }
    const pickData = pick(
      authenticateUser,
      "session_id",
      "avatar",
      "email",
      "isOnline",
      "registerDate",
      "services"
    );

    if (pickData.services === null) {
      pickData.services = [];
    }

    if (addUser) {
      await store.dispatch("UserManager", {
        action: "Register",
        data: pickData
      });
    }

    await store.dispatch("UserManager", {
      action: "Login",
      data: pickData
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const register = async (
  db: any,
  {
    login,
    password,
    email,
    avatar
  }: {
    login: string;
    password: string;
    email: string;
    avatar?: string;
  }
) => {
  try {
    const qry = gql`
  mutation {
    addUser(data: {
      login: "${login}",
      password: "${password}",
      email: "${email}",
      avatar: "${avatar}",
      isOnline: true
    })
  }
  `;
    const { addUser } = await mutation(qry);

    if (addUser === true) {
      return await signIn(login, password, true);
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
