export interface ISample<T extends (number|Date)> {
  index: T;
  value: number;
}

export type IDateSignal = Array<ISample<Date>>;