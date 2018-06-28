import { IStormEvent } from '../../src/components/prediction-chart/models/storm-event';
import { rdiiStormEventSchema } from '../../src/screens/project/schemas/rdii';
import { ValidationError } from 'yup';

describe('rdii schema works properly', () => {
  it('null rdii', () => expect((rdiiStormEventSchema.isValidSync(null))).toEqual(false));
  it('rdii with null attributes', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: null,
    rdii2: null,
    rdii3: null,
    dwp: null,
    flow: null,
    index: null,
    rainfall: null,
  } as IStormEvent<Date>))).toEqual(false));
  it('rdii with empty arrays', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: [],
    rdii2: [],
    rdii3: [],
    dwp: [],
    flow: [],
    index: [],
    rainfall: [],
  } as IStormEvent<Date>))).toEqual(false));
  it('rdii with arrays having one element', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: [2],
    rdii2: [3],
    rdii3: [5],
    dwp: [33.0],
    flow: [31.1],
    index: [new Date('2014-11-01')],
    rainfall: [0.5],
  } as IStormEvent<Date>))).toEqual(true));
  it('rdii with empty rdii2 and rdii3', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: [2],
    dwp: [33.0],
    flow: [31.1],
    index: [new Date('2014-11-01')],
    rainfall: [0.5],
  } as IStormEvent<Date>))).toEqual(true));
  it('properly formed rdii', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: [1.5, 2.5],
    rdii2: [3.5, 2.1],
    rdii3: [0.8, 1.3],
    dwp: [0.5, 2.3],
    flow: [13.1, 15.1],
    index: [new Date('2014-11-01'), new Date('2014-11-08')],
    rainfall: [1.2, 2.1],
  } as IStormEvent<Date>))).toEqual(true));
  it('rdii with arrays of different length', () => expect((rdiiStormEventSchema.isValidSync({
    rdii1: [1.5, 2.5],
    rdii2: [3.5],
    rdii3: [],
    dwp: [0.5, 2.3],
    flow: [13.1],
    index: [new Date('2014-11-01'), new Date('2014-11-08')],
    rainfall: [2.1],
  } as IStormEvent<Date>))).toEqual(false));
});

