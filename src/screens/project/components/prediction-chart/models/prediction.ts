export interface IPrediction<TIndex extends (string|Date)> {
  index: TIndex[];
  flow: number[];
  rainfall: number[];
  prediction: number[];
}