export const fixPostgresArray = (arr: string | string[]): string[] =>
  Array.isArray(arr)
    ? arr
    : arr
        .slice(1, -1)
        .replace(/\"/g, "")
        .split(",")
        .concat();
