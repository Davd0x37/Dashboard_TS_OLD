const data = {
  regexComponent: /<([a-zA-Z0-9-_.]+)([a-zA-Z0-9\s='"]+)?\/>/gm
};

export function parseComponent(template: string, components: any): { components: string[]; template: string } {
  const replacedComponents: string[] = [];

  const parsedTemplate = template.replace(data.regexComponent, (matched: string, name: string, atrs: string) => {
    atrs = atrs !== undefined ? atrs.trim() : "";
    if (atrs !== "") {
      replacedComponents.push(name);
      return `<div ${atrs}>${components[name].render() || matched}</div>`;
    }
    replacedComponents.push(name);
    return (components[name].render() || matched) + "\n";
  });
  return {
    components: replacedComponents,
    template: parsedTemplate
  };
}
