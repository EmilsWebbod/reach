export type ReachContentTypes =
  | 'application/json'
  | 'multipart/form-data'
  | 'application/x-www-form-urlencoded';

export type IReachBody = Record<string | number, any>;
export type IReachHeaders = Record<string, string>;
export type IReachQuery = Record<string, string>;

export interface IReachOptions
  extends Pick<RequestInit, 'mode' | 'credentials' | 'method'> {
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
