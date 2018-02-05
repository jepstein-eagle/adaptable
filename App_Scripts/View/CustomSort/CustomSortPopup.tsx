import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { CustomSortEntityRow } from './CustomSortEntityRow'
import { CustomSortWizard } from './Wizard/CustomSortWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { EntityItemList } from '../Components/EntityItemList';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';

interface CustomSortPopupProps extends IStrategyViewPopupProps<CustomSortPopupComponent> {
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction
    CustomSorts: Array<ICustomSort>
    Columns: Array<IColumn>
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class CustomSortPopupComponent extends React.Component<CustomSortPopupProps, EditableConfigEntityInternalState> {
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity:0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newCustomSort = ObjectFactory.CreateEmptyCustomSort()
                newCustomSort.ColumnId = arrayParams[1]
                this.onEdit(newCustomSort)
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editCustomSort = this.props.CustomSorts.find(x => x.ColumnId == arrayParams[1])
                this.onEdit(editCustomSort)
            }
        }
    }

    render() {
        let infoBody: any[] = ["Custom Sorts enable you to create your own sort orders for columns where the default (alphabetical ascending or descending) is insufficient.", <br />, <br />,
            "Use the Wizard to specify and order the column values in the Sort.", <br />, <br />,
            "A Custom Sort can contain as many column values as required; any values not contained in the Custom Sort will be sorted alphabetically ", <strong>after</strong>, " the sort order has been applied."]

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Column", Width: 3 },
            { Caption: "Sort Order", Width: 6 },
            { Caption: "", Width: 3 },
        ]

        let customSorts = this.props.CustomSorts.map((customSort: ICustomSort, index) => {
            let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
            return <CustomSortEntityRow
            EntityRowInfo={entityRowInfo}
                ConfigEntity={customSort}
                key={customSort.ColumnId}
                Index={index}
                onEdit={(index, customSort) => this.onEdit(customSort as ICustomSort)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(customSort)}
                onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
                ColumnLabel={column ? column.FriendlyName : customSort.ColumnId + Helper.MissingColumnMagicString} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Custom Sort"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.CustomSortStrategyName} style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={StrategyGlyphs.CustomSortGlyph}>

            {customSorts.length > 0 &&
                <EntityItemList entityRowInfo={entityRowInfo} items={customSorts} />
            }

            {customSorts.length == 0 &&
                <Well bsSize="small">Click 'New' to create a bespoke sort order for a selected column.</Well>
            }

            {this.state.EditedConfigEntity &&
                <CustomSortWizard
                    EditedCustomSort={this.state.EditedConfigEntity as ICustomSort}
                    CustomSorts={this.props.CustomSorts}
                    Columns={this.props.Columns}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
       let customSort:ICustomSort = this.state.EditedConfigEntity as ICustomSort;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort)
        }
        else {
            this.props.onAddCustomSort(customSort)
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onEdit(customSort: ICustomSort) {
        //so we dont mutate original object
        this.setState({ EditedConfigEntity: Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyCustomSort(), WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortAdd(customSort)),
        onEditCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortEdit(customSort)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CustomSortStrategyId))
    };
}

export let CustomSortPopup = connect(mapStateToProps, mapDispatchToProps)(CustomSortPopupComponent);

let panelStyle = {
    width: '800px'
}