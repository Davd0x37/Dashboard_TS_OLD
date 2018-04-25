import { FooterActions, IPostFeedOptions } from "./IPostFeed"

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

const layout = {
  header: {
    image(url: string, style?: string | string[]): string {
      return `
      <div class="feed__image">
        <img src="${url}" class="${style = "profile__avatar"}" alt="avatar">
      </div>
      `
    },
    title(title: string): string {
      return `
      <div class="feed__title">
        <p class="feed__title-color">
            ${title}
        </p>
      </div>
      `
    },
    date(val: string): string {
      return `
      <div class="feed__date">
        <p class="feed__date-color">${val}</p>
      </div>
      `
    }
  },
  content: {
    template(val) {
      return `
      <main class="feed__content">
        <h1>Something boring</h1>
      </main>
      `
    }
  },
  footer: {
    actions(action: FooterActions[] = [FooterActions.LIKE, FooterActions.COMMENT, FooterActions.SHARE]): string {
      let template = `<footer class="feed__footer feed__footer-background">`
      if (action.toString()) {
        template += `s`
      }
      return template
    }
  }
}

export const View = {
  createPost(elem: Element, options: IPostFeedOptions): void {
    console.log(layout.footer.actions([FooterActions.LIKE]))
  }
}
