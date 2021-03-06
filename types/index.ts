export type ReachContentTypes =
  | 'application/json'
  | 'multipart/form-data'
  | 'application/x-www-form-urlencoded';

export interface IReachBody {
  [key: string]: any;
}

export interface IReachHeaders {
  [key: string]: any;
}

export interface IReachQuery {
  [key: string]: any;
}

export interface IReachOptions extends Pick<RequestInit, 'mode' | 'credentials' | 'method'> {
  type?: ReachContentTypes;
  noJson?: boolean;
  auth?: boolean;
  fileKeys?: string[];
  body?: IReachBody;
  query?: IReachQuery;
  headers?: IReachHeaders;
  usePathAsUrl?: boolean;
  bearerToken?: string;
  logoutOptions?: IReachOptionsLogoutOptions;
}

export interface IReachOptionsLogoutOptions {
  status: number;
}