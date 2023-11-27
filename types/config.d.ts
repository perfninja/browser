import { PerfNinjaConfig } from './types';
export declare const setConfig: (params: Partial<PerfNinjaConfig>) => void;
export declare const getConfig: () => {
    releaseId?: string | undefined;
};
