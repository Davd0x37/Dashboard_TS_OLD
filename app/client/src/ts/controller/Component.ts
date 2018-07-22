// @TODO: Create single file components in future

// export interface IComponentStructure {
//   template: any;// HTMLTemplateElement | Node | null;
//   script: any;// HTMLScriptElement | Node | null;
//   style: any;// HTMLStyleElement | Node | null;
// }
//
// export class Component {
//   /**
//    * All registered components
//    */
//   private readonly components: string[];
//
//   // /**
//   //  * File components extension
//   //  * @type {string}
//   //  */
//   // private readonly extension: string = ".dfc";
//   //
//   // /**
//   //  * Directory with components
//   //  * @type {string}
//   //  */
//   // private readonly source: string = "components";
//
//   constructor() {
//     this.components = [];
//   }
//
//   public async addComponent(file: string, comp: string[]): Promise<boolean> {
//     const loadedComponent = await this.loadComponent(file);
//     for (const cp of comp) {
//       if (this.components.includes(cp)) {
//         return false;
//       }
//       this.components.push(cp);
//       const destructured = this.destructTemplate(cp, loadedComponent);
//       console.log(cp, destructured)
//       this.registerComponent(cp, destructured);
//     }
//     return true;
//   }
//
//   private async loadComponent(name: string): Promise<Document> {
//     const domParser = new DOMParser();
//     const comp = await fetch(name);
//     const result = await comp.text();
//     return domParser.parseFromString(result, "text/html");
//   }
//
//   private registerComponent(name: string, template: IComponentStructure) {
//     const Comp = class extends HTMLElement {
//       public connectedCallback() {
//         this.attachElement();
//       }
//
//       private attachElement() {
//         const shadowElement = this.attachShadow({ mode: "open" });
//         if (template.style !== null) {
//           shadowElement.appendChild(template.style);
//         }
//         shadowElement.appendChild(template.template.content);
//       }
//     }
//
//     window.customElements.define(name, Comp);
//   }
//
//   private destructTemplate(comp: string, template: Document): IComponentStructure {
//     return {
//       template: template.querySelector(`#${comp}`),
//       script: template.querySelector("script"),
//       style: template.querySelector("style")
//     };
//   }
//
// }