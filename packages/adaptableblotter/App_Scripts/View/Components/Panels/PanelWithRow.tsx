import * as React from 'react';
import { PanelProps, Row, Col } from 'react-bootstrap';

import { IColItem } from '../../UIInterfaces';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import Panel from '../../../components/Panel';

export interface PanelWithRowProps extends PanelProps {
  // CellInfo: [string, number][]
  colItems: IColItem[];
  cssClassName: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_TABLE_HEADER;
    let className = 'ab_panel-with-button'; // this will change...

    let headerItems = this.props.colItems.map((colItem: IColItem) => {
      return (
        <Col key={colItem.Content + colItem.Size} xs={colItem.Size}>
          {colItem.Content}
        </Col>
      );
    });

    let header = (
      <Row style={{ display: 'flex', alignItems: 'center', fontSize: 'small', padding: '2px' }}>
        {headerItems}
      </Row>
    );

    return (
      <div className={cssClassName}>
        <Panel
          header={header}
          bsSize={'small'}
          className="ab_no_padding_no_margin ab_small-padding-panel-header"
          bsStyle={this.props.bsStyle}
        >
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
