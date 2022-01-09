export interface IPondResult {
  id: number;
  name_cn: string;
  name_en: string;
  info: string;
  sort: number;
}

export interface ITaskResult {
  belong: number;
  describe: string;
  endAt: string;
  id: number;
  importance: number;
  sort: number;
  startAt: string;
  urgency: number;
}
