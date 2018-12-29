export interface IServiceTokens {
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly expiresIn?: number;
  readonly tokenType?: string;
  readonly updateTime?: Date;
  readonly state?: string;
}
