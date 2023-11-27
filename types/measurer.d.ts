import { PerfNinjaChartId, PerfNinjaMeasureOptions } from './types';
/**
 * Allows mark custom (except NavigationTiming)
 * starting points of measures
 *
 * @param markName Start point of measuring
 */
export declare const mark: (markName: string) => void;
/**
 * End point of measuring, here we are counting
 * duration between mark and measure methods execution
 *
 * @param chartId ChartId from PerfNinja App
 * @param options Additional params for measuring
 */
export declare const measure: (chartId: PerfNinjaChartId, options?: PerfNinjaMeasureOptions) => void;
