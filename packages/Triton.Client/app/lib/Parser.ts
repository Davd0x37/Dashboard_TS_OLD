const data = {
  regexComponent: /<([a-zA-Z0-9-_.]+)([a-zA-Z0-9\s='"]+)?\/>/gm
};

export function parseComponent(
  template: string,
  components: any
): { readonly components: ReadonlyArray<any>; readonly template: string } {
  const replacedComponents: ReadonlyArray<string> = [];

  const parsedTemplate = template.replace(
    data.regexComponent,
    (matched: string, name: string, atrs: string) => {
      const attrs = atrs !== undefined ? atrs.trim() : "";
      // if (atrs !== "") {
      //   replacedComponents.push(name);
      //   return `<div ${atrs}>${components[name].render() || matched}</div>`;
      // }
      // replacedComponents.push(name);
      return (components[name].render() || matched) + "\n";
    }
  );
  return {
    components: replacedComponents,
    template: parsedTemplate
  };
}
