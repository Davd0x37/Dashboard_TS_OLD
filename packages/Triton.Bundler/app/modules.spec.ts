import * as modules from "./modules";

it("should return RuleSetRule type", async () =>
  Object.entries(modules).map((el: any) =>
    expect(el[1]()).toHaveProperty("test")
  ));
