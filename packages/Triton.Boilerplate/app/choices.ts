export default [
  {
    type: "text",
    name: "name",
    initial: "@triton/",
    message: "Component name",
    validate: (val: string) =>
      (val.length >= 3
        ? true
        : "Component name should be longer than 2 chars") &&
      val.split("").pop() !== "/"
  },
  {
    type: "text",
    name: "version",
    initial: "0.0.1",
    message: "Component version",
    validate: (val: string) =>
      val.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}$/g)
        ? true
        : "Version should be semver (x.x.x)"
  },
  {
    type: "text",
    name: "description",
    message: "Component description"
  },
  {
    type: "text",
    name: "repository",
    message: "Repository url"
  },
  {
    type: "text",
    name: "author",
    message: "Author"
  },
  {
    type: "text",
    name: "license",
    message: "License",
    initial: "MIT"
  },
  {
    type: "confirm",
    name: "private",
    message: "Should component be private?",
    initial: "true"
  }
];
