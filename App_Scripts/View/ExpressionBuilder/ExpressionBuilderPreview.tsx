import * as React from "react";
import * as ReactDOM from "react-dom";
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { ListGroupItem, ListGroup, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { Expression } from '../../Core/Expression';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Helpers/UserFilterHelper';
import { LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { Helper } from '../../Core/Helpers/Helper';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';

//I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
// since html cannot render a button within a button.
// https://github.com/react-bootstrap/react-bootstrap/issues/1445
// I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
// but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like bad

export interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Expression: Expression
    UserFilters: IUserFilter[]
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
    ColumnsList: Array<IColumn>
    DeleteRange: (ColumnId: string, index: number) => void
    DeleteUserFilterExpression: (ColumnId: string, index: number) => void
    DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void
    ShowPanel: boolean
    ReadOnlyMode? : boolean
}

export class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
    componentWillReceiveProps(nextProps: ExpressionBuilderPreviewProps, nextContext: any) {
        this.ensureSelectedColumnVisible(nextProps.SelectedColumnId)
    }
    render() {
        let columnList = ExpressionHelper.GetColumnListFromExpression(this.props.Expression)
        let previewLists = columnList.map(columnId => {

            // First lets do the column values
            let columnValues = this.props.Expression.ColumnDisplayValuesExpressions.find(colValues => colValues.ColumnName == columnId)
            let columnValuesListgroupItems: JSX.Element[]
            if (columnValues) {
                columnValuesListgroupItems = columnValues.ColumnValues.map(y => {
                    //I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
                    // since html cannot render a button within a button.
                    // https://github.com/react-bootstrap/react-bootstrap/issues/1445
                    // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
                    // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like bad
                    return <ListGroupItem key={y} >
                        <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                            <AdaptableBlotterForm inline>
                                {y}
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                    <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteColumnValue(columnId, y); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                </OverlayTrigger>
                            </AdaptableBlotterForm>
                        </div>
                    </ListGroupItem>
                })
            }

            // Next do the user filter expressions

            let columnUserFilterExpressions = this.props.Expression.UserFilters.find(ne => ne.ColumnName == columnId)
            let columnUserFilterExpressionsListgroupItems: JSX.Element[]
            if (columnUserFilterExpressions) {
                let userFilterExpressions = UserFilterHelper.GetUserFilters(this.props.UserFilters, columnUserFilterExpressions.UserFilterUids);
                if (userFilterExpressions) {
                    columnUserFilterExpressionsListgroupItems = userFilterExpressions.map((ne, index) => {
                        return <ListGroupItem key={ne.Name}>
                            <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                <AdaptableBlotterForm inline>
                                    {ne.Name}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteUserFilterExpression(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                    </OverlayTrigger>
                                </AdaptableBlotterForm>
                            </div>
                        </ListGroupItem>
                    })
                }
            }
            // Finally do the column ranges
            let columnRanges = this.props.Expression.RangeExpressions.find(colValues => colValues.ColumnName == columnId)
            let columnRangesListgroupItems: JSX.Element[]
            if (columnRanges) {
                columnRangesListgroupItems = columnRanges.Ranges.map((y, index) => {
                    if (y.Operator == LeafExpressionOperator.Between) {

                        if (StringExtensions.IsEmpty(y.Operand1) || StringExtensions.IsEmpty(y.Operand2)) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger" >
                                <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <AdaptableBlotterForm inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                        </OverlayTrigger>
                                    </AdaptableBlotterForm>
                                </div>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <AdaptableBlotterForm inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                        </OverlayTrigger>
                                    </AdaptableBlotterForm>
                                </div>
                            </ListGroupItem>
                        }
                    }
                    else {
                        if (StringExtensions.IsEmpty(y.Operand1) || y.Operator == LeafExpressionOperator.Unknown) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger" >
                                <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <AdaptableBlotterForm inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                        </OverlayTrigger>
                                    </AdaptableBlotterForm>
                                </div>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <div className="adaptable_blotter_div_like_button" onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <AdaptableBlotterForm inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button  bsSize="xsmall" style={{ float: 'right' }} onClick={(e) => { this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation(); } }}><Glyphicon glyph="remove" /></Button>
                                        </OverlayTrigger>
                                    </AdaptableBlotterForm>
                                </div>
                            </ListGroupItem>
                        }
                    }
                })
            }
            let column = this.props.ColumnsList.find(x => x.ColumnId == columnId)
            let columnFriendlyName = column ? column.FriendlyName : columnId + GeneralConstants.MISSING_COLUMN
            
            return <div key={columnId + "div"} className={this.props.ReadOnlyMode?"adaptable_blotter_readonly":""}>
                <Button block style={panelHeaderStyle}
                    bsStyle="success"
                    key={columnId + "header"}
                    ref={columnId}
                    onClick={() => this.props.onSelectedColumnChange(columnId)} >
                    {columnFriendlyName}
                </Button>
                <ListGroup>
                    {columnValuesListgroupItems}
                    {columnUserFilterExpressionsListgroupItems}
                    {columnRangesListgroupItems}
                </ListGroup>
            </div>
        })
        return <div>
            {this.props.ShowPanel &&

                <PanelWithButton headerText="Preview" bsStyle="primary" style={{ height: '575px' }} >
                    <div style={divStyle}>
                        {previewLists}
                    </div>
                </PanelWithButton>
            }

            {!this.props.ShowPanel &&

                <div >
                    {previewLists}
                </div>
            }
        </div>
    }

    ensureSelectedColumnVisible(columnId: string) {
        var itemComponent = this.refs[columnId];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
            domNode.scrollIntoView(true);
        }
    }



}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '490px'
}

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}