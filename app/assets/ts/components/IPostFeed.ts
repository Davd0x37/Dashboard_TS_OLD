export interface IPostFeedOptions {
  header: {
    image: string | HTMLElement
    title: string
    date?: string
  };
  content?: {
    template: string | HTMLElement
  };
  footer?: {
    actions: string[]
  };
  appendSection?: {}
}

export enum FooterActions {
  LIKE,
  COMMENT,
  SHARE,
}