// User document type
export interface IUserDocType {

  session_id: string;
  avatar: string;
  email: string;
  registerDate: string;
  isOnline: boolean;
  services: [{
    serviceName: string;
    data: string;
  }];

}

export interface FnType {
  [key: string]: (
    ...args: any | any[] | Promise<any | any[]>
  ) => any | any[] | Promise<any | any[]>;
}
