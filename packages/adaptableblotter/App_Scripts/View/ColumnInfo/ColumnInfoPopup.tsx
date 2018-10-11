import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { CustomSortSummary } from '../CustomSort/CustomSortSummary'
import { ConditionalStyleSummary } from '../ConditionalStyle/ConditionalStyleSummary'
import { CellValidationSummary } from '../CellValidation/CellValidationSummary'
import { UserFilterSummary } from '../UserFilter/UserFilterSummary'
import { ColumnFilterSummary } from '../ColumnFilter/ColumnFilterSummary'
import { PlusMinusSummary } from '../PlusMinus/PlusMinusSummary'
import { FormatColumnSummary } from '../FormatColumn/FormatColumnSummary'
import { FlashingCellSummary } from '../FlashingCells/FlashingCellSummary'
import { CalculatedColumnSummary } from '../CalculatedColumn/CalculatedColumnSummary'
import { DataType, SelectionMode, AccessLevel } from '../../Core/Enums'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { ControlLabel, Col, Row, FormGroup } from 'react-bootstrap';
import { IEntitlement, IColumnCategory } from "../../Core/Interface/Interfaces";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { ICalculatedColumn } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnChooserSummary } from "../ColumnChooser/ColumnChooserSummary";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";


interface ColumnInfoPopupProps extends StrategyViewPopupProps<ColumnInfoPopupComponent> {
    CalculatedColumns: Array<ICalculatedColumn>
    FunctionEntitlements: IEntitlement[]
    ColumnCategories: IColumnCategory[]
}

export interface ColumnInfoState {
    SelectedColumn: IColumn
    ShowSelector: boolean
}

class ColumnInfoPopupComponent extends React.Component<ColumnInfoPopupProps, ColumnInfoState> {
    constructor(props: ColumnInfoPopupProps) {
        super(props);
        this.state = { SelectedColumn: null, ShowSelector: true }

    }
    componentWillMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumn: this.props.Columns.find(c => c.ColumnId == this.props.PopupParams), ShowSelector: false })
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__columninfo";

        let infoBody: any[] = ["Displays information about a column in the grid - which Adaptable Blotter Objects it has attached."]

        let colItems: IColItem[] = [
            { Content: "Function", Size: 3 },
            { Content: "Summary", Size: 7 },
            { Content: "", Size: 2 },
        ]
        let selectedColumnId: string = (this.state.SelectedColumn) ? this.state.SelectedColumn.ColumnId : null

        let headerText = StrategyIds.ColumnInfoStrategyName;

        let summaries: any[] = [];
        if (ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories)) {
            summaries.push(

                <div key={StrategyIds.ColumnChooserStrategyId} className={this.isStrategyReadOnly(StrategyIds.ColumnChooserStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ColumnChooserSummary
                        key={StrategyIds.ColumnChooserStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        AccessLevel={this.getAccessLevel(StrategyIds.ColumnChooserStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyIds.CustomSortStrategyId)) {
            summaries.push(

                <div key={StrategyIds.CustomSortStrategyId} className={this.isStrategyReadOnly(StrategyIds.CustomSortStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <CustomSortSummary
                        key={StrategyIds.CustomSortStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.CustomSortStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyIds.ConditionalStyleStrategyId)) {
            summaries.push(
                <div key={StrategyIds.ConditionalStyleStrategyId} className={this.isStrategyReadOnly(StrategyIds.ConditionalStyleStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ConditionalStyleSummary
                        key={StrategyIds.ConditionalStyleStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.ConditionalStyleStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyIds.CellValidationStrategyId)) {
            summaries.push(
                <div key={StrategyIds.CellValidationStrategyId} className={this.isStrategyReadOnly(StrategyIds.CellValidationStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <CellValidationSummary
                        key={StrategyIds.CellValidationStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.CellValidationStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyIds.UserFilterStrategyId)) {
            summaries.push(
                <div key={StrategyIds.UserFilterStrategyId} className={this.isStrategyReadOnly(StrategyIds.UserFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <UserFilterSummary
                        key={StrategyIds.UserFilterStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.UserFilterStrategyId)}
                        Blotter={this.props.Blotter}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyIds.ColumnFilterStrategyId)) {
            summaries.push(
                <div key={StrategyIds.ColumnFilterStrategyId} className={this.isStrategyReadOnly(StrategyIds.ColumnFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ColumnFilterSummary
                        key={StrategyIds.ColumnFilterStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.ColumnFilterStrategyId)}
                    />
                </div>)
        }

        if (this.isStrategyVisible(StrategyIds.FormatColumnStrategyId)) {
            summaries.push(
                <div key={StrategyIds.FormatColumnStrategyId} className={this.isStrategyReadOnly(StrategyIds.FormatColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <FormatColumnSummary
                        key={StrategyIds.FormatColumnStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyIds.FormatColumnStrategyId)}
                    />
                </div>)
        }
        if (this.state.SelectedColumn) {

            if (this.isStrategyVisible(StrategyIds.PlusMinusStrategyId) && this.state.SelectedColumn.DataType == DataType.Number) {
                summaries.push(
                    <div key={StrategyIds.PlusMinusStrategyId} className={this.isStrategyReadOnly(StrategyIds.PlusMinusStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <PlusMinusSummary
                            key={StrategyIds.PlusMinusStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            TeamSharingActivated={this.props.TeamSharingActivated}
                            getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                            AccessLevel={this.getAccessLevel(StrategyIds.PlusMinusStrategyId)}
                        />
                    </div>)
            }

            if (this.isStrategyVisible(StrategyIds.FlashingCellsStrategyId) && this.state.SelectedColumn.DataType == DataType.Number) {
                summaries.push(
                    <div key={StrategyIds.FlashingCellsStrategyId} className={this.isStrategyReadOnly(StrategyIds.FlashingCellsStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <FlashingCellSummary
                            key={StrategyIds.FlashingCellsStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            AccessLevel={this.getAccessLevel(StrategyIds.FlashingCellsStrategyId)}
                        />
                    </div>)
            }
            if (this.isStrategyVisible(StrategyIds.CalculatedColumnStrategyId) && this.props.CalculatedColumns.findIndex(c => c.ColumnId == this.state.SelectedColumn.ColumnId) != -1) {
                summaries.push(
                    <div key={StrategyIds.CalculatedColumnStrategyId} className={this.isStrategyReadOnly(StrategyIds.CalculatedColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <CalculatedColumnSummary
                            key={StrategyIds.CalculatedColumnStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            AccessLevel={this.getAccessLevel(StrategyIds.CalculatedColumnStrategyId)}
                        />
                    </div>)
            }

            headerText = headerText + ": " + this.state.SelectedColumn.FriendlyName;
        }

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={headerText} bsStyle="primary" glyphicon={StrategyIds.ColumnInfoGlyph} infoBody={infoBody}>

                {this.state.ShowSelector &&
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="searchName">
                            <Row>
                                <Col xs={2} componentClass={ControlLabel}>Column: </Col>

                                <Col xs={8} >
                                    <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[selectedColumnId]}
                                        ColumnList={this.props.Columns}
                                        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                                        SelectionMode={SelectionMode.Single} />
                                </Col>
                                <Col xs={2}>{' '} </Col>
                            </Row>
                        </FormGroup>

                    </AdaptableBlotterForm>

                }

                {this.state.SelectedColumn &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={summaries} reducedPanel={this.state.ShowSelector} />
                }
            </PanelWithImage>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumn: columns.length > 0 ? columns[0] : null })
    }

    private isStrategyVisible(strategyId: string): boolean {
        return this.getAccessLevel(strategyId) == AccessLevel.Full;
    }

    private isStrategyReadOnly(strategyId: string): boolean {
        return this.getAccessLevel(strategyId) == AccessLevel.ReadOnly;
    }

    private getAccessLevel(strategyId: string): AccessLevel {
        return EntitlementHelper.getEntitlementAccessLevelForStrategy(this.props.FunctionEntitlements, strategyId)
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        ColumnCategories: state.UserInterface.ColumnCategories,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    };
}

export let ColumnInfoPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);

