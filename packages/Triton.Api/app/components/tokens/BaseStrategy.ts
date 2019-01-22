import { ApiTokens, AuthTokens } from "@/entity";

export default abstract class BaseStrategy {
  public abstract refresh(
    id: string,
    token: AuthTokens
  ): Promise<boolean>;

  // public abstract fetch(): Promise<string>;
  // public abstract fixPostgresArray(token: ApiTokens): {[key: string]: string[]};

  protected expiredToken(update: string, expire: number): boolean {
    const old = new Date(update);
    old.setSeconds(old.getSeconds() + expire);
    return new Date() > old;
  }
}
