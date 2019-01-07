/**
 * Convert timestamp to seconds.
 * @param {number} time
 * @returns
 */
export const timeToSeconds = (time: number) => Math.round(time / 1000);

export const hoursFromCreate = (time: string): number => {
  const now = timeToSeconds(Date.now());
  const creationDate = timeToSeconds(Date.parse(time));
  return Math.round((now - creationDate) / (60 * 60));
};
