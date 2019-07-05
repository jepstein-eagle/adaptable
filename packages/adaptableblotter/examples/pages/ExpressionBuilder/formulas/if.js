import Builder from '../Builder';

function IfBuilder({ config, setConfig }) {
  return (
    <div className="box" style={{ padding: '10px' }}>
      <div className="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '60px' }}>condition</div>
        <div className="box grow" style={{ padding: '10px' }}>
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
      </div>
      <div className="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '60px' }}>then</div>
        <Builder
          config={config.trueValue}
          setConfig={trueValue => {
            setConfig({
              ...config,
              trueValue,
            });
          }}
        />
      </div>
      <div className="flex">
        <div style={{ width: '60px' }}>else</div>
        <Builder
          config={config.falseValue}
          setConfig={falseValue => {
            setConfig({
              ...config,
              falseValue,
            });
          }}
        />
      </div>
    </div>
  );
}

export default {
  label: 'If',
  component: IfBuilder,
  getDefaultConfig() {
    return {
      type: 'if',
      operator: '=',
      operand1: null,
      operand2: null,
      trueValue: null,
      falseValue: null,
    };
  },
  computeCondition(config, data, compute) {
    const operand1 = compute(config.operand1, data);
    const operand2 = compute(config.operand2, data);
    if (config.operator === '=') return operand1 == operand2;
    if (config.operator === '>') return operand1 > operand2;
    if (config.operator === '<') return operand1 < operand2;
    return null;
  },
  computeResult(config, data, compute) {
    const condition = this.computeCondition(config, data, compute);
    const trueValue = compute(config.trueValue, data);
    const falseValue = compute(config.falseValue, data);
    return condition ? trueValue : falseValue;
  },
};
