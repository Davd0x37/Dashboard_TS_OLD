// // Import polyfill
import "../public/polyfill.min";

import App from "./App";
App.create();

// const ve = document.querySelector(".feed__actions");

// const MainView = {
//   moved: false,

//   options: {
//     threshold: 50,
//     right: "100vw",
//     left: "0"
//   },

//   coords: {
//     oldX: 0,
//     newX: 0
//   },

//   element: document.querySelector(".main") as HTMLElement,

//   listener() {
//     this.element.addEventListener(
//       "touchstart",
//       (e: TouchEvent) => (this.coords.oldX = e.changedTouches[0].clientX)
//     );
//     this.element.addEventListener("touchmove", (e: TouchEvent) => {
//       this.coords.newX = e.changedTouches[0].clientX;
//       this.swipeAction();
//     });
//   },

//   swipeAction() {
//     if (this.coords.newX - this.coords.oldX > this.options.threshold) {
//       if (this.moved) return;
//       console.log(this.moved)
//       this.element.style.transform = `translateX(${this.options.right})`;
//       console.log(this.moved)
//       this.moved = true;
//     } else {
//       if (this.moved === false) return;
//       console.log(this.moved)
//       this.element.style.transform = `translateX(${this.options.left})`;
//       console.log(this.moved)
//       this.moved = false;
//     }
//   }
// };

// MainView.listener();
