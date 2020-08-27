import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyProfile } from '../Components/StrategyProfile';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IColItem } from '../UIInterfaces';
import { Icon } from '../../components/icons';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import Panel from '../../components/Panel';
import HelpBlock from '../../components/HelpBlock';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { SharedEntity } from '../../PredefinedConfig/TeamSharingState';
import { CustomSortSharedEntity } from '../CustomSort/CustomSortSharedEntity';
import { CalculatedColumnSharedEntity } from '../CalculatedColumn/CalculatedColumnSharedEntity';
import { CellValidationSharedEntity } from '../CellValidation/CellValidationSharedEntity';
import { ExportSharedEntity } from '../Export/ExportSharedEntity';
import { ConditionalStyleSharedEntity } from '../ConditionalStyle/ConditionalStyleSharedEntity';
import { FormatColumnSharedEntity } from '../FormatColumn/FormatColumnSharedEntity';
import { LayoutSharedEntity } from '../Layout/LayoutSharedEntity';
import { PlusMinusSharedEntity } from '../PlusMinus/PlusMinusSharedEntity';
import { ShortcutSharedEntity } from '../Shortcut/ShortcutSharedEntity';
import { UserFilterSharedEntity } from '../UserFilter/UserFilterSharedEntity';
import { PercentBarSharedEntity } from '../PercentBar/PercentBarSharedEntity';
import { SharedQuerySharedEntity } from '../Query/SharedQuerySharedEntity';

interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
  Entities: Array<SharedEntity>;
  onTeamSharingGet: () => TeamSharingRedux.TeamSharingGetAction;
  onImportItem: (
    Entity: AdaptableObject,
    strategy: AdaptableFunctionName
  ) => TeamSharingRedux.TeamSharingImportItemAction;
  onRemoveItem: (Uuid: string) => TeamSharingRedux.TeamSharingRemoveItemAction;
}

class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
  componentDidMount() {
    this.props.onTeamSharingGet();
  }

  render() {
    let infoBody: any[] = ['Team Sharing'];

    let colItems: IColItem[] = [
      { Content: 'Function', Size: 2 },
      { Content: 'Description', Size: 2 },
      { Content: 'Audit', Size: 3 },
      { Content: 'Details', Size: 6 },
      { Content: '', Size: 1 },
    ];
    let sharedItems = this.props.Entities.sort((a, b) => {
      return a.FunctionName < b.FunctionName ? -1 : 1;
    }).map((x, index) => {
      return (
        <Flex flexDirection="row" alignItems="center" key={index}>
          <Flex flex={2}>
            <StrategyProfile FunctionName={x.FunctionName} />
          </Flex>
          <Flex flex={2}>{x.Description}</Flex>
          <Flex flex={3}>
            {x.UserName}
            {<br />}
            {new Date(x.Timestamp).toLocaleString()}
          </Flex>
          <Flex flex={6} style={{ fontSize: 'small' }}>
            <Panel variant="primary">{this.getSharedItemDetails(x)}</Panel>
          </Flex>
          <Flex flex={1}>
            <SimpleButton
              variant="text"
              tooltip="import"
              onClick={() => this.props.onImportItem(x.Entity, x.FunctionName)}
            >
              <Icon name="import-export" />
            </SimpleButton>
            <SimpleButton
              variant="text"
              tooltip="remove"
              onClick={() => this.props.onRemoveItem(x.Uuid)}
            >
              <Icon name="delete" />
            </SimpleButton>
          </Flex>
        </Flex>
      );
    });

    return (
      <PanelWithImage
        header={StrategyConstants.TeamSharingStrategyFriendlyName}
        infoBody={infoBody}
        glyphicon={StrategyConstants.TeamSharingGlyph}
      >
        {this.props.Entities.length == 0 ? (
          <HelpBlock margin={3}>Shared Items will appear here when available.</HelpBlock>
        ) : (
          <PanelWithRow colItems={colItems} />
        )}
        {sharedItems}
      </PanelWithImage>
    );
  }

  getSharedItemDetails(sharedEntity: SharedEntity) {
    switch (sharedEntity.FunctionName) {
      case StrategyConstants.CalculatedColumnStrategyId: {
        return <CalculatedColumnSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }
      case StrategyConstants.CustomSortStrategyId: {
        return <CustomSortSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.CellValidationStrategyId: {
        return <CellValidationSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.ConditionalStyleStrategyId: {
        return <ConditionalStyleSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.ExportStrategyId: {
        return <ExportSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.FormatColumnStrategyId: {
        return <FormatColumnSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.LayoutStrategyId: {
        return <LayoutSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.PercentBarStrategyId: {
        return <PercentBarSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }
      case StrategyConstants.PlusMinusStrategyId: {
        return <PlusMinusSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }
      case StrategyConstants.ShortcutStrategyId: {
        return <ShortcutSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }
      case StrategyConstants.UserFilterStrategyId: {
        return <UserFilterSharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }
      case StrategyConstants.QueryStrategyId: {
        return <SharedQuerySharedEntity Entity={sharedEntity.Entity} Api={this.props.Api} />;
      }

      case StrategyConstants.FilterStrategyId: {
        return 'NEED TO DO  COLUMN FILTER'; // not sure actually
      }
      default:
        return 'NOT IMPLEMENTED';
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<TeamSharingPopupProps> {
  return {
    Entities: state.TeamSharing.SharedEntities,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<TeamSharingPopupProps> {
  return {
    onTeamSharingGet: () => dispatch(TeamSharingRedux.TeamSharingGet()),
    onImportItem: (entity: AdaptableObject, strategy: AdaptableFunctionName) =>
      dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy)),
    onRemoveItem: (Uuid: string) => dispatch(TeamSharingRedux.TeamSharingRemoveItem(Uuid)),
  };
}

export let TeamSharingPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSharingPopupComponent);
