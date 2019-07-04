import formulas from './formulas';

function Formula({ config, setConfig }) {
  const type = config ? config.type : 'none';
  const Component = formulas[type].component;
  return (
    <div className="builder grow">
      <select
        value={type}
        onChange={e => {
          setConfig(formulas[e.target.value].getDefaultConfig());
        }}
      >
        {Object.keys(formulas).map(key => (
          <option key={key} value={key}>
            {formulas[key].label}
          </option>
        ))}
      </select>
      <Component config={config} setConfig={setConfig} />
    </div>
  );
}

export default Formula;
