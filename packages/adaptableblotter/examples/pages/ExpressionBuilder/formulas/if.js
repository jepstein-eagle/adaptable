import Builder from '../Builder';

function IfBuilder({ config, setConfig }) {
  return (
    <div className="box" style={{ padding: '10px' }}>
      <div className="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '60px' }}>condition</div>
        <Builder
          config={config.condition}
          setConfig={condition => {
            setConfig({
              ...config,
              condition,
            });
          }}
        />
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
      condition: {
        type: 'compare',
        operator: '=',
        operand1: null,
        operand2: null,
      },
      trueValue: null,
      falseValue: null,
    };
  },
  computeResult(config, data, compute) {
    const condition = compute(config.condition, data);
    const trueValue = compute(config.trueValue, data);
    const falseValue = compute(config.falseValue, data);
    return condition ? trueValue : falseValue;
  },
};
