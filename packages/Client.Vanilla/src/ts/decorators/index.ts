import "reflect-metadata";

type Constructor = (new (...args: any[]) => any) | ((...args: any[]) => any);

export const Component = <T extends Constructor>() => {
  return (target: T) => {
    Reflect.defineMetadata(`$Component`, target, target);
  };
};

export const Prop = () => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(`$Property:${key}`, key, target);
  };
};

export const Method = () => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(`$Method:${key}`, target[key], target);
  };
};

export const Route = (path: string) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(`$Route:${path}`, target[key], target);
  };
};
