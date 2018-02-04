import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums'
import { FormatColumnEntityRow } from './FormatColumnEntityRow'
import { FormatColumnWizard } from './Wizard/FormatColumnWizard'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { EntityItemList } from '../Components/EntityItemList';


interface FormatColumnPopupProps extends IStrategyViewPopupProps<FormatColumnPopupComponent> {
    FormatColumns: Array<IFormatColumn>,
    Columns: IColumn[],
    PredefinedColorChoices: string[],
    onAddFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class FormatColumnPopupComponent extends React.Component<FormatColumnPopupProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity:0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newFormatColumn = ObjectFactory.CreateEmptyFormatColumn()
                newFormatColumn.ColumnId = arrayParams[1]
                this.onEdit(newFormatColumn)
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editFormatColumn = this.props.FormatColumns.find(x => x.ColumnId == arrayParams[1])
                this.onEdit(editFormatColumn)
            }
        }
    }

    render() {

        let infoBody: any[] = ["Format a column so it styles with the colours and font properties that you provide.", <br />, <br />, "Unlike Conditional Styles the column is ", <b>always</b>, " formatted as set and is not dependent on a rule being met."]

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Column", Width: 3 },
            { Caption: "Style", Width: 5 },
            { Caption: "", Width: 4 },
        ]
        let FormatColumns = this.props.FormatColumns.map((formatColumn: IFormatColumn, index) => {
            return <FormatColumnEntityRow
                key={index}
                EntityRowInfo={entityRowInfo}
                ConfigEntity={formatColumn}
                Columns={this.props.Columns}
                UserFilters={null}
                Index={index}
                onEdit={(index, x) => this.onEdit(formatColumn)}
                onShare={() => this.props.onShare(formatColumn)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Format Column"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.FormatColumnStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.FormatColumnGlyph} infoBody={infoBody}>

            {this.props.FormatColumns.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new column format.</Well>
                : <PanelWithRow entityRowInfo={entityRowInfo} bsStyle="info" />
            }

            {FormatColumns.length > 0 &&
                <EntityItemList entityRowInfo={entityRowInfo} items={FormatColumns} />
            }

            {this.state.EditedConfigEntity != null &&
                <FormatColumnWizard
                    EditedFormatColumn={this.state.EditedConfigEntity as IFormatColumn}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    Columns={this.props.Columns.filter(x => !this.props.FormatColumns.find(y => y.ColumnId == x.ColumnId))}
                    FormatColumns={this.props.FormatColumns}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }

        </PanelWithButton>
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyFormatColumn(), WizardStartIndex: 0 });
    }

    onEdit(formatColumn: IFormatColumn) {
        let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
        this.setState({ EditedConfigEntity: clonedObject, WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
       let formatColumn = this.state.EditedConfigEntity as IFormatColumn
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn)
        } else {
            this.props.onAddFormatColumn(formatColumn)
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FormatColumns: state.FormatColumn.FormatColumns,
        Columns: state.Grid.Columns,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddFormatColumn: (formatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
        onEditFormatColumn: (formatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.FormatColumnStrategyId))
    };
}

export let FormatColumnPopup = connect(mapStateToProps, mapDispatchToProps)(FormatColumnPopupComponent);

let panelStyle = {
    width: '800px'
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}