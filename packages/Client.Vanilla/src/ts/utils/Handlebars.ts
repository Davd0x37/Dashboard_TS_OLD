const data = {
  regex: /{{([^{]+)}}/g,
  regexComponent: /<([a-zA-Z-_.]+)\/?>([a-zA-Z]+)?(<\/(\1)>)?/gm
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
  return template.replace(data.regexComponent, (matched: string, name: string) => {
    return (components[name] || matched) + "\n";
  });
}