// User document type
export interface IUserDocType {
  data: {
    session_id: string;
    avatar: string;
    email: string;
    registerDate: string;
    isOnline: boolean;
    // role: string;
    services?: [
      {
        serviceName: string;
        data: string;
      }
    ];
  };
}

export interface IAction {
  action: string;
}

export type IUserManager = IAction & IUserDocType

export interface FnType {
  [key: string]: (
    ...args: any | any[] | Promise<any | any[]>
  ) => any | any[] | Promise<any | any[]>;
}
