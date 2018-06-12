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