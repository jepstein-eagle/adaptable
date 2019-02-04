import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PercentBarWizard } from './Wizard/PercentBarWizard'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { PercentBarEntityRow } from './PercentBarEntityRow';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IPercentBar } from "../../Utilities/Interface/BlotterObjects/IPercentBar";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { DistinctCriteriaPairValue } from "../../Utilities/Enums";

interface PercentBarPopupProps extends StrategyViewPopupProps<PercentBarPopupComponent> {
    PercentBars: IPercentBar[];
    onAddPercentBar: (PercentBar: IPercentBar) => PercentBarRedux.PercentBarAddAction
    onEditPercentBar: (Index: number, PercentBar: IPercentBar) => PercentBarRedux.PercentBarEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
    onMinimumValueChanged: (PercentBar: IPercentBar, MinimumValue: number) => PercentBarRedux.PercentBarChangeMinimumValueAction
    onMaximumValueChanged: (PercentBar: IPercentBar, MaximumValue: number) => PercentBarRedux.PercentBarChangeMaximumValueAction
    onPositiveColorChanged: (PercentBar: IPercentBar, PositiveColor: string) => PercentBarRedux.PercentBarChangePositiveColorAction
    onNegativeColorChanged: (PercentBar: IPercentBar, NegativeColor: string) => PercentBarRedux.PercentBarChangeNegativeColorAction

}

class PercentBarPopupComponent extends React.Component<PercentBarPopupProps, EditableConfigEntityState> {
    constructor(props: PercentBarPopupProps) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let columnId: string = arrayParams[1];
                let distinctColumnsValues: number[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columnId, DistinctCriteriaPairValue.RawValue).map(pair => {
                    return pair.RawValue
                });
                let newPercentRender: IPercentBar = ObjectFactory.CreateEmptyPercentBar()
                newPercentRender.ColumnId = columnId;
                newPercentRender.MinValue = Math.min(...distinctColumnsValues);
                newPercentRender.MaxValue = Math.max(...distinctColumnsValues);
                this.onEdit(-1, newPercentRender)
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editPercentRender = this.props.PercentBars.find(x => x.ColumnId == arrayParams[1])
                let index = this.props.PercentBars.findIndex(x => x.ColumnId == editPercentRender.ColumnId)
                this.onEdit(index, editPercentRender)
            }
        }
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__percentBar";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__percentBar";

        let infoBody: any[] = ["Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value", <br />, <br />,
            "For each Percent Bar you can select the colours and range boundaries."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 2 },
            { Content: "Min", Size: 2 },
            { Content: "Max", Size: 2 },
            { Content: "Positive", Size: 2 },
            { Content: "Negative", Size: 2 },
            { Content: "", Size: 2 },
        ]

        let PercentBarItems = this.props.PercentBars.map((PercentBar: IPercentBar, index) => {
            let column = ColumnHelper.getColumnFromId(PercentBar.ColumnId, this.props.Columns);
            return <PercentBarEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={PercentBar}
                Column={column}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                ColorPalette={this.props.ColorPalette}
                Index={index}
                onEdit={(index, object) => this.onEdit(index, PercentBar)}
                onShare={() => this.props.onShare(PercentBar)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={PercentBarRedux.PercentBarDelete(index)}
                onMinimumValueChanged={(PercentBar, minimumValue) => this.props.onMinimumValueChanged(PercentBar, minimumValue)}
                onMaximumValueChanged={(PercentBar, maximumValue) => this.props.onMaximumValueChanged(PercentBar, maximumValue)}
                onPositiveColorChanged={(PercentBar, positiveColor) => this.props.onPositiveColorChanged(PercentBar, positiveColor)}
                onNegativeColorChanged={(PercentBar, negativeColor) => this.props.onNegativeColorChanged(PercentBar, negativeColor)}
            />

        })
        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Percent Bar "
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.PercentBarStrategyName} bsStyle="primary" cssClassName={cssClassName}
                button={newButton}
                glyphicon={StrategyConstants.PercentBarGlyph}
                infoBody={infoBody}>
                {PercentBarItems.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={PercentBarItems} />
                }

                {PercentBarItems.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating s for valid cell edits.</HelpBlock>
                        <HelpBlock>Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <PercentBarWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPercentBar}
                        ConfigEntities={null}
                        Blotter={this.props.Blotter}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        ColorPalette={this.props.ColorPalette}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()} />
                }

            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPercentBar(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }

    onEdit(index: number, renderedColumn: IPercentBar) {
        let clonedObject: IPercentBar = Helper.cloneObject(renderedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let percentBar: IPercentBar = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditPercentBar(this.state.EditedAdaptableBlotterObjectIndex, percentBar)
        }
        else {
            this.props.onAddPercentBar(percentBar)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard(): boolean {
        let percentBar = this.state.EditedAdaptableBlotterObject as IPercentBar
        if (StringExtensions.IsNullOrEmpty(percentBar.ColumnId) ||
            StringExtensions.IsNullOrEmpty(percentBar.PositiveColor) ||
            StringExtensions.IsNullOrEmpty(percentBar.NegativeColor)) {
            return false;
        }
        // we are not currently checking for columns - ok? or problem?
        return true;
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        PercentBars: state.PercentBar.PercentBars
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddPercentBar: (PercentBar: IPercentBar) => dispatch(PercentBarRedux.PercentBarAdd(PercentBar)),
        onEditPercentBar: (Index: number, PercentBar: IPercentBar) => dispatch(PercentBarRedux.PercentBarEdit(Index, PercentBar)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
        onMinimumValueChanged: (PercentBar: IPercentBar, minimumValue: number) => dispatch(PercentBarRedux.PercentBarChangeMinimumValue(PercentBar, minimumValue)),
        onMaximumValueChanged: (PercentBar: IPercentBar, maximumValue: number) => dispatch(PercentBarRedux.PercentBarChangeMaximumValue(PercentBar, maximumValue)),
        onPositiveColorChanged: (PercentBar: IPercentBar, positiveColor: string) => dispatch(PercentBarRedux.PercentBarChangePositiveColor(PercentBar, positiveColor)),
        onNegativeColorChanged: (PercentBar: IPercentBar, negativeColor: string) => dispatch(PercentBarRedux.PercentBarChangeNegativeColor(PercentBar, negativeColor))
    };
}

export let PercentBarPopup = connect(mapStateToProps, mapDispatchToProps)(PercentBarPopupComponent);