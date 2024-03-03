import { PerfNinjaChartId, PerfNinjaMeasureOptions } from './types';

import { attachEvents } from './events';
import { cacheReleaseId, globalWindow } from './utils';
import { getConfig } from './config';
import { queue } from './queue';

const { performance } = globalWindow;
const PERFNINJA_MEASURE_KEY = 'perfninja_measure';

const getStartMarkName = (markName: PerfNinjaMeasureOptions['markName']) =>
  `perfninja_${markName}`;

/**
 * Allows mark custom (except NavigationTiming)
 * starting points of measures
 *
 * @param markName Start point of measuring
 */
export const mark = (markName: string) => {
  if (!performance || !markName) {
    return;
  }

  performance.mark(getStartMarkName(markName));
};

/**
 * End point of measuring, here we are counting
 * duration between mark and measure methods execution
 *
 * @param chartId ChartId from PerfNinja App
 * @param options Additional params for measuring
 */
export const measure = (
  chartId: PerfNinjaChartId,
  options: PerfNinjaMeasureOptions = {},
) => {
  if (!performance) {
    return;
  }

  const { noCache = false, markName = '' } = options;

  let startPoint = '';

  const performanceEntries: PerformanceEntry[] =
    performance.getEntriesByType('navigation');
  const navigationTiming = performanceEntries[0] as PerformanceNavigationTiming;
  const isNavigationTimingKey =
    !!navigationTiming[markName as keyof PerformanceNavigationTiming];

  /**
   * We have two paths here if markName is one
   * of PerformanceNavigationTiming and random string
   *
   * If it is not a key of PerformanceNavigationTiming
   * then will check if we have performance entry with
   * the same name
   */
  if (isNavigationTimingKey) {
    startPoint = markName;
  } else {
    const perfMark = performance.getEntriesByName(
      getStartMarkName(markName),
    )[0];

    if (perfMark) {
      startPoint = getStartMarkName(markName);
    }
  }

  /**
   * No cache flag shows us if we want to track
   * only requests when user doesn't have cache
   * for resources what are downloading right now
   *
   * When we receive prop releaseId in the init config
   * we store it in localStorage and if next time on
   * init the releaseId prop has changed then we can
   * pretend that user just downloaded new version of
   * resources
   *
   * Important! The releaseId should be changed in sync
   * with the contenthash of your static files
   */
  if ((noCache && cacheReleaseId() === getConfig().releaseId) || !startPoint) {
    return;
  }

  try {
    const measured: PerformanceMeasure = performance.measure(
      PERFNINJA_MEASURE_KEY,
      startPoint,
    );

    performance.clearMeasures(PERFNINJA_MEASURE_KEY);
    performance.clearMarks(getStartMarkName(markName));

    queue.push({ c: chartId, d: measured.duration, e: options.experiment });
    attachEvents();
  } catch (e) {
    if (console && console.warn) {
      console.warn(e);
    }
  }
};
