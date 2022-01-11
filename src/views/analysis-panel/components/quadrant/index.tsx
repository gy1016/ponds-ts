import React, { useState, useEffect, FC } from 'react';
import { Scatter } from '@ant-design/charts';
import { useTasks } from '@/hooks/useTaskPonds';
import useAuth from '@/hooks/useAuth';
import QuadrantUtil from '@/utils/analysis/quadrant';
import './index.less';

const Quadrant: FC<any> = (props) => {
  const { height } = props;
  const { user } = useAuth();
  const tasks = useTasks(user?.id);
  const [data, setData] = useState([]);
  const quarantUtil = new QuadrantUtil(tasks);

  useEffect(() => {
    quarantUtil.tasks = tasks;
    setData(quarantUtil.getData());
  }, [tasks]);

  const config: any = {
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'belong',
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#eee',
    },
    size: 6,
    xAxis: {
      min: -6,
      max: 6,
      grid: { line: { style: { stroke: '#ddd', lineDash: [5, 5], opacity: 0.9 } } },
      line: { style: { stroke: '#aaa', opacity: 0.8 } },
    },
    yAxis: {
      min: -6,
      max: 6,
      grid: { line: { style: { stroke: '#ddd', lineDash: [5, 5], opacity: 0.9 } } },
      line: { style: { stroke: '#aaa', opacity: 0.8 } },
    },
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
      labels: [
        { content: '紧急且重要' },
        { content: '重要但不紧急' },
        { content: '不紧急不重要' },
        { content: '紧急但不重要' },
      ],
    },
    tooltip: {
      showTitle: true,
      showMarkers: false,
      // eslint-disable-next-line react/no-unstable-nested-components
      customContent: (_title: any, items: any) => {
        // console.log(title, items);
        const data = items[0]?.data ?? { urgency: 0, importance: 0, belong: '', describe: '' };
        const tooltipItems = [
          { label: '紧急性', value: data.urgency },
          { label: '重要性', value: data.importance },
        ];

        return (
          <>
            <div
              style={{
                margin: '10px 0',
                fontWeight: 700,
              }}
            >
              {data.describe}
            </div>
            <div className="g2-tooltip-items">
              {tooltipItems.map((item, index) => (
                <div
                  className="g2-tooltip-item"
                  style={{
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  key={index}
                >
                  <span
                    className="g2-tooltip-item-label"
                    style={{
                      marginRight: '12px',
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="g2-tooltip-item-value">{item.value}</span>
                </div>
              ))}
            </div>
          </>
        );
      },
    },
  };

  return (
    <div
      id="quadrant-container"
      style={{
        height: height,
      }}
    >
      <span className="chart-style">任务四象限图</span>
      {/* ant design charts 高度为inherit，所以在外面套一个div来改变高度 */}
      {/* 减去span的高度 */}
      <div style={{ height: height - 31 }}>
        <Scatter {...config} />
      </div>
    </div>
  );
};

export default Quadrant;
