const data = {
  regex: /{{([^{]+)}}/g,
  // regexComponent: /<([a-zA-Z-_.]+)\/?>([a-zA-Z]+)?(<\/(\1)>)?/gm,
  // regexComponent: /<([a-zA-Z-_.]+)([a-zA-Z\s='"]+)?\/?>([a-zA-Z]+)?(<\/(\1)>)?/gm,
  regexComponent: /<([a-zA-Z0-9-_.]+)([a-zA-Z0-9\s='"]+)?\/>/gm
};

export function parse(template: string, obj: any) {
  return template.replace(data.regex, (_: string, innerValue: string) => {
    return (obj && obj[innerValue]) || "";
  });
}

// <([a-zA-Z]+)>([a-zA-Z]+)?(<\/\1\>)?
// \<(?P<open>[a-zA-Z-_.]+)\>(?P<Content>[a-zA-Z]+)?(?P<Closing>\<\/(?P=open)\>)?
// \<\/?(?P<open>[a-zA-Z-_.]+)\/?\>(?P<Content>[a-zA-Z]+)?(?P<Closing>\<\/(?P=open)\>)?
// Only in JavaScript
// \<\/?(?<Open>[a-zA-Z-_.]+)\/?\>(?<Content>[a-zA-Z]+)?(?<Closing>\<\/(\k<Open>)\>)?
// Instead of ?P use \k for previously named group
// To create group use ?<Name> instead of ?P<Name>
export function parseComponent(template: string, components: any): string {
  return template.replace(data.regexComponent, (matched: string, name: string, atrs: string) => {
    atrs = atrs !== undefined ? atrs.trim() : "";
    if (atrs !== "") {
      return `<div ${atrs}>${components[name].render() || matched}</div>`;
    }
    return (components[name].render() || matched) + "\n";
  });
}

export function extractComponents(template: string): any {
  return template.replace(data.regexComponent, (_: string, name: string) => name);
}

export const domParse = (template: string): Element => {
  const parser = new DOMParser()
  return parser.parseFromString(template, 'text/html').body.firstChild! as Element
}