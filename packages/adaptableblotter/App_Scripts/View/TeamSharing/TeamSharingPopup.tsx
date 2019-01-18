import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Button, Col, Panel, ListGroup, Row, Well, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Api/Interface/IColumn';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions'
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StrategyProfile } from '../Components/StrategyProfile';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { IAdvancedSearch, ICalculatedColumn, IAdaptableBlotterObject, ICustomSort, IConditionalStyle, IPlusMinusRule, IShortcut, IUserFilter, IFormatColumn, ILayout, IReport, ICellValidationRule } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { ExpressionHelper } from "../../Utilities/Helpers/ExpressionHelper";
import { ConditionalStyleScope } from "../../Utilities/Enums";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { CellValidationHelper } from "../../Utilities/Helpers/CellValidationHelper";


interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
    Entities: Array<ISharedEntity>
    onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction
    onImportItem: (entity: IAdaptableBlotterObject, strategy: string) => TeamSharingRedux.TeamSharingImportItemAction
}

class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
    componentDidMount() {
        this.props.onGetSharedItems()
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__teamsharing";

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
                        <StrategyProfile cssClassName={cssClassName} StrategyId={x.strategy} />
                    </Col>
                    <Col xs={3}>
                        {x.user}{<br />}{x.timestamp.toLocaleString()}
                    </Col>
                    <Col xs={6} style={{ fontSize: 'small' }}>
                        <Panel bsStyle="primary" className="ab_small-padding-panel">
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

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.TeamSharingStrategyName} infoBody={infoBody}
                bsStyle="primary" glyphicon={StrategyConstants.TeamSharingGlyph}>
                {this.props.Entities.length == 0 ?
                    <Well bsSize="small">Shared Items will appear here when available.</Well>
                    : <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
                }
                <ListGroup >
                    {sharedItems}
                </ListGroup>
            </PanelWithImage>
        </div>
    }

    getSharedItemDetails(sharedEntity: ISharedEntity) {
        switch (sharedEntity.strategy) {
            case StrategyConstants.CustomSortStrategyId: {
                let customSort = sharedEntity.entity as ICustomSort
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>{ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)}</Col>
                    <Col xs={8} >
                        {customSort.SortedValues.join(', ')}
                    </Col>
                </Row>
            }
            case StrategyConstants.CalculatedColumnStrategyId: {
                let calcCol = sharedEntity.entity as ICalculatedColumn
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {calcCol.ColumnId}
                    </Col>
                    <Col xs={8}>
                        {calcCol.ColumnExpression}
                    </Col>
                </Row>
            }
            case StrategyConstants.CellValidationStrategyId: {
                let cellVal = sharedEntity.entity as ICellValidationRule
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>{ColumnHelper.getFriendlyNameFromColumnId(cellVal.ColumnId, this.props.Columns)}
                    </Col>
                    <Col xs={4}>
                        {CellValidationHelper.createCellValidationDescription( cellVal, this.props.Columns)}
                    </Col>
                    <Col xs={4}>
                        {(ExpressionHelper.IsNotEmptyExpression (cellVal.Expression) )?
                            ExpressionHelper.ConvertExpressionToString(cellVal.Expression, this.props.Columns) :
                            "No Expression"}
                    </Col>
                </Row>
            }
            case StrategyConstants.ConditionalStyleStrategyId: {
                let cs = sharedEntity.entity as IConditionalStyle
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={4} >
                        {cs.ConditionalStyleScope == ConditionalStyleScope.Column ?
                            ColumnHelper.getFriendlyNameFromColumnId(cs.ColumnId, this.props.Columns) :
                            "Whole Row"
                        }
                    </Col>
                    <Col md={3} >
                        <StyleVisualItem Style={cs.Style} />
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(cs.Expression, this.props.Columns)}
                    </Col>
                </Row>
            }
            case StrategyConstants.PlusMinusStrategyId: {
                let plusMinus = sharedEntity.entity as IPlusMinusRule
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {ColumnHelper.getFriendlyNameFromColumnId(plusMinus.ColumnId, this.props.Columns)}
                    </Col>
                    <Col xs={3}>
                        {plusMinus.NudgeValue.toString()}
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(plusMinus.Expression, this.props.Columns)}
                    </Col>
                </Row>
            }
            case StrategyConstants.ShortcutStrategyId: {
                let shortcut = sharedEntity.entity as IShortcut
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={4} >
                        {shortcut.ColumnType}
                    </Col>
                    <Col md={4} >
                        {shortcut.ShortcutKey}
                    </Col>
                    <Col md={4}>
                        {shortcut.ShortcutResult}
                    </Col>
                </Row>
            }
            case StrategyConstants.UserFilterStrategyId: {
                let filter = sharedEntity.entity as IUserFilter
                let expressionString = ExpressionHelper.ConvertExpressionToString(filter.Expression, this.props.Columns)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {filter.Name}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyConstants.AdvancedSearchStrategyId: {
                let search = sharedEntity.entity as IAdvancedSearch
                let expressionString = ExpressionHelper.ConvertExpressionToString(search.Expression, this.props.Columns)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {search.Name}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyConstants.LayoutStrategyId: {
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
            case StrategyConstants.FormatColumnStrategyId: {
                let fc = sharedEntity.entity as IFormatColumn
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>{ColumnHelper.getFriendlyNameFromColumnId(fc.ColumnId, this.props.Columns)}</Col>
                    <Col md={8} >
                        <StyleVisualItem Style={fc.Style} />
                    </Col>
                </Row>
            }
            case StrategyConstants.ExportStrategyId: {
                let range = sharedEntity.entity as IReport
                let expressionString = ExpressionHelper.ConvertExpressionToString(range.Expression, this.props.Columns)
                return <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={4}>
                        {range.Name}
                    </Col>
                    <Col xs={8}>
                        {expressionString}
                    </Col>
                </Row>
            }
            case StrategyConstants.ColumnFilterStrategyId: {
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
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
        onImportItem: (entity: IAdaptableBlotterObject, strategy: string) => dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy))
    };
}

export let TeamSharingPopup = connect(mapStateToProps, mapDispatchToProps)(TeamSharingPopupComponent);



