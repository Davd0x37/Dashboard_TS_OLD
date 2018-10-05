import { Component, Method, Prop } from "../decorators";
import { getMetadataKeys } from "./Metadata";
@Component()
class Test {
  @Prop()
  // @ts-ignore
  private name: string = "Test name";

  @Method()
  // @ts-ignore
  private doNothing(): void {
    // DO NOTHING
  }
}

it("should have component decorator and reflect metadata", () => {
  const comp = [['$Component']]
  const props = getMetadataKeys([Test]).map(item => item.properties)
  expect(props).toEqual(expect.arrayContaining(comp))
});

it("should have property and method decorator and reflect metadata", () => {
  const test = new Test();
  const comp = [['$Property:name', '$Method:doNothing']]
  const props = getMetadataKeys([test]).map(item => item.properties)
  expect(props).toEqual(expect.arrayContaining(comp))
});
