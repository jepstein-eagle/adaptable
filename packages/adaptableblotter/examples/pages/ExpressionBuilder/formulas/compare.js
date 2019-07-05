import Builder from '../Builder';

function CompareBuilder({ config, setConfig }) {
  return (
    <div className="box" style={{ padding: '10px' }}>
      <div className="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '65px' }}>operand 1</div>
        <Builder
          config={config.operand1}
          setConfig={operand1 => {
            setConfig({
              ...config,
              operand1,
            });
          }}
        />
      </div>
      <div className="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '65px' }}>operator</div>
        <select
          value={config.operator}
          onChange={e => {
            const { value } = e.target;
            setConfig({
              ...config,
              operator: value,
            });
          }}
        >
          <option value="=">=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
        </select>
      </div>
      <div className="flex">
        <div style={{ width: '65px' }}>operand 2</div>
        <Builder
          config={config.operand2}
          setConfig={operand2 => {
            setConfig({
              ...config,
              operand2,
            });
          }}
        />
      </div>
    </div>
  );
}

export default {
  label: 'Compare',
  component: CompareBuilder,
  getDefaultConfig() {
    return {
      type: 'compare',
      operator: null,
      operand1: null,
      operand2: null,
    };
  },
  computeResult(config, data, compute) {
    const operand1 = compute(config.operand1, data);
    const operand2 = compute(config.operand2, data);
    if (config.operator === '=') return operand1 == operand2;
    if (config.operator === '>') return operand1 > operand2;
    if (config.operator === '<') return operand1 < operand2;
    return null;
  },
};
