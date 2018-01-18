import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions'
import { ISharedEntity } from '../../Core/Interface/ITeamSharingStrategy';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyIds from '../../Core/StrategyIds';
import { ICalculatedColumn } from '../../Core/Interface/ICalculatedColumnStrategy';
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, FontWeight, FontStyle, DataType } from '../../Core/Enums';
import { IPlusMinusCondition } from '../../Core/Interface/IPlusMinusStrategy';
import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { ILayout } from '../../Core/Interface/ILayoutStrategy';

interface TeamSharingActionProps extends IStrategyViewPopupProps<TeamSharingActionComponent> {
    Entities: Array<ISharedEntity>
    Columns: Array<IColumn>
    UserFilters: IUserFilter[]
    onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction
    onImportItem: (entity: IConfigEntity, strategy: string) => TeamSharingRedux.TeamSharingImportItemAction
}

class TeamSharingActionComponent extends React.Component<TeamSharingActionProps, {}> {
    componentDidMount() {
        this.props.onGetSharedItems()
    }

    render() {
        let infoBody: any[] = ["Team Sharing"]

        let cellInfo: [string, number][] = [["Type", 2], ["Audit", 3], ["Entity", 6], ["", 1]];
        let sharedItems = this.props.Entities.sort((a, b) => { return a.strategy < b.strategy ? -1 : 1 }).map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={2}>
                        <Glyphicon glyph={this.getGhyphicon(x.strategy)} />{' '}{x.strategy}
                    </Col>
                    <Col xs={3}>
                        {x.user}{' @ '}{x.timestamp.toLocaleString()}
                    </Col>
                    <Col xs={6} style={{ fontSize: 'small' }}>
                        <Panel bsStyle="primary" className="small-padding-panel">
                            {this.getSharedItemDetails(x)}
                        </Panel>
                    </Col>
                    <Col xs={1}>
                        <OverlayTrigger overlay={<Tooltip id="tooltipButton" >Import</Tooltip >}>
                            <Button onClick={() => this.props.onImportItem(x.entity, x.strategy)}><Glyphicon glyph="import" /></Button>
                        </OverlayTrigger >
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithImage header="Team Sharing" style={panelStyle} infoBody={infoBody}
            bsStyle="primary" glyphicon={"share"}>
            {this.props.Entities.length == 0 ?
                <Well bsSize="small">Shared Items will appear here when available.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }
            <ListGroup style={divStyle}>
                {sharedItems}
            </ListGroup>
        </PanelWithImage>
    }
    getGhyphicon(strategyID: string) {
        switch (strategyID) {
            case StrategyIds.AdvancedSearchStrategyId:
                return "search"
            case StrategyIds.CalculatedColumnStrategyId:
                return "th-list"
            case StrategyIds.CellValidationStrategyId:
                return "flag"
            case StrategyIds.ConditionalStyleStrategyId:
                return "tint"
            case StrategyIds.CustomSortStrategyId:
                return "sort-by-attributes"
            case StrategyIds.FilterStrategyId:
                return "filter"
            case StrategyIds.LayoutStrategyId:
                return "th"
            case StrategyIds.PlusMinusStrategyId:
                return "plus-sign"
            case StrategyIds.ShortcutStrategyId:
                return "road"
        }
    }

    getSharedItemDetails(sharedEntity: ISharedEntity) {
        switch (sharedEntity.strategy) {
            case StrategyIds.CustomSortStrategyId: {
                let customSort = sharedEntity.entity as ICustomSort
                let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>{column ? column.FriendlyName : customSort.ColumnId + Helper.MissingColumnMagicString}</Col>
                    <Col xs={8} >
                        {customSort.CustomSortItems.join(', ')}
                    </Col>
                </Row>
            }
            case StrategyIds.CalculatedColumnStrategyId: {
                let calcCol = sharedEntity.entity as ICalculatedColumn
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {calcCol.ColumnId}
                    </Col>
                    <Col xs={8}>
                        {calcCol.GetValueFunc}
                    </Col>
                </Row>
            }
            case StrategyIds.CellValidationStrategyId: {
                let cellVal = sharedEntity.entity as ICellValidationRule
                let column = this.props.Columns.find(c => c.ColumnId == cellVal.ColumnId)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {column ? column.FriendlyName : cellVal.ColumnId + Helper.MissingColumnMagicString}
                    </Col>
                    <Col xs={4}>
                        {cellVal.Description}
                    </Col>
                    <Col xs={4}>
                        {(cellVal.HasExpression) ?
                            ExpressionHelper.ConvertExpressionToString(cellVal.OtherExpression, this.props.Columns, this.props.UserFilters) :
                            "No Expression"}
                    </Col>
                </Row>
            }
            case StrategyIds.ConditionalStyleStrategyId: {
                let cs = sharedEntity.entity as IConditionalStyleCondition
                let column = this.props.Columns.find(c => c.ColumnId == cs.ColumnId)
                let backColorForStyle: string = cs.Style.BackColor != undefined ? cs.Style.BackColor : null;
                let foreColorForStyle: string = cs.Style.ForeColor != undefined ? cs.Style.ForeColor : "black";
                let fontWeightForStyle: any = cs.Style.FontWeight == FontWeight.Bold ? "bold" : "normal"
                let fontStyleForStyle: any = cs.Style.FontStyle == FontStyle.Italic ? "italic" : "normal"
                let fontSizeForStyle: any = EnumExtensions.getCssFontSizeFromFontSizeEnum(cs.Style.FontSize);
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={4} >
                        {cs.ConditionalStyleScope == ConditionalStyleScope.Column ?
                            column ? column.FriendlyName : cs.ColumnId + Helper.MissingColumnMagicString :
                            "Whole Row"
                        }
                    </Col>
                    <Col md={3} >
                        <div className={cs.Style.BackColor != undefined ? "" : "adaptableblotter_white_grey_stripes"} style={{
                            textAlign: 'center', margin: '2px', padding: '3px', background: backColorForStyle, color: foreColorForStyle, fontWeight: fontWeightForStyle, fontStyle: fontStyleForStyle, fontSize: fontSizeForStyle
                        }}>Style</div>
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(cs.Expression, this.props.Columns, this.props.UserFilters)}
                    </Col>
                </Row>
            }
            case StrategyIds.PlusMinusStrategyId: {
                let plusMinus = sharedEntity.entity as IPlusMinusCondition
                let column = this.props.Columns.find(c => c.ColumnId == plusMinus.ColumnId)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {column ? column.FriendlyName : plusMinus.ColumnId + Helper.MissingColumnMagicString}
                    </Col>
                    <Col xs={3}>
                        {plusMinus.DefaultNudge.toString()}
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(plusMinus.Expression, this.props.Columns, this.props.UserFilters)}
                    </Col>
                </Row>
            }
            case StrategyIds.ShortcutStrategyId: {
                let shortcut = sharedEntity.entity as IShortcut
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={4} >
                        {shortcut.DataType}
                    </Col>
                    <Col md={4} >
                        {shortcut.ShortcutKey}
                    </Col>
                    <Col md={4}>
                        {shortcut.ShortcutResult}
                    </Col>
                </Row>
            }
            case StrategyIds.FilterStrategyId: {
                let filter = sharedEntity.entity as IUserFilter
                let expressionString = ExpressionHelper.ConvertExpressionToString(filter.Expression, this.props.Columns, this.props.UserFilters)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {filter.FriendlyName}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyIds.AdvancedSearchStrategyId: {
                let search = sharedEntity.entity as IAdvancedSearch
                let expressionString = ExpressionHelper.ConvertExpressionToString(search.Expression, this.props.Columns, this.props.UserFilters)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {search.Name}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyIds.LayoutStrategyId: {
                let layout = sharedEntity.entity as ILayout
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {layout.Name}
                    </Col>
                    <Col xs={8}>
                        {layout.Columns.join(', ')}
                    </Col>
                </Row>
            }
            default:
                return "NOT IMPLEMENTED"
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Entities: state.TeamSharing.SharedEntities,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
        onImportItem: (entity: IConfigEntity, strategy: string) => dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy))
    };
}

export let TeamSharingAction = connect(mapStateToProps, mapDispatchToProps)(TeamSharingActionComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

//make the screen a little bit more reactive instead of having a static width
let panelStyle = {
    width: '80vw',
    maxWidth: '1100px',
    minWidth: '600px'
}
