"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const DataSourceSettingsWizard_1 = require("./DataSourceSettingsWizard");
const DataSourceSummaryWizard_1 = require("./DataSourceSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class DataSourceWizard extends React.Component {
    render() {
        let dataSources = this.props.ConfigEntities;
        let dataSourceNames = dataSources.map(s => s.Name);
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.DataSourceStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Settings",
                        Index: 0,
                        Element: React.createElement(DataSourceSettingsWizard_1.DataSourceSettingsWizard, { DataSourceNames: dataSourceNames }),
                    },
                    {
                        StepName: "Summary",
                        Index: 1,
                        Element: React.createElement(DataSourceSummaryWizard_1.DataSourceSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.DataSourceWizard = DataSourceWizard;
