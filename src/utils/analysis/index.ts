import { pondId, pondNameZhCN } from './variable';

interface IAlalysis {
  history: Array<any>;
  registerAt: any;
  date: any;
  executePerDayAvg: () => number;
  finishPerWeekAvg: () => number;
  numberOfExecutingDays: () => number;
  accumulatedFinished: () => number;
  getHeatmapValuesFrom: (date: any) => Array<{ date: any; count: number }> | undefined;
  getAllHistoryValuesFrom: (date: any) => Array<{ date: any; belong: string; count: number }> | undefined;
  getHistoryByTaskId: (id: number) => Array<{ time: any; type: string }> | undefined;
}

class AlalysisUtil implements IAlalysis {
  public date: any;
  public history: Array<any>;
  public registerAt: any;

  public constructor(history: Array<any>, registerAt: any) {
    this.history = history;
    this.registerAt = registerAt;
    this.date = new Date();
  }

  public executePerDayAvg() {
    const { history, registerAt, date } = this;
    const totalDay = (date - registerAt) / (1000 * 60 * 60 * 24);
    let total = 0;

    history.forEach(({ fromId, toId }) => {
      if (fromId === pondId['execute-pond'] && (toId === pondId['accept-pond'] || toId === pondId['finish-pond'])) {
        total++;
      }
    });

    return total / totalDay;
  }

  public finishPerWeekAvg() {
    const { history, registerAt, date } = this;
    const totalWeek = (date - registerAt) / (1000 * 60 * 60 * 24 * 7);
    let total = 0;

    history.forEach(({ fromId, toId }) => {
      if (fromId === pondId['accept-pond'] && toId === pondId['finish-pond']) {
        total++;
      }
    });

    return total / totalWeek;
  }

  public numberOfExecutingDays() {
    const { history } = this;
    const dateSet = new Set();

    history.forEach(({ dropTime, fromId, toId }) => {
      if (fromId === pondId['execute-pond'] && (toId === pondId['accept-pond'] || toId === pondId['finish-pond'])) {
        // 只加入日期
        dateSet.add(dropTime.slice(0, 10));
      }
    });

    return dateSet.size;
  }

  public accumulatedFinished() {
    return this.history.reduce((acc, { toId }) => (toId === pondId['finish-pond'] ? acc + 1 : acc), 0);
  }

  public getHeatmapValuesFrom(date: any) {
    const { history } = this;
    const curDate = new Date();
    const value = new Map<any, any>();

    // eslint-disable-next-line no-unmodified-loop-condition
    for (const time = new Date(date); time <= curDate; time.setDate(time.getDate() + 1)) {
      const timeStr = time.toISOString().slice(0, 10);
      value.set(timeStr, {
        count: 0,
      });
    }

    history.forEach(({ dropTime: d }) => {
      if (new Date(d) >= date) {
        const dropDate = d.slice(0, 10);
        value.set(dropDate, {
          count: (value.get(dropDate) as any).count + 1,
        });
      }
    });

    const res = [];
    for (const date in value) {
      if (Object.prototype.hasOwnProperty.call(value, date)) {
        res.push({
          date: date,
          count: value.get(date)?.count,
        });
      }
    }

    return res;
  }

  public getAllHistoryValuesFrom(date: any) {
    const { history } = this;
    const curDate = new Date();
    const value: any = {};
    // eslint-disable-next-line no-unmodified-loop-condition
    for (const time = new Date(date); time <= curDate; time.setDate(time.getDate() + 1)) {
      const timeStr = time.toISOString().slice(0, 10);
      value[timeStr] = {};
      for (let belong = 1; belong <= 7; belong++) {
        value[timeStr][belong] = {
          count: 0,
        };
      }
    }

    history.forEach(({ dropTime: d, toId }) => {
      if (new Date(d) >= date) {
        const dropDate = d.slice(0, 10);
        // console.log(value[dropDate][toId]);
        value[dropDate][toId].count += 1;
      }
    });

    const res = [];
    for (const date in value) {
      if (Object.prototype.hasOwnProperty.call(value, date)) {
        for (const toId in value[date]) {
          if (Object.prototype.hasOwnProperty.call(value[date], toId)) {
            res.push({
              date: date,
              belong: pondNameZhCN[toId],
              count: value[date][toId].count,
            });
          }
        }
      }
    }

    return res;
  }

  public getHistoryByTaskId(id: number) {
    const { history } = this;
    const res: any = [];

    history.forEach(({ taskId, toId, dropTime }) => {
      if (id === taskId) {
        res.push({
          time: new Date(dropTime),
          type: pondNameZhCN[toId],
        });
      }
    });

    return res;
  }
}

export default AlalysisUtil;
