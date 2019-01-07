import { IServiceTokens } from "@/type";

export const USER_ID = "cd64a11c-0000-44f2-9362-6bdc82d035bd";
export const FALSE_ID = "aafac23f-0000-458d-ab9e-3fe7bf18287b";

export const SERVICE = "Custom Service";
export const SERVICE_ARRAY = ["Custom", "Test", "ASDF"];

export const USER = {
  login: "UserSpec",
  email: "user@spec.ts",
  password: "push_me_and_then_just_touch_me_till_i_can_get_my_satisfaction",
  isOnline: true,
  registerDate: new Date()
};

export const TOKENS: IServiceTokens = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  tokenType: "Bearer",
  expiresIn: 36000,
  state: "emptyState"
};

export const TOKENS_UPDATED: IServiceTokens = {
  accessToken: "accessTokenUpdated",
  refreshToken: "refreshTokenUpdated",
  tokenType: "BearerUpdated",
  expiresIn: 36000,
  state: "emptyStateUpdated"
};

export const SERVICE_DATA = JSON.stringify({
  service: "OMG123",
  someData: "LELELELEL"
});

export const SERVICE_DATA_UPDATED = JSON.stringify({
  service: "OMG123",
  someData: "lololo",
  updated: true
});
