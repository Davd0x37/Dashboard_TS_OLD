import gql from "graphql-tag";
import { find } from "lodash";
import App from "../App";
import { UserActions } from "./User";

export const SearchController = {
  searchAction(action: string) {
    return UserActions.map(el => el).filter(el => {
      const act = el.action.toLowerCase();
      return act.includes(action.toLowerCase());
    });
  }
};
