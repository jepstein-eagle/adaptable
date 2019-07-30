import styled from 'styled-components';

const Table = styled.table`
  td,
  th {
    padding: var(--ab-space-2);
  }
  th {
    border-bottom: 2px solid var(--ab-color-darkgray);
  }
  tr:not(last-child) td {
    border-bottom: 1px solid var(--ab-color-secondarybackground);
  }
`;

export default Table;
