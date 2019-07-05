function BooleanFormula({ config, setConfig }) {
  return (
    <>
      <input
        type="checkbox"
        checked={config.checked}
        onChange={e => {
          setConfig({
            ...config,
            checked: e.target.checked,
          });
        }}
      />{' '}
      {config.checked ? 'true' : 'false'}
    </>
  );
}

export default {
  label: 'Boolean',
  component: BooleanFormula,
  getDefaultConfig() {
    return { type: 'boolean', checked: false };
  },
  computeResult(config) {
    return config.checked;
  },
};
