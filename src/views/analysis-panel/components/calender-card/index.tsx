import React, { FC, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Popover from '../Popover';
import './index.less';

interface ICalenderProps {
  values: any;
  startDate: any;
  endDate: any;
}

const CalenderCard: FC<ICalenderProps> = (props) => {
  const { values, startDate, endDate } = props;
  const [popoverTop, setPopoverTop] = useState(0);
  const [popoverLeft, setPopoverLeft] = useState(0);
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverVisibility, setPopoverVisibility] = useState(false);

  const monthLabels = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

  const weekDayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="calender-card">
      <Popover content={popoverContent} top={popoverTop} left={popoverLeft} visibility={popoverVisibility} />
      <span className="title-style">本月任务总操作情况</span>
      <CalendarHeatmap
        values={values}
        startDate={startDate}
        endDate={endDate}
        monthLabels={monthLabels}
        weekdayLabels={weekDayLabels}
        showWeekdayLabels
        gutterSize={0.5}
        showOutOfRangeDays
        classForValue={(value: any) => {
          if (value === null || value.count === 0) return 'color-empty';

          const colorMapIdx = [0, 5, 10, 15, 20, 25].filter((item) => item <= value.count).length;
          return 'color-rect ' + (colorMapIdx <= 0 ? 'color-empty' : `color-scale-${colorMapIdx}`);
        }}
        tooltipDataAttrs={({ date, count }: { date: any; count: any }) => {
          if (count === null) {
            return { 'data-tooltip': '没有记录' };
          }
          const d = new Date(date);
          return { 'data-tooltip': `${d.getMonth() + 1}月${d.getDate()}日 ${count}次记录` };
        }}
        onMouseOver={(event: any, value: any) => {
          setPopoverVisibility(true);
          setPopoverTop(event.clientY);
          setPopoverLeft(event.clientX);
          setPopoverContent(event.target.getAttribute('data-tooltip'));
        }}
        onMouseLeave={(event: any, value: any) => {
          setPopoverVisibility(false);
        }}
      />
    </div>
  );
};

export default CalenderCard;
