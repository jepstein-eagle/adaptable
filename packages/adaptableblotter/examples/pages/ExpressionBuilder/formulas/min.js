import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Min',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'min', values: [null, null] };
  },
  computeResult(config, data, compute) {
    return Math.min(...config.values.map(value => compute(value, data)));
  },
};
