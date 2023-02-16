import React from 'react';

import { SelectableValue } from '@grafana/data';
import { RadioButtonGroup } from '@grafana/ui';

import { changeMetricType } from './MetricAggregationsEditor/state/actions';
import { useDispatch } from '../../hooks/useStatelessReducer';
import { MetricAggregation } from '../../types';

import { useQuery } from './ElasticsearchQueryContext';

type Mode = 'metrics' | 'logs' | 'raw_data' | 'raw_document';

const OPTIONS: Array<SelectableValue<Mode>> = [
  { value: 'metrics', label: 'Metrics' },
  { value: 'logs', label: 'Logs' },
  { value: 'raw_data', label: 'Raw Data' },
  { value: 'raw_document', label: 'Raw Document (deprecated)' },
];

function getCurrentMode(metric: MetricAggregation): Mode {
  const { type } = metric;
  switch (type) {
    case 'logs':
      return 'logs';
    case 'raw_data':
      return 'raw_data';
    case 'raw_document':
      return 'raw_document';
    default:
      return 'metrics';
  }
}

function getRawMetricType(mode: Mode) {
  switch (mode) {
    case 'logs':
      return 'logs';
    case 'raw_data':
      return 'raw_data';
    case 'raw_document':
      return 'raw_document';
    case 'metrics':
      return 'count';
    default:
      // should never happen
      throw new Error(`invalid mode: ${mode}`);
  }
}

type Props = {
  value: MetricAggregation;
};

export const ModeSelector = ({ value }: Props) => {
  const query = useQuery();
  const dispatch = useDispatch();

  const { metrics } = query;
  if (metrics == null || metrics.length === 0) {
    // FIXME: can this really happen, and stay in this state?
    return;
  }

  const firstMetric = metrics[0];

  const currentmode = getCurrentMode(firstMetric);

  const onChangeMode = (newMode: Mode) => {
    dispatch(changeMetricType({ id: firstMetric.id, type: getRawMetricType(newMode) }));
  };

  return <RadioButtonGroup<Mode> options={OPTIONS} value={currentmode} onChange={onChangeMode} />;
};
