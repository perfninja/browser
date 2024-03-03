import { PerfNinjaConfig } from './types';

import { setConfig } from './config';
import { mark, measure } from './measurer';
import { cacheReleaseId } from './utils';

const init = (params: PerfNinjaConfig) => {
  if (!params || !params.endpoint) {
    throw new Error("Library couldn't work without the endpoint param");
  }

  setConfig(params);
  cacheReleaseId(params.releaseId);
};

export { mark, measure, init };
