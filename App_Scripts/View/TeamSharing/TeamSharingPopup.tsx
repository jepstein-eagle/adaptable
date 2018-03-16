import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Button, Col, Panel, ListGroup, Row, Well, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions'
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { IConditionalStyleCondition } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, FontWeight, FontStyle } from '../../Core/Enums';
import { IPlusMinusCondition } from '../../Strategy/Interface/IPlusMinusStrategy';
import { IShortcut } from '../../Strategy/Interface/IShortcutStrategy';
import { IReport } from '../../Strategy/Interface/IExportStrategy';
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';


interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
    Entities: Array<ISharedEntity>
    Columns: Array<IColumn>
    UserFilters: IUserFilter[]
    onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction
    onImportItem: (entity: IAdaptableBlotterObject, strategy: string) => TeamSharingRedux.TeamSharingImportItemAction
}

class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
    componentDidMount() {
        this.props.onGetSharedItems()
    }

    render() {
        let infoBody: any[] = ["Team Sharing"]

        let colItems: IColItem[] = [
            { Content: "Function", Size: 2 },
            { Content: "Audit", Size: 3 },
            { Content: "Details", Size: 6 },
            { Content: "", Size: 1 },
        ]
        let sharedItems = this.props.Entities.sort((a, b) => { return a.strategy < b.strategy ? -1 : 1 }).map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={2}>
                        <StrategyProfile StrategyId={x.strategy} />
                    </Col>
                    <Col xs={3}>
                        {x.user}{<br/>}{x.timestamp.toLocaleString()}
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
        return <PanelWithImage header={StrategyNames.TeamSharingStrategyName} style={panelStyle} infoBody={infoBody}
            bsStyle="primary" glyphicon={StrategyGlyphs.TeamSharingGlyph}>
            {this.props.Entities.length == 0 ?
                <Well bsSize="small">Shared Items will appear here when available.</Well>
                : <PanelWithRow ColItems={colItems} bsStyle="info" />
            }
            <ListGroup style={divStyle}>
                {sharedItems}
            </ListGroup>
        </PanelWithImage>
    }

    getSharedItemDetails(sharedEntity: ISharedEntity) {
        switch (sharedEntity.strategy) {
            case StrategyIds.CustomSortStrategyId: {
                let customSort = sharedEntity.entity as ICustomSort
                let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>{column ? column.FriendlyName : customSort.ColumnId + GeneralConstants.MISSING_COLUMN}</Col>
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
                        {column ? column.FriendlyName : cellVal.ColumnId + GeneralConstants.MISSING_COLUMN}
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
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={4} >
                        {cs.ConditionalStyleScope == ConditionalStyleScope.Column ?
                            column ? column.FriendlyName : cs.ColumnId + GeneralConstants.MISSING_COLUMN :
                            "Whole Row"
                        }
                    </Col>
                    <Col md={3} >
                        <StyleVisualItem Style={cs.Style} />
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
                        {column ? column.FriendlyName : plusMinus.ColumnId + GeneralConstants.MISSING_COLUMN}
                    </Col>
                    <Col xs={3}>
                        {plusMinus.NudgeValue.toString()}
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
            case StrategyIds.UserFilterStrategyId: {
                let filter = sharedEntity.entity as IUserFilter
                let expressionString = ExpressionHelper.ConvertExpressionToString(filter.Expression, this.props.Columns, this.props.UserFilters)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {filter.Name}
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
            case StrategyIds.FormatColumnStrategyId: {
                let fc = sharedEntity.entity as IFormatColumn
                let column = this.props.Columns.find(c => c.ColumnId == fc.ColumnId)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                   <Col xs={4}>{column ? column.FriendlyName : fc.ColumnId + GeneralConstants.MISSING_COLUMN}</Col>
                      <Col md={8} >
                        <StyleVisualItem Style={fc.Style} />
                    </Col>
                </Row>
            }
            case StrategyIds.ExportStrategyId: {
                let range = sharedEntity.entity as IReport
                let expressionString = ExpressionHelper.ConvertExpressionToString(range.Expression, this.props.Columns, this.props.UserFilters)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {range.Name}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyIds.ColumnFilterStrategyId: {
                return "NEED TO DO  COLUMN FILTER" // not sure actually
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
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
        onImportItem: (entity: IAdaptableBlotterObject, strategy: string) => dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy))
    };
}

export let TeamSharingPopup = connect(mapStateToProps, mapDispatchToProps)(TeamSharingPopupComponent);

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
