import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../api/Interface/IColumn';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { CustomSortSummary } from '../CustomSort/CustomSortSummary'
import { ConditionalStyleSummary } from '../ConditionalStyle/ConditionalStyleSummary'
import { CellValidationSummary } from '../CellValidation/CellValidationSummary'
import { UserFilterSummary } from '../UserFilter/UserFilterSummary'
import { ColumnFilterSummary } from '../ColumnFilter/ColumnFilterSummary'
import { PlusMinusSummary } from '../PlusMinus/PlusMinusSummary'
import { FormatColumnSummary } from '../FormatColumn/FormatColumnSummary'
import { FlashingCellSummary } from '../FlashingCells/FlashingCellSummary'
import { CalculatedColumnSummary } from '../CalculatedColumn/CalculatedColumnSummary'
import { DataType, SelectionMode, AccessLevel } from '../../Utilities/Enums'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { ControlLabel, Col, Row, FormGroup } from 'react-bootstrap';
import { IEntitlement, IColumnCategory } from "../../api/Interface/Interfaces";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { ICalculatedColumn } from "../../api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";
import { ColumnCategorySummary } from "../ColumnCategory/ColumnCategorySummary";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { PercentBarSummary } from "../PercentBar/PercentBarSummary";
import { FreeTextColumnSummary } from "../FreeTextColumn/FreeTextColumnSummary";


interface ColumnInfoPopupProps extends StrategyViewPopupProps<ColumnInfoPopupComponent> {
    CalculatedColumns: Array<ICalculatedColumn>
    FunctionEntitlements: IEntitlement[]
    ColumnCategory: IColumnCategory[]
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
            let column = ColumnHelper.getColumnFromId(this.props.PopupParams, this.props.Columns);
            this.setState({ SelectedColumn: column, ShowSelector: false })
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

        let headerText = StrategyConstants.ColumnInfoStrategyName;

        let summaries: any[] = [];
        if (ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategory)) {
            summaries.push(

                <div key={StrategyConstants.ColumnCategoryStrategyId} className={this.isStrategyReadOnly(StrategyConstants.ColumnCategoryStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ColumnCategorySummary
                        key={StrategyConstants.ColumnChooserStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        AccessLevel={this.getAccessLevel(StrategyConstants.ColumnChooserStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.CustomSortStrategyId)) {
            summaries.push(

                <div key={StrategyConstants.CustomSortStrategyId} className={this.isStrategyReadOnly(StrategyConstants.CustomSortStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <CustomSortSummary
                        key={StrategyConstants.CustomSortStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.CustomSortStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.ConditionalStyleStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.ConditionalStyleStrategyId} className={this.isStrategyReadOnly(StrategyConstants.ConditionalStyleStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ConditionalStyleSummary
                        key={StrategyConstants.ConditionalStyleStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.ConditionalStyleStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.CellValidationStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.CellValidationStrategyId} className={this.isStrategyReadOnly(StrategyConstants.CellValidationStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <CellValidationSummary
                        key={StrategyConstants.CellValidationStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.CellValidationStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.UserFilterStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.UserFilterStrategyId} className={this.isStrategyReadOnly(StrategyConstants.UserFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <UserFilterSummary
                        key={StrategyConstants.UserFilterStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.UserFilterStrategyId)}
                        Blotter={this.props.Blotter}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.ColumnFilterStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.ColumnFilterStrategyId} className={this.isStrategyReadOnly(StrategyConstants.ColumnFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <ColumnFilterSummary
                        key={StrategyConstants.ColumnFilterStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.ColumnFilterStrategyId)}
                    />
                </div>)
        }

        if (this.isStrategyVisible(StrategyConstants.FormatColumnStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.FormatColumnStrategyId} className={this.isStrategyReadOnly(StrategyConstants.FormatColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <FormatColumnSummary
                        key={StrategyConstants.FormatColumnStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.FreeTextColumnStrategyId)) {
            summaries.push(
                <div key={StrategyConstants.FreeTextColumnStrategyId} className={this.isStrategyReadOnly(StrategyConstants.FreeTextColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <FreeTextColumnSummary
                        key={StrategyConstants.FormatColumnStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
                    />
                </div>)
        }
        if (this.isStrategyVisible(StrategyConstants.PercentBarStrategyId) && this.state.SelectedColumn.DataType == DataType.Number) {
            summaries.push(
                <div key={StrategyConstants.PercentBarStrategyId} className={this.isStrategyReadOnly(StrategyConstants.PercentBarStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                    <PercentBarSummary
                        key={StrategyConstants.FormatColumnStrategyId}
                        SummarisedColumn={this.state.SelectedColumn}
                        TeamSharingActivated={this.props.TeamSharingActivated}
                        getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                        AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
                    />
                </div>)
        }
        if (this.state.SelectedColumn) {

            if (this.isStrategyVisible(StrategyConstants.PlusMinusStrategyId) && this.state.SelectedColumn.DataType == DataType.Number) {
                summaries.push(
                    <div key={StrategyConstants.PlusMinusStrategyId} className={this.isStrategyReadOnly(StrategyConstants.PlusMinusStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <PlusMinusSummary
                            key={StrategyConstants.PlusMinusStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            TeamSharingActivated={this.props.TeamSharingActivated}
                            getColumnValueDisplayValuePairDistinctList={this.props.Blotter.getColumnValueDisplayValuePairDistinctList}
                            AccessLevel={this.getAccessLevel(StrategyConstants.PlusMinusStrategyId)}
                        />
                    </div>)
            }

            if (this.isStrategyVisible(StrategyConstants.FlashingCellsStrategyId) && this.state.SelectedColumn.DataType == DataType.Number) {
                summaries.push(
                    <div key={StrategyConstants.FlashingCellsStrategyId} className={this.isStrategyReadOnly(StrategyConstants.FlashingCellsStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <FlashingCellSummary
                            key={StrategyConstants.FlashingCellsStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            AccessLevel={this.getAccessLevel(StrategyConstants.FlashingCellsStrategyId)}
                        />
                    </div>)
            }
            if (this.isStrategyVisible(StrategyConstants.CalculatedColumnStrategyId) && this.props.CalculatedColumns.findIndex(c => c.ColumnId == this.state.SelectedColumn.ColumnId) != -1) {
                summaries.push(
                    <div key={StrategyConstants.CalculatedColumnStrategyId} className={this.isStrategyReadOnly(StrategyConstants.CalculatedColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : ""}>
                        <CalculatedColumnSummary
                            key={StrategyConstants.CalculatedColumnStrategyId}
                            SummarisedColumn={this.state.SelectedColumn}
                            AccessLevel={this.getAccessLevel(StrategyConstants.CalculatedColumnStrategyId)}
                        />
                    </div>)
            }

            headerText = headerText + ": " + this.state.SelectedColumn.FriendlyName;
        }

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={headerText} bsStyle="primary" glyphicon={StrategyConstants.ColumnInfoGlyph} infoBody={infoBody}>

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
        ColumnCategory: state.ColumnCategory.ColumnCategories,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    };
}

export let ColumnInfoPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);

