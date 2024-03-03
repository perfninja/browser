import {
  GlobalPerfNinjaInstance,
  PerfNinjaLogQueueItem,
  GlobalPerfNinjaInstanceQueueItem,
} from './types';

import * as perfNinja from './index';
import { globalWindow } from './utils';

const globalPerfNinja: GlobalPerfNinjaInstance = globalWindow.perfninja || {};
const initialQueue: GlobalPerfNinjaInstanceQueueItem[] =
  globalPerfNinja.q || [];

/**
 * Handle initial queue if
 * user has already used our
 * API before the main script file
 * was loaded by browser
 */
initialQueue.forEach(([methodName, args]) => {
  switch (methodName) {
    case 'init':
      perfNinja.init(args[0]);
      break;
    case 'mark':
      perfNinja.mark(args[0]);
      break;
    case 'measure':
      perfNinja.measure(args[0] && args[0][0], args[0] && args[0][1]);
      break;
    default:
  }
});

export const queue: PerfNinjaLogQueueItem[] = [];
