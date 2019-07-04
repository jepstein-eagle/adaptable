import { useContext } from 'react';
import { ExpressionContext } from '../index';

function ColumnBuilder({ config, setConfig }) {
  const { columns } = useContext(ExpressionContext);
  return (
    <select
      value={config.value || 'none'}
      onChange={e => {
        const { value } = e.target;
        setConfig({
          ...config,
          value: value === 'none' ? null : value,
        });
      }}
    >
      <option value="none">Select Column</option>
      {columns.map(column => (
        <option key={column.name} value={column.name}>
          {column.label}
        </option>
      ))}
    </select>
  );
}

export default {
  label: 'Column',
  component: ColumnBuilder,
  getDefaultConfig() {
    return { type: 'column', value: null };
  },
  computeResult(config, data) {
    return data[config.value] || 0;
  },
};
