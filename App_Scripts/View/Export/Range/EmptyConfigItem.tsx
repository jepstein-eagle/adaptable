import { IRange } from '../../../Core/Interface/IExportStrategy';
import * as React from "react";
import * as Redux from "redux";
import * as ExportRedux from '../../../Redux/ActionsReducers/ExportRedux'
import {  Col, Row } from 'react-bootstrap';
import { EntityListActionButtons } from '../../Components/Buttons/EntityListActionButtons';

export interface EmptyConfigItemProps extends React.ClassAttributes<EmptyConfigItem> {
  }

export class EmptyConfigItem extends React.Component<EmptyConfigItemProps, {}> {
    render(): any {

        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={rowStyle}>
                <Col xs={12}>
                </Col>
                   </Row>
        </li>
    }
}

let rowStyle = {
    height: '20px',
 }


