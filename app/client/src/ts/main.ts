import App from "./App";
App.create()


const searchActions: any = document.querySelectorAll("data-search-item-action")
searchActions.forEach((action: any) => {
  action.addEventListener("click", (e: any) => {
    console.log(e)
  })
})