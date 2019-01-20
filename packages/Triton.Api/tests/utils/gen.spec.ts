import { generateRandomString } from "@/utils/gen";

describe("Generate random string", () => {
  const size = 15;
  const onlyNumbers = /^\d+$/g;

  it("Should be fixed-length size and contains characters/numbers", () => {
    const req = generateRandomString(size);
    expect(req).toHaveLength(size);
  });

  it("Should generate only numbers", () => {
    const req = generateRandomString(size, true);
    expect(req).toEqual(expect.stringMatching(onlyNumbers));
  });
});
