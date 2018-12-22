export interface IDropletData {
  readonly Total: number;
  readonly LastCreatedDroplet: number;
}

export interface IAccountData {
  readonly Email: string;
  readonly DropletLimit: number;
}

export interface IAccountResponse {
  droplet_limit: number;
  floating_ip_limit: number;
  volume_limit: number;
  email: string;
  uuid: string;
  email_verified: boolean;
  status: string;
  status_message: string;
}

export interface IDropletsResponse {
  droplets: any[];
  meta: {
    total: number;
  }
}