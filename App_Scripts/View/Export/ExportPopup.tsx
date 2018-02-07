import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import { ExportDestination} from '../../Core/Enums'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { IRange, ILiveRange } from "../../Strategy/Interface/IExportStrategy";
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { Helper } from '../../Core/Helpers/Helper';
import { RangeEntityRow } from './RangeEntityRow'
import { RangeWizard } from './Wizard/RangeWizard'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { EntityItemList } from '../Components/EntityItemList';
import { encode } from "punycode";
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';

interface ExportPopupProps extends IStrategyViewPopupProps<ExportPopupComponent> {
    Ranges: IRange[],
    LiveRanges: ILiveRange[];
    CurrentRange: string,
    onApplyExport: (value: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onAddUpdateRange: (index: number, Range: IRange) => RangeRedux.RangeAddUpdateAction;
    onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => RangeRedux.RangeStopLiveAction;
    UserFilters: IUserFilter[]
    Columns: Array<IColumn>
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        if (this.props.PopupParams == "Edit") {
            let selectedRange: IRange = this.props.Ranges.find(a => a.Name == this.props.CurrentRange);
            let selectedRangeIndex = this.props.Ranges.findIndex(a => a.Name == this.props.CurrentRange);
            this.onEdit(selectedRangeIndex, selectedRange)
        }
    }

    render() {

        let infoBody: any[] = ["Export works by sending 'ranges' to specified location.", <br />, <br />, "You can use an existing Range or create one of your own..", <br />, <br />]

        let colItems: IColItem[] = [
            { Content: "Range", Size: 2 },
            { Content: "Columns", Size: 3 },
            { Content: "Expression", Size: 3 },
            { Content: "", Size: 2 },
            { Content: "", Size: 2 },
        ]

        let ranges = this.props.Ranges.map((range: IRange, index) => {
            return <RangeEntityRow
                ConfigEntity={range}
                key={index}
                ColItems={colItems}
                Index={index}
                Columns={this.props.Columns}
                IsLast={index == this.props.Ranges.length - 1}
                UserFilters={this.props.UserFilters}
                LiveRanges={this.props.LiveRanges}
                onShare={() => this.props.onShare(range)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onExport={(exportDestination) => this.onApplyExport(range.Name, exportDestination)}
                onRangeStopLive={(exportDestination) => this.props.onRangeStopLive(range.Name, exportDestination)}
                onEdit={(index, range) => this.onEdit(index, range as IRange)}
                onDeleteConfirm={RangeRedux.RangeDelete(index)}
                isDropUp={index > 1} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Range"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return (
            <PanelWithButton headerText={StrategyNames.ExportStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ExportGlyph} infoBody={infoBody} button={newButton} style={panelStyle}>

                {ranges.length > 0 &&
                    <EntityItemList ColItems={colItems} items={ranges} />
                }

                {ranges.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a new Range.  A range is named group of columns and Unique values..</Well>
                }

                {this.state.EditedConfigEntity &&
                    <RangeWizard
                        EditedConfigEntity={this.state.EditedConfigEntity as IRange}
                        ConfigEntities={this.props.Ranges}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()} />
                }
            </PanelWithButton>

        );
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }
    onFinishWizard() {
        this.props.onAddUpdateRange(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as IRange)
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyRange(), WizardStartIndex: 0, EditedIndexConfigEntity: -1 })
    }

    onEdit(index: number, rangeToEdit: IRange) {
        let clonedRangeToEdit = Helper.cloneObject(rangeToEdit)
        this.setState({ EditedConfigEntity: clonedRangeToEdit, WizardStartIndex: 0, EditedIndexConfigEntity: index })
    }

    onApplyExport(range: string, exportDestination: ExportDestination) {
        this.props.onApplyExport(range, exportDestination);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Ranges: state.Range.Ranges,
        CurrentRange: state.Range.CurrentRange,
        LiveRanges: state.Range.CurrentLiveRanges,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (value: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ExportApply(value, exportDestination)),
        onAddUpdateRange: (Index: number, Range: IRange) => dispatch(RangeRedux.RangeAddUpdate(Index, Range)),
        onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(RangeRedux.RangeStopLive(range, exportDestination)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ExportStrategyId))
    };
}

export let ExportPopup = connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);


let panelStyle = {
    width: '800px',
}

