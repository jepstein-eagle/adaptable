import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Max',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'max', values: [null, null] };
  },
  computeResult(config, data, compute) {
    return Math.max(...config.values.map(value => compute(value, data)));
  },
};
