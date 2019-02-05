import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import { ExportDestination, ReportColumnScope, AccessLevel, ReportRowScope } from '../../Utilities/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ReportEntityRow } from './ReportEntityRow'
import { ReportWizard } from './Wizard/ReportWizard'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from "../../Utilities/Helpers/ExpressionHelper";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IReport } from "../../Utilities/Interface/BlotterObjects/IReport";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";

interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
    Reports: IReport[],
    LiveReports: ILiveReport[];
    CurrentReport: string,
    onApplyExport: (value: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onAddUpdateReport: (index: number, Report: IReport) => ExportRedux.ReportAddUpdateAction;
    onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => SystemRedux.ReportStopLiveAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityState> {

    constructor(props: ExportPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        if (this.props.PopupParams == "Edit") {
            let selectedReport: IReport = this.props.Reports.find(a => a.Name == this.props.CurrentReport);
            let selectedReportIndex = this.props.Reports.findIndex(a => a.Name == this.props.CurrentReport);
            this.onEdit(selectedReportIndex, selectedReport)
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__export";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__export";

        let infoBody: any[] = ["Create a 'Report' (or use a predefined one) and then export it to specified location.", <br />, <br />]

        let colItems: IColItem[] = [
            { Content: "Report", Size: 2 },
            { Content: "Columns", Size: 3 },
            { Content: "Query Details", Size: 4 },
            { Content: "Export", Size: 1 },
            { Content: "", Size: 3 },
        ]

        let Reports = this.props.Reports.map((Report: IReport, index) => {
            return <ReportEntityRow
                cssClassName={cssClassName}
                AdaptableBlotterObject={Report}
                key={index}
                colItems={colItems}
                Index={index}
                Columns={this.props.Columns}
                IsLast={index == this.props.Reports.length - 1}
                UserFilters={this.props.UserFilters}
                LiveReports={this.props.LiveReports}
                onShare={() => this.props.onShare(Report)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onExport={(exportDestination) => this.onApplyExport(Report.Name, exportDestination)}
                onReportStopLive={(exportDestination) => this.props.onReportStopLive(Report.Name, exportDestination)}
                onEdit={(index, Report) => this.onEdit(index, Report as IReport)}
                onDeleteConfirm={ExportRedux.ReportDelete(index)}
            />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Report"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.ExportStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ExportGlyph} infoBody={infoBody} button={newButton} >

                {Reports.length > 0 ?
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={Reports} allowOverflow={false} />
              :
                    <HelpBlock >Click 'New' to create a new Report.  A Report is named group of columns and Unique values..</HelpBlock>
                }

                {this.state.EditedAdaptableBlotterObject &&
                    <ReportWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IReport}
                        ModalContainer={this.props.ModalContainer}
                        ConfigEntities={this.props.Reports}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let Report: IReport = this.state.EditedAdaptableBlotterObject as IReport;
        this.props.onAddUpdateReport(this.state.EditedAdaptableBlotterObjectIndex, Report)
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let report = this.state.EditedAdaptableBlotterObject as IReport
        if (StringExtensions.IsNullOrEmpty(report.Name)) {
            return false;
        }
        if (report.ReportRowScope == ReportRowScope.ExpressionRows && ExpressionHelper.IsEmptyExpression(report.Expression)) {
            return false;
        }
        if (report.ReportColumnScope == ReportColumnScope.BespokeColumns && ArrayExtensions.IsNullOrEmpty(report.ColumnIds)) {
            return false;
        }
        return true;
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyReport(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(index: number, ReportToEdit: IReport) {
        let clonedReportToEdit = Helper.cloneObject(ReportToEdit)
        this.setState({ EditedAdaptableBlotterObject: clonedReportToEdit, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index })
    }

    onApplyExport(Report: string, exportDestination: ExportDestination) {
        this.props.onApplyExport(Report, exportDestination);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Reports: state.Export.Reports,
        CurrentReport: state.Export.CurrentReport,
        LiveReports: state.System.CurrentLiveReports,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (value: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ExportApply(value, exportDestination)),
        onAddUpdateReport: (Index: number, Report: IReport) => dispatch(ExportRedux.ReportAddUpdate(Index, Report)),
        onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId))
    };
}

export let ExportPopup = connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);



