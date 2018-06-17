export interface IPostFeedOptions { 
  header: { 
    image: string | HTMLElement; 
    title: string; 
    date?: string | number; 
  }; 
  content?: { 
    template: string | HTMLElement; 
  }; 
  footer?: { 
    actions: { 
      like?: number; 
      share?: number; 
      comment?: number; 
    }; 
  }; 
  appendSection?: {}; 
}

export const View = {
  createPost(
    options: IPostFeedOptions,
    appendElem?: any
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
              <p class="feed__date-color">${options.header.date}</p>
            </div>`
          : ""
      }
    </header>
    ${
      options.content
        ? `
          <main class="feed__content">
            ${options.content.template}
          </main>`
        : ""
    }
    
    ${
      options.footer
        ? `
        <footer class="feed__footer feed__footer-background">
        ${
          options.footer.actions.like
            ? `
                <a class="feed__action" href>
                  <i class="fas fa-heart"></i>
                  <p class="feed__action-name">Like</p>
                  <p class="feed__action-counter">(${options.footer.actions.like})</p>
                </a>`
            : ""
        }
        
        ${
          options.footer.actions.comment
            ? `
              <a class="feed__action" href>
                <i class="fas fa-comment"></i>
                <p class="feed__action-name">Comment</p>
                <p class="feed__action-counter">(${options.footer.actions.comment})</p>
              </a>`
            : ""
        }
        ${
          options.footer.actions.share
            ? `
              <a class="feed__action" href>
                <i class="fas fa-share"></i>
                <p class="feed__action-name">Share</p>
                <p class="feed__action-counter">(${options.footer.actions.share})</p>
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
