import gql from "graphql-tag";
import { find } from "lodash";
import App from "../App";

const UserActions = [
  {
    action: "Change name",
    icon: "signature",
    view: "changeName"
  },
  {
    action: "Change password",
    icon: "lock",
    view: "changePassword"
  },
  {
    action: "Change avatar",
    icon: "user",
    view: "changeAvatar"
  },
  {
    action: "Change email",
    icon: "envelope",
    view: "changeEmail"
  },
  {
    action: "Change settings",
    icon: "cogs",
    view: "changeSettings"
  }
];

export const SearchController = {
  searchAction(action: string) {
    return UserActions.map(el => el).filter(el => el.action.includes(action));
  }
};
