import { FooterActions, IPostFeedOptions } from "./components/IPostFeed";
import { View } from "./components/PostFeed";

document.addEventListener(
  "DOMContentLoaded",
  e => {
    const elem: HTMLElement = View.createPost({
      header: {
        image: "./assets/img/avatar.jpg",
        title: "Lorem ipsum",
        date: Date.now()
      },
      content: {
        template: `
          <div>
            <h1>Hello retards</h1>
            <main>
                <p>Lorem ipsum...</p>
            </main>
          </div>
          `
      },
      footer: {
        actions: [
          FooterActions.LIKE,
          FooterActions.COMMENT,
          FooterActions.SHARE
        ]
      }
    });

    document.querySelector('.timeline').appendChild(elem);
  },
  false
);
