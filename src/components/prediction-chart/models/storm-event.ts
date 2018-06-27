export interface IStormEvent<TIndex extends (string|Date)> {
  index: TIndex[];
  flow: number[];
  rainfall: number[];
  dwp: number[];
  rdii1: number[];
  rdii2: number[];
  rdii3: number[];
}