import { ApiTokens, AuthTokens } from "@/entity";
import { refreshTokens } from "../authentication";
import BaseStrategy from "./BaseStrategy";

export default class BearerStrategy extends BaseStrategy {
  constructor() {
    super();
  }

  public async refresh(
    id: string,
    token: AuthTokens
  ): Promise<boolean> {
    const expired = this.expiredToken(token.updateTime!, token.expiresIn!);
    const req =
      expired && (await refreshTokens(id, token.serviceName));
    return req;
  }

  // public async fetch(): Promise<string> {
    
  //   return "";
  // }
}
