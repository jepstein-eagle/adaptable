import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Average',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'average', values: [null, null] };
  },
  computeResult(config, data, compute) {
    const sum = config.values.reduce((result, value) => result + compute(value, data), 0);
    return sum / config.values.length;
  },
};
