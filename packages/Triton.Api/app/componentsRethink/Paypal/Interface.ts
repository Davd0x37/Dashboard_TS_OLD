export interface IAccountResponse {
  name: string;
  email: string;
  phone_number: string;
  verified: string;
  address: { country: string };
  zoneinfo: string;
}
