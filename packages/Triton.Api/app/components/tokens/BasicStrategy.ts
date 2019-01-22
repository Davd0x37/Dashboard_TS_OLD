import { ApiTokens, AuthTokens } from "@/entity";
import BaseStrategy from "./BaseStrategy";

export default class BasicStrategy extends BaseStrategy {
  constructor() {
    super();
  }

  public async refresh(id: string, token: AuthTokens): Promise<boolean> {
    return true;
  }
}
