import { PerfNinjaConfig } from './types';

const config: PerfNinjaConfig = {
  releaseId: '',
};

export const setConfig = (params: Partial<PerfNinjaConfig>) => {
  const sanitizedParams = Object.keys(params).reduce(
    (result: Partial<PerfNinjaConfig>, key) => {
      if (typeof config[key as keyof PerfNinjaConfig] !== 'undefined') {
        result[key as keyof PerfNinjaConfig] =
          params[key as keyof PerfNinjaConfig];
      }

      return result;
    },
    {},
  );

  Object.assign(config, sanitizedParams);
};

export const getConfig = () => ({ ...config });
