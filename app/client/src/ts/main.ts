// // Import polyfill
// import "../public/polyfill.min";

import App from "./App";
App.create();

const ve = document.querySelector(".feed__actions");

const store = {
  oldX: 0,
  newX: 0
};
const feed: HTMLElement = document.querySelector(".main");
document.addEventListener(
  "touchstart",
  (e: any) => (store.oldX = e.changedTouches[0].clientX)
);
document.addEventListener("touchmove", e => {
  store.newX = e.changedTouches[0].clientX;
  if (store.newX - store.oldX > 200) {
    feed.style.transform = "translateX(100%)";
  } else {
    feed.style.transform = "translateX(0)";
  }
});


// // Get initial size and position relative to the viewport
// var collapsed = ve.getBoundingClientRect();

// // LAST

// // Apply a class to control transition when element is expanding
// // elem.classList.add('expanding');
// // // Remove the initial class
// // elem.classList.remove('collapsed');
// // Add the final class
// elem.classList.add('expanded');
// // Get final size and position relative to the viewport
// var expanded = elem.getBoundingClientRect();

// // INVERT

// // Save the values between intial state and final state
// // Use subtractions when manipulating positions to apply in transforms
// var invertedTop = collapsed.top - expanded.top;
// var invertedLeft = collapsed.left - expanded.left;
// // Use divisions when manipulating sizes to apply in scale
// var invertedWidth = collapsed.width / expanded.width;
// var invertedHeight = collapsed.height / expanded.height;

// // PLAY

// // Use transform origin to control the way the animation occurs
// elem.style.transformOrigin = 'top left';
// // Do the magic here, apply your saved values in transform style
// elem.style.transform = 'translate(' + invertedLeft + 'px, ' + invertedTop + 'px) scale(' + invertedWidth + ', ' + invertedHeight + ')'; 
// // Wait for the next frame so all the styles are changend
// requestAnimationFrame(function(){
//   // Add the class to run the transition
//   elem.classList.add('transition'); 
//   // Clear styles
//   elem.style.transform = '';
//   // On transitionEnd remove the classes used control transitions
//   elem.addEventListener('transitionend', function(){
//     elem.style.transformOrigin = '';
//     elem.classList.remove('transition');
//     elem.classList.remove('expanding');
//     // Remove the eventListener
//     elem.removeEventListener('transitionend', false);  
//   });
// }); 