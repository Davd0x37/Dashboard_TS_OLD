import { servicesBasic, servicesOAuth } from "@/config/services";

export const time = {
  expired(fresh: Date, old: Date, addSeconds: number): boolean {
    old.setSeconds(old.getSeconds() + addSeconds);
    return fresh > old;
  }
};

export const selectTokenType = (type: string, name: string): any => {
  switch (type) {
    case "Bearer":
      return servicesOAuth[name];
    case "Basic":
      return servicesBasic[name];
    default:
      return null;
  }
};
