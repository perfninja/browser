import { PerfNinjaConfig } from './types';
import { mark, measure } from './measurer';
declare const init: (params?: PerfNinjaConfig) => void;
export { mark, measure, init };
