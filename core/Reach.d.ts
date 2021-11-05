import { ReachService } from './ReachService';
import { ReachOpts } from './types';
export declare class Reach {
    private reachService;
    constructor(reachService: ReachService);
    api<T = object>(path: string, optsOverride?: ReachOpts): Promise<T>;
    private url;
    private headers;
    private combineHeaders;
}
