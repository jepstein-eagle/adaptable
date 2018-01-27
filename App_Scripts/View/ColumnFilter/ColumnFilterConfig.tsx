import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Panel, ControlLabel, Row, Col, ButtonToolbar, ListGroup, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IUserFilter } from '../../Core/Interface/IExpression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExpressionMode } from '../../Core/Enums'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';
import { IColumnFilter } from '../../Core/Interface/IColumnFilterStrategy';
import { ButtonClear } from '../Components/Buttons/ButtonClear';

interface ColumnFilterConfigProps extends IStrategyViewPopupProps<ColumnFilterConfigComponent> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    ColumnFilters: IColumnFilter[]
    onDeleteFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class ColumnFilterConfigComponent extends React.Component<ColumnFilterConfigProps, {}> {

    constructor() {
        super();
        this.state = { EditedUserFilter: null, WizardStartIndex: 0 }
    }

    render() {
        let infoBody: any[] = ["Column Filters are Column Queries that can be named and re-used.", <br />, <br />]

        let cellInfo: [string, number][] = [["Column", 3], ["Filter", 7], ["",2]];

        let columnFilterItems = this.props.ColumnFilters.map((columnFilter, index) => {
            let myCols: IColItem[] = []
            myCols.push({
                size: 3, content: this.props.Columns.find(c=>c.ColumnId == columnFilter.ColumnId).FriendlyName
            });
            myCols.push({
                size: 7, content: ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, this.props.UserFilters)
              });
            let buttons: any = <ButtonClear onClick={() => this.props.onDeleteFilter(columnFilter)} overrideTooltip="Clear Column Filter"
            DisplayMode="Glyph"
            overrideDisableButton={columnFilter == null} />
            myCols.push({ size: 2, content: buttons });

            return <ConfigEntityRow items={myCols} key={index} />
        })

        return <PanelWithButton headerText="Column Filters" bsStyle="primary" style={panelStyle} infoBody={infoBody}
            button={null} glyphicon={StrategyGlyphs.UserFilterGlyph}>
            {columnFilterItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {columnFilterItems}
                    </ListGroup>
                </div>
            }

            {columnFilterItems.length == 0 &&
                <Well bsSize="small">There are currently no column filters applied.</Well>
            }

        </PanelWithButton>
    }

    onCreateUserFilter() {
        this.setState({ EditedUserFilter: ObjectFactory.CreateEmptyUserFilter(), WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.ColumnFilterDelete(columnFilter)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let ColumnFilterConfig = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterConfigComponent);

let listGroupStyle: React.CSSProperties = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}
