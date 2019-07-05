function StringFormula({ config, setConfig }) {
  return (
    <input
      type="text"
      value={config.value}
      onChange={e => {
        setConfig({
          ...config,
          value: e.target.value,
        });
      }}
    />
  );
}

export default {
  label: 'String',
  component: StringFormula,
  getDefaultConfig() {
    return { type: 'string', value: '' };
  },
  computeResult(config) {
    return config.value;
  },
};
