import { pondNameZhCN } from './variable';

class QuadrantUtil {
  public _tasks: any;

  public constructor(tasks: any) {
    this._tasks = tasks ?? [];
  }

  public get tasks() {
    return this._tasks;
  }

  public set tasks(tasks) {
    this._tasks = tasks ?? [];
  }

  public getData() {
    return this._tasks.map((task: any) => {
      return {
        importance: task.importance,
        urgency: task.urgency,
        x: task.urgency + Math.random() * 0.4 - 0.2,
        y: task.importance + Math.random() * 0.4 - 0.2,
        describe: task.describe,
        belong: pondNameZhCN[task.belong],
      };
    });
  }
}

export default QuadrantUtil;
