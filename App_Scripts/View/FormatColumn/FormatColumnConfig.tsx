import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums'
import { FormatColumnConfigItem } from './FormatColumnConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { FormatColumnWizard } from './FormatColumnWizard'
import { Helper } from '../../Core/Helper';
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


interface FormatColumnConfigProps extends IStrategyViewPopupProps<FormatColumnConfigComponent> {
    FormatColumns: Array<IFormatColumn>,
    Columns: IColumn[],
    PredefinedColorChoices: string[],
    onAddFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

interface FormatColumnConfigState {
    EditedFormatColumn: IFormatColumn
    WizardStartIndex: number
}

class FormatColumnConfigComponent extends React.Component<FormatColumnConfigProps, FormatColumnConfigState> {

    constructor() {
        super();
        this.state = { EditedFormatColumn: null, WizardStartIndex: 0 }
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

        let infoBody: any[] = ["Format a column so it styles with the colours and font properties that you provide."]

        let cellInfo: [string, number][] = [["Column", 3], ["Style", 5], ["", 4]];

        let FormatColumns = this.props.FormatColumns.map((formatColumn: IFormatColumn, index) => {
            return <FormatColumnConfigItem
                FormatColumn={formatColumn}
                key={"CS" + index}
                Columns={this.props.Columns}
                onEdit={(formatColumn) => this.onEdit(formatColumn)}
                onShare={() => this.props.onShare(formatColumn)}
                onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)} >
            </FormatColumnConfigItem>
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Format Column"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText={StrategyNames.FormatColumnStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.FormatColumnGlyph} infoBody={infoBody}>

            {this.props.FormatColumns.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new column format.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {FormatColumns}
            </ListGroup>

            {this.state.EditedFormatColumn != null &&
                <FormatColumnWizard
                EditedFormatColumn={this.state.EditedFormatColumn}
                PredefinedColorChoices={this.props.PredefinedColorChoices}
                Columns={this.props.Columns.filter(x => !this.props.FormatColumns.find(y => y.ColumnId == x.ColumnId))} 
                FormatColumns={this.props.FormatColumns}
                WizardStartIndex={this.state.WizardStartIndex}
                closeWizard={() => this.closeWizard()}
                WizardFinish={() => this.WizardFinish()}
            />
            }
               
        </PanelWithButton>
    }

    onNew() {
        this.setState({ EditedFormatColumn: ObjectFactory.CreateEmptyFormatColumn(), WizardStartIndex: 0 });
    }

    onEdit(formatColumn: IFormatColumn) {
        let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
        this.setState({ EditedFormatColumn: clonedObject, WizardStartIndex: 1});
    }

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedFormatColumn: null, WizardStartIndex: 0 });
    }

    WizardFinish() {
        if (this.props.FormatColumns.find(x => x.ColumnId == this.state.EditedFormatColumn.ColumnId)) {
            this.props.onEditFormatColumn(this.state.EditedFormatColumn)
        } else {
            this.props.onAddFormatColumn(this.state.EditedFormatColumn)
        }
        this.setState({ EditedFormatColumn: null, WizardStartIndex: 0 });
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
        onEditFormatColumn: (formatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit( formatColumn)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.FormatColumnStrategyId))
    };
}

export let FormatColumnConfig = connect(mapStateToProps, mapDispatchToProps)(FormatColumnConfigComponent);

let panelStyle = {
    width: '800px'
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}