export const pipe = <T>(value: T | T[]) => {
  return (...fns: any[]) => {
    return fns.reduce((currentValue: T, currentFunction: any) => {
      return currentFunction(currentValue);
    }, value);
  };
};