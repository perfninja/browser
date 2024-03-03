export type PerfNinjaInstance = typeof import('./index');

export type PerfNinjaChartId = string;

export type PerfNinjaConfig = {
  /**
   * Endpoint where data will be sent
   */
  endpoint: string;

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

  /**
   * Experiment name
   *
   * If you have made subsequent edits, pass
   * the unique identifier of these edits so
   * that the chart will display a ReferenceLine
   * from when they started working
   */
  experiment?: string;
};

export type PerfNinjaLogQueueItem = {
  c: PerfNinjaChartId;
  d: PerformanceMeasure['duration'];
  e?: string;
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
