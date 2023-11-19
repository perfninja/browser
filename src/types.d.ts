export type PerfNinjaInstance = typeof import('./index');

export type PerfNinjaChartId = string;

export type PerfNinjaConfig = {
  /**
   * Unique identifier to separate
   * releases, helps to recognise
   * if load was with cache or not
   */
  releaseId?: string;
};

export type PerfNinjaMeasureOptions = {
  /**
   * Can be used to log only requests from
   * users who load page without cache
   */
  noCache?: boolean;

  /**
   * Name of start point for measure
   *
   * Should be one of NavigationTiming API props
   * or name that was used in mark method before
   * measure method was called
   */
  markName?: string;
};

export type PerfNinjaLogQueueItem = {
  c: PerfNinjaChartId;
  d: PerformanceMeasure['duration'];
};

export type GlobalPerfNinjaInstance = Partial<PerfNinjaInstance> & {
  q?: [];
};

export type GlobalPerfNinjaInstanceQueueItem =
  | ['init', PerfNinjaConfig[]]
  | ['mark', string[]]
  | ['measure', [PerfNinjaChartId, PerfNinjaMeasureOptions][]];

declare global {
  // eslint-disable-next-line no-var
  var perfninja: GlobalPerfNinjaInstance;
}
