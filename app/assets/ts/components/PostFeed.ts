import { IPostFeedOptions } from "./IPostFeed";

/**
 * View.createPost("#under_previous_post", {
 *  header: {
 *    image: 'url_to_image.jpg',
 *    title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit...',
 *    date: Current Date
 *  },
 *  content: {
 *    template: `<div><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p></div>
 *  },
 *  footer: {
 *    actions: ['like', 'share', 'comment']
 *  }
 * })
 */

export const View = {
  createPost(
    options: IPostFeedOptions,
    appendElem?: HTMLElement
  ): HTMLElement | void {
    const elem = document.createElement("article");
    elem.classList.add("feed");

    const template = `
    <header class="feed__header feed__header-background">
      <div class="feed__image">
        <img class="profile__avatar" src="${options.header.image}" alt="avatar">
      </div>
      <div class="feed__title">
        <p class="feed__title-color">
        ${options.header.title}
        </p>
      </div>
      ${
        options.header.date
          ? `
            <div class="feed__date">
              <p class="feed__date-color">10:34AM</p>
            </div>`
          : ""
      }
    </header>
    ${
      options.content
        ? `
          <main class="feed__content">
            <h1>Something boring</h1>
          </main>`
        : ""
    }
    
    ${
      options.footer
        ? `
        ${
          options.footer.actions.like
            ? `<footer class="feed__footer feed__footer-background">
                <a class="feed__action" href>
                  <i class="fas fa-heart"></i>
                  <p class="feed__action-name">Like</p>
                  <p class="feed__action-counter">(3.5k)</p>
                </a>`
            : ""
        }
        
        ${
          options.footer.actions.comment
            ? `
              <a class="feed__action" href>
                <i class="fas fa-comment"></i>
                <p class="feed__action-name">Comment</p>
                <p class="feed__action-counter">(0)</p>
              </a>`
            : ""
        }
        ${
          options.footer.actions.share
            ? `
              <a class="feed__action" href>
                <i class="fas fa-share"></i>
                <p class="feed__action-name">Share</p>
                <p class="feed__action-counter">(1k)</p>
              </a>
              </footer>`
            : ""
        }
        `
        : ""
    }
    
    ${
      options.appendSection
        ? `
    <div class="feed__append">
      
    </div>
    `
        : ""
    }
    `;

    elem.innerHTML = template;

    if (appendElem) {
      appendElem.appendChild(elem);
    } else {
      return elem;
    }
  }
};
