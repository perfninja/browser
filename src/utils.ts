import { GlobalPerfNinjaInstance, PerfNinjaConfig } from './types';

interface GlobalWindow {
  perfninja: GlobalPerfNinjaInstance;
  performance: Performance;
}

const CACHE_LOCAL_STORAGE_KEY = 'perfninja-release-id';

const accessLocalStorage = (value?: string) => {
  try {
    if (value !== undefined) {
      localStorage.setItem(CACHE_LOCAL_STORAGE_KEY, value);

      return true;
    }

    return localStorage.getItem(CACHE_LOCAL_STORAGE_KEY);
  } catch (e) {
    return false;
  }
};

const startupReleaseId = accessLocalStorage();

export const cacheReleaseId = (value?: PerfNinjaConfig['releaseId']) => {
  if (value) {
    accessLocalStorage(value);
  }

  return startupReleaseId;
};

export const globalWindow = (
  typeof window === 'undefined' ? {} : window
) as GlobalWindow;
