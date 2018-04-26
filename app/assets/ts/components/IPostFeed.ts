export interface IPostFeedOptions {
  header: {
    image: string | HTMLElement
    title: string
    date?: string | number
  };
  content?: {
    template: string | HTMLElement
  };
  footer?: {
    actions: FooterActions[]
  };
  appendSection?: {}
}

export enum FooterActions {
  LIKE,
  COMMENT,
  SHARE,
}