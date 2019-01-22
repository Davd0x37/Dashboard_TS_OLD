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
        avServices
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
      "services",
      "avServices"
    );

    if (pickData.services === null) {
      pickData.services = [];
    }
    if (pickData.avServices === null) {
      pickData.avServices = [];
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

export const refreshData = async (sessionID: string) => {
  try {
    const qry = gql`
    query {
      updateUserData(session_id: "${sessionID}") {
        serviceName
        data
      }
    }
    `;
    const { updateUserData } = await query(qry);
    return updateUserData;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addService = async (data: any): Promise<boolean> => {
  try {
    const qry = gql`
      mutation {
        addService(data: {
          serviceName: "${data.serviceName}"
          apiURL: "${data.apiURL}"
          tokenService: "${data.tokenService}"
          authorizeURL: "${data.authorizeURL}"
          userScopes: ["${data.userScopes}"]
          clientID: "${data.clientID}"
          clientSecret: "${data.clientSecret}"
          paths: ["${data.paths}"]
          requestedData: ["${data.requestedData}"]
          tokenType: "${data.tokenType}"
          redirectURL: "${data.redirectURL}"
        })
      }
    `;

    const { addService } = await mutation(qry);
    return addService;
  } catch (err) {
    console.log(err);
    return false;
  }
};
