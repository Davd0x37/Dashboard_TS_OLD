export interface ISpotify {
  email: string;
  username: string;
  type: string;
}

export interface IDigitalOcean {
  email: string;
  total: number;
  dropletLimit: number;
  lastCreatedDroplet: number;
}

export interface IPaypal {
  username: string;
  email: string;
  phone: string;
  verified: string;
  country: string;
  zoneinfo: string;
}

export interface IUserDetails {
  avatar: string;
  login: string;
  email: string;
}

export interface IUser {
  id: string;
  user: IUserDetails;
  Spotify: ISpotify;
  DigitalOcean: IDigitalOcean;
  Paypal: IPaypal;
}

export interface IServices extends IPaypal, ISpotify, IDigitalOcean {}

export enum Exists {
  NotFound = 1
}
