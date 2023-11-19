import { PerfNinjaConfig } from './types';

import { setConfig } from './config';
import { mark, measure } from './measurer';
import { cacheReleaseId } from './utils';

const init = (params: PerfNinjaConfig = {}) => {
  setConfig(params);
  cacheReleaseId(params.releaseId);
};

export { mark, measure, init };
