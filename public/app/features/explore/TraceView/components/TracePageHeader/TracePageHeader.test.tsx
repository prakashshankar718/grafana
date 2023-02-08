// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { getAllByText, getByText, render, screen } from '@testing-library/react';
import React from 'react';

import config from 'app/core/config';

import { getTraceName } from '../model/trace-viewer';

import TracePageHeader, { TracePageHeaderEmbedProps } from './TracePageHeader';

const trace = {
  services: [{ name: 'serviceA', numberOfSpans: 1 }],
  spans: [
    {
      traceID: '164afda25df92413',
      spanID: '164afda25df92413',
      operationName: 'HTTP Client',
      serviceName: 'serviceA',
      subsidiarilyReferencedBy: [],
      startTime: 1675602037286989,
      duration: 5685,
      logs: [],
      references: [],
      tags: [],
      processID: '164afda25df92413',
      flags: 0,
      process: {
        serviceName: 'lb',
        tags: [],
      },
      relativeStartTime: 0,
      depth: 0,
      hasChildren: false,
      childSpanCount: 0,
      warnings: [],
    },
    {
      traceID: '164afda25df92413',
      spanID: '164afda25df92413',
      operationName: 'HTTP Client',
      serviceName: 'serviceB',
      subsidiarilyReferencedBy: [],
      startTime: 1675602037286989,
      duration: 5685,
      logs: [],
      references: [],
      tags: [
        {
          key: 'http.url',
          type: 'String',
          value: `/v2/gamma/792edh2w897y2huehd2h89`,
        },
        {
          key: 'http.method',
          type: 'String',
          value: `POST`,
        },
        {
          key: 'http.status_code',
          type: 'String',
          value: `200`,
        },
      ],
      processID: '164afda25df92413',
      flags: 0,
      process: {
        serviceName: 'lb',
        tags: [],
      },
      relativeStartTime: 0,
      depth: 0,
      hasChildren: false,
      childSpanCount: 0,
      warnings: [],
    },
  ],
  traceID: '8bb35a31-eb64-512d-aaed-ddd61887bb2b',
  traceName: 'serviceA: GET',
  processes: {},
  duration: 2355515,
  startTime: 1675605056289000,
  endTime: 1675605058644515,
};

const setup = (propOverrides?: TracePageHeaderEmbedProps) => {
  const defaultProps = {
    canCollapse: false,
    hideSummary: false,
    onSlimViewClicked: () => {},
    onTraceGraphViewClicked: () => {},
    slimView: false,
    trace,
    hideMap: false,
    timeZone: '',
    viewRange: { time: { current: [10, 20] as [number, number] } },
    updateNextViewRangeTime: () => {},
    updateViewRangeTime: () => {},
    ...propOverrides,
  };

  return render(<TracePageHeader {...defaultProps} />);
};

describe('TracePageHeader test', () => {
  it('should render a header ', () => {
    setup();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render nothing if a trace is not present', () => {
    setup({ trace: null } as TracePageHeaderEmbedProps);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByText(/Reset Selection/)).not.toBeInTheDocument();
  });

  it('should render the trace title', () => {
    setup();
    expect(
      screen.getByRole('heading', {
        name: (content) => content.replace(/ /g, '').startsWith(getTraceName(trace!.spans).replace(/ /g, '')),
      })
    ).toBeInTheDocument();
  });

  it('should render the header items', () => {
    setup();

    const headerItems = screen.queryAllByRole('listitem');

    expect(headerItems).toHaveLength(5);
    //                                                        Year-month-day hour-minute-second
    expect(headerItems[0].textContent?.match(/Trace Start:\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}/g)).toBeTruthy();
    expect(headerItems[1].textContent?.match(/Duration:[\d|\.][\.|\d|s][\.|\d|s]?[\d]?/)).toBeTruthy();
    expect(headerItems[2].textContent?.match(/Services:\d\d?/g)).toBeTruthy();
    expect(headerItems[3].textContent?.match(/Depth:\d\d?/)).toBeTruthy();
    expect(headerItems[4].textContent?.match(/Total Spans:\d\d?\d?\d?/)).toBeTruthy();
  });

  it('should render a <SpanGraph>', () => {
    setup();
    expect(screen.getByText(/Reset Selection/)).toBeInTheDocument();
  });

  describe('observes the visibility toggles for various UX elements', () => {
    it('hides the minimap when hideMap === true', () => {
      setup({ hideMap: true } as TracePageHeaderEmbedProps);
      expect(screen.queryByText(/Reset Selection/)).not.toBeInTheDocument();
    });

    it('hides the summary when hideSummary === true', () => {
      const { rerender } = setup({ hideSummary: false } as TracePageHeaderEmbedProps);
      expect(screen.queryAllByRole('listitem')).toHaveLength(5);

      rerender(<TracePageHeader {...({ hideSummary: false, trace: null } as TracePageHeaderEmbedProps)} />);
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      rerender(
        <TracePageHeader
          {...({
            trace: trace,
            hideSummary: true,
            hideMap: false,
            viewRange: { time: { current: [10, 20] } },
          } as unknown as TracePageHeaderEmbedProps)}
        />
      );
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      rerender(
        <TracePageHeader
          {...({
            trace: trace,
            hideSummary: false,
            hideMap: false,
            viewRange: { time: { current: [10, 20] } },
          } as unknown as TracePageHeaderEmbedProps)}
        />
      );
      expect(screen.queryAllByRole('listitem')).toHaveLength(5);
    });
  });

  it('should render the new trace header', () => {
    config.featureToggles.newTraceView = true;
    setup();

    const header = document.querySelector('header');
    const method = getByText(header!, 'POST');
    const status = getByText(header!, '200');
    const url = getByText(header!, '/v2/gamma/792edh2w897y2huehd2h89');
    const duration = getAllByText(header!, '2.36s');
    const timestampPart1 = getByText(header!, '2023-02-05 08:50');
    const timestampPart2 = getByText(header!, ':56.289');
    expect(method).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(duration.length).toBe(2);
    expect(timestampPart1).toBeInTheDocument();
    expect(timestampPart2).toBeInTheDocument();
  });
});
