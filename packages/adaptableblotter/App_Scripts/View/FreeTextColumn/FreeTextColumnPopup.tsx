import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { Well } from 'react-bootstrap';
import { FreeTextColumnEntityRow } from './FreeTextColumnEntityRow'
import { FreeTextColumnWizard } from './Wizard/FreeTextColumnWizard'
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IFreeTextColumn, IAdaptableBlotterObject } from "../../Utilities/Interface/IAdaptableBlotterObjects";


interface FreeTextColumnPopupProps extends StrategyViewPopupProps<FreeTextColumnPopupComponent> {
    FreeTextColumns: Array<IFreeTextColumn>,
    onAddFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnAddAction
    onEditFreeTextColumn: (Index: number, FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class FreeTextColumnPopupComponent extends React.Component<FreeTextColumnPopupProps, EditableConfigEntityState> {

    constructor(props: FreeTextColumnPopupProps) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
             if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editFreeTextColumn = this.props.FreeTextColumns.find(x => x.ColumnId == arrayParams[1])
                let index = this.props.FreeTextColumns.indexOf(editFreeTextColumn)
                this.onEdit(index, editFreeTextColumn)
            }
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__FreeTextcolumn";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__FreeTextcolumn";

        let infoBody: any[] = ["A FreeText Column is one where you can insert any values you wish (e.g.comments).", <br />, <br />, "These values are stored with your settings and not with the rest of the data in the grid."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Default Value", Size: 3 },
            { Content: "No. Stored Value", Size: 3 },
            { Content: "", Size: 3 },
        ]
        let freeTextColumns = this.props.FreeTextColumns.map((FreeTextColumn: IFreeTextColumn, index) => {
            return <FreeTextColumnEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={FreeTextColumn}
                Columns={this.props.Columns}
                UserFilters={null}
                Index={index}
                onEdit={() => this.onEdit(index, FreeTextColumn)}
                onShare={() => this.props.onShare(FreeTextColumn)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={FreeTextColumnRedux.FreeTextColumnDelete(FreeTextColumn)} />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create FreeText Column"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.FreeTextColumnStrategyName}
                button={newButton}
                bsStyle="primary" className="ab_main_popup" glyphicon={StrategyConstants.FreeTextColumnGlyph} infoBody={infoBody}>

                {this.props.FreeTextColumns.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a new column FreeText.</Well>
                }

                {freeTextColumns.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={freeTextColumns} />
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <FreeTextColumnWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IFreeTextColumn}
                        ModalContainer={this.props.ModalContainer}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Columns={this.props.Columns}
                        Blotter={this.props.Blotter}
                        ConfigEntities={this.props.FreeTextColumns}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyFreeTextColumn(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, FreeTextColumn: IFreeTextColumn) {
        let clonedObject: IFreeTextColumn = Helper.cloneObject(FreeTextColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index  });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
        let freeTextColumn = this.state.EditedAdaptableBlotterObject as IFreeTextColumn
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditFreeTextColumn(this.state.EditedAdaptableBlotterObjectIndex, freeTextColumn)
          } else {
            this.props.onAddFreeTextColumn(freeTextColumn)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }

    canFinishWizard() {
        let freeTextColumn = this.state.EditedAdaptableBlotterObject as IFreeTextColumn
        return StringExtensions.IsNotNullOrEmpty(freeTextColumn.ColumnId)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
        onEditFreeTextColumn: (Index: number, FreeTextColumn: IFreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnEdit(Index, FreeTextColumn)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId))
    };
}

export let FreeTextColumnPopup = connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnPopupComponent);


