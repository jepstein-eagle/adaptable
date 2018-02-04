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
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IUserFilter } from '../../Core/Interface/IExpression';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Helpers/UserFilterHelper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExpressionMode } from '../../Core/Enums'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ColumnFilterEntityRow } from './ColumnFilterEntityRow';
import { EntityItemList } from '../Components/EntityItemList';

interface ColumnFilterPopupProps extends IStrategyViewPopupProps<ColumnFilterPopupComponent> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    ColumnFilters: IColumnFilter[]
    onDeleteFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class ColumnFilterPopupComponent extends React.Component<ColumnFilterPopupProps, {}> {

    constructor() {
        super();
        this.state = { EditedUserFilter: null, WizardStartIndex: 0 }
    }

    render() {
        let infoBody: any[] = ["Column Filters are Column Queries that can be named and re-used.", <br />, <br />]

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Column", Width: 3 },
            { Caption: "Filter", Width: 7 },
            { Caption: "", Width: 2 },
        ]
        let columnFilterItems = this.props.ColumnFilters.map((columnFilter, index) => {
            return <ColumnFilterEntityRow
                key={index}
                EntityRowInfo={entityRowInfo}
                ConfigEntity={null}
                ColumnFilter={columnFilter}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={null}
                onDeleteConfirm={null}
                onClear={() => this.props.onDeleteFilter(columnFilter)}
            />

        })

        return <PanelWithButton headerText={StrategyIds.ColumnFilterStrategyId} bsStyle="primary" style={panelStyle} infoBody={infoBody}
            button={null} glyphicon={StrategyGlyphs.UserFilterGlyph}>
            {columnFilterItems.length > 0 &&
               <EntityItemList entityRowInfo={entityRowInfo} items={columnFilterItems} />
            }

            {columnFilterItems.length == 0 &&
                <Well bsSize="small">There are currently no column filters applied.  Create column filters by using the filter dropdown in each column header.</Well>
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

export let ColumnFilterPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterPopupComponent);


let panelStyle = {
    width: '800px'
}
