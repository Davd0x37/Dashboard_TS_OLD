import { IPostFeedOptions } from "./components/IPostFeed";
import { View } from "./components/PostFeed";

document.addEventListener(
  "DOMContentLoaded",
  e => {
    const elem: any = View.createPost({
      header: {
        image: "../public/img/avatar.jpg",
        title: "Lorem ipsum",
        date: Date.now()
      },
      content: {
        template: `
          <div>
            <!--<h1>Hello retards</h1>-->
            <main>
                <p>Lorem ipsum...</p>
            </main>
          </div>
          `
      },
      footer: {
        actions: {
            like: 2,
            share: 20,
            comment: 2
        }
      }
    }, document.querySelector('.timeline'))
  },
  false
);