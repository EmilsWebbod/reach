import { IReachBody, ReachOpts } from './types';
export declare class ReachBody {
    static get(opts: ReachOpts): FormData | string | undefined;
    static parse(opts: ReachOpts): string | FormData;
    static multipartForm(body: IReachBody, fileKeys?: string[]): FormData;
    static encodedForm(body: IReachBody): string;
}
