import React, { FC } from 'react';
import { Line } from '@ant-design/charts';
import './index.less';

interface ITaskDoneProps {
  height: number;
  values: any;
}

const TaskDoneCount: FC<ITaskDoneProps> = (props) => {
  const { height, values } = props;

  const config: any = {
    data: values,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
    smooth: true,
    annotations: [
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F46640',
      },
      {
        type: 'line',
        start: ['min', 'median'],
        content: '中位数',
        offsetY: -4,
        style: { textBaseline: 'bottom' },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
    tooltip: {
      fields: ['date', 'count'],
      formatter: (datum: any) => {
        return {
          name: '记录数',
          value: datum.count + '次',
        };
      },
    },
  };

  return (
    <div
      className="done-task-inmonth"
      style={{
        height: height,
      }}
    >
      <span className="chart-style">本月任务完成数分布</span>
      <div style={{ height: height - 31 }}>
        <Line {...config} />
      </div>
    </div>
  );
};

export default TaskDoneCount;
