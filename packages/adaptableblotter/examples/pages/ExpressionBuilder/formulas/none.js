function NoneBuilder() {
  return null;
}

export default {
  label: 'Select',
  component: NoneBuilder,
  getDefaultConfig() {
    return null;
  },
  computeResult() {
    return 0;
  },
};
