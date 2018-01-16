import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { ISharedEntity } from '../../Core/Interface/ITeamSharingStrategy';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';

interface TeamSharingActionProps extends IStrategyViewPopupProps<TeamSharingActionComponent> {
    Entities: Array<ISharedEntity>
    onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction
    onImportItem: (entity: IConfigEntity, strategy: string) => TeamSharingRedux.TeamSharingImportItemAction
}

class TeamSharingActionComponent extends React.Component<TeamSharingActionProps, {}> {
    componentDidMount() {
        this.props.onGetSharedItems()
    }
    render() {
        let infoBody: any[] = ["Team Sharing"]

        let cellInfo: [string, number][] = [["Type", 2], ["User", 2], ["Timestamp", 2], ["Entity", 4], ["", 2]];
        let sharedItems = this.props.Entities.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={2}>
                        {x.strategy}
                    </Col>
                    <Col xs={2}>
                        {x.user}
                    </Col>
                    <Col xs={2}>
                        {x.timestamp.toLocaleString()}
                    </Col>
                    <Col xs={4}>
                        {"Wesh"}
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => this.props.onImportItem(x.entity, x.strategy)}><Glyphicon glyph="import" /></Button>
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithImage header="Team Sharing" style={panelStyle} infoBody={infoBody}
            bsStyle="primary" glyphicon={"share"}>
            {this.props.Entities.length == 0 ?
                <Well bsSize="small">Shared Items will appear here when available.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }
            <ListGroup style={divStyle}>
                {sharedItems}
            </ListGroup>
        </PanelWithImage>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Entities: state.TeamSharing.SharedEntities
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
        onImportItem: (entity: IConfigEntity, strategy: string) => dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy))
    };
}

export let TeamSharingAction = connect(mapStateToProps, mapDispatchToProps)(TeamSharingActionComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}
