import { ReachOpts } from './types';
interface ReachServiceOptions {
    csrf?: {
        cookie: string;
    };
    options?: Partial<ReachOpts>;
    headers?: Headers;
    logout?: (response: Response) => void;
}
export declare class ReachService {
    private _url;
    private opts;
    refreshingToken: boolean;
    constructor(_url: string, opts: ReachServiceOptions);
    url(): string;
    headers(): Headers;
    options(): Partial<ReachOpts>;
    getCSRFHeaderToken(): null | [string, string];
    logout(response: Response): void;
}
export {};
