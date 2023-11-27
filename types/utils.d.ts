import { GlobalPerfNinjaInstance, PerfNinjaConfig } from './types';
interface GlobalWindow {
    perfninja: GlobalPerfNinjaInstance;
    performance: Performance;
}
export declare const cacheReleaseId: (value?: PerfNinjaConfig['releaseId']) => string | boolean | null;
export declare const globalWindow: GlobalWindow;
export {};
