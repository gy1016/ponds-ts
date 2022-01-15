import React, { FC, useCallback, useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useDropHistory, useTasks } from '@/hooks/useTaskPonds';
import AnalysisUtil from '@/utils/analysis';
import TaskTraceCard from './components/task-trace-card';
import StatisticsCard from './components/statistics-card';
import CalenderCard from './components/calender-card';
import TaskDoneCount from './components/task-done-count';
import Quadrant from './components/quadrant';
import AllPoolCount from './components/all-pond-count';
import './index.less';

const AnalysisPanel: FC = () => {
  const { user } = useAuth();
  const tasks = useTasks(user?.id);
  const history = useDropHistory(user?.id) || [];

  const curDate: any = new Date();
  const lastMonthDate = new Date();
  const valueLastMonthDate = new Date();
  lastMonthDate.setDate(curDate.getDate() - 31);
  valueLastMonthDate.setDate(curDate.getDate() - 31 - 7);
  const registerAt = new Date(user?.registerAt) || new Date(curDate - 7 * 1000 * 60 * 60 * 24);
  const analysis = new AnalysisUtil(history, registerAt);

  const onSearch = (val: string) => {
    const targetTask = tasks.find((task) => task.describe === val);
    if (!targetTask) {
      return [];
    }
    return analysis.getHistoryByTaskId(targetTask.id);
  };

  const [executePerDayAvg, setExecutePerDayAvg] = useState(0);
  const [numberOfExecutingDays, setNumberOfExecutingDays] = useState(0);
  const [accumulatedFinished, setAccumulatedFinished] = useState(0);
  const [heatmapValues, setHeatmapValues] = useState<Array<any>>([]);
  const [allHistoryValues, setAllHistoryValues] = useState<Array<any>>([]);
  const [chartsSubContainerHeight, setChartsSubContainerHeight] = useState(0);

  const chartsContainer = useCallback((node) => {
    if (node) {
      // 内容区减去中间gap的高度的一半
      setChartsSubContainerHeight((node.clientHeight - 20 - 12) / 2);
      // console.log((node.clientHeight - 20) / 2);
    }
  }, []);

  useEffect(() => {
    analysis.history = history;
    setExecutePerDayAvg(analysis.executePerDayAvg());
    setNumberOfExecutingDays(analysis.numberOfExecutingDays());
    setAccumulatedFinished(analysis.accumulatedFinished());
    setHeatmapValues(analysis.getHeatmapValuesFrom(valueLastMonthDate));
    setAllHistoryValues(analysis.getAllHistoryValuesFrom(lastMonthDate));
  }, [history]);

  return (
    <div className="analysis-panel">
      <div className="tp-statistics-container">
        <TaskTraceCard onSearch={onSearch} />
        <StatisticsCard
          executePerDayAvg={executePerDayAvg}
          numberOfExecutingDays={numberOfExecutingDays}
          accumulatedFinished={accumulatedFinished}
        />
        <CalenderCard values={heatmapValues} startDate={lastMonthDate} endDate={curDate} />
      </div>
      <div className="tp-charts-container" ref={chartsContainer}>
        <TaskDoneCount height={chartsSubContainerHeight} values={heatmapValues} />
        <Quadrant height={chartsSubContainerHeight} />
        <AllPoolCount height={chartsSubContainerHeight} values={allHistoryValues} />
      </div>
    </div>
  );
};

export default AnalysisPanel;
