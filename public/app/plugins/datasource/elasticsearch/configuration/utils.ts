import { DataSourceSettings } from '@grafana/data';

import { ElasticsearchOptions } from '../types';

const DEFAULT_MAX_SHARDS = 5;

export const coerceOptions = (
  options: DataSourceSettings<ElasticsearchOptions, {}>
): DataSourceSettings<ElasticsearchOptions, {}> => {
  return {
    ...options,
    jsonData: {
      ...options.jsonData,
      timeField: options.jsonData.timeField || '@timestamp',
      maxConcurrentShardRequests: options.jsonData.maxConcurrentShardRequests || DEFAULT_MAX_SHARDS,
      logMessageField: options.jsonData.logMessageField || '',
      logLevelField: options.jsonData.logLevelField || '',
      includeFrozen: options.jsonData.includeFrozen ?? false,
    },
  };
};

export const isValidOptions = (options: DataSourceSettings<ElasticsearchOptions, {}>): boolean => {
  return (
    // timeField should not be empty or nullish
    !!options.jsonData.timeField &&
    // maxConcurrentShardRequests should be a number AND greater than 0
    !!options.jsonData.maxConcurrentShardRequests &&
    // message & level fields should be defined
    options.jsonData.logMessageField !== undefined &&
    options.jsonData.logLevelField !== undefined
  );
};
