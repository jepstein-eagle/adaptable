import * as React from 'react';
import * as Redux from 'redux';
import { Sizes } from 'react-bootstrap';
import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';
import { ButtonShare } from './ButtonShare';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { AdaptableBlotterObject } from '../../../PredefinedConfig/AdaptableBlotterObject';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';

export interface EntityListActionButtonsProps
  extends React.ClassAttributes<EntityListActionButtons> {
  editClick?: () => void;
  shareClick?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
  showShare?: boolean;
  overrideDisableEdit?: boolean;
  overrideDisableDelete?: boolean;
  overrideDisableShare?: boolean;
  overrideTooltipEdit?: string;
  overrideTooltipDelete?: string;
  overrideTooltipShare?: string;
  ConfirmDeleteAction: Redux.Action;
  EntityType: string;
  cssClassName: string;
  AccessLevel: AccessLevel;
  editSize: any;
  deleteSize: any;
  shareSize: any;
}

const stopPropagation = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
  public static defaultProps: EntityListActionButtonsProps = {
    showEdit: true,
    showDelete: true,
    showShare: false,
    overrideDisableEdit: false,
    overrideDisableDelete: false,
    overrideDisableShare: false,
    ConfirmDeleteAction: null,
    EntityType: '',
    cssClassName: '',
    AccessLevel: AccessLevel.Full,
    editSize: 'xsmall',
    deleteSize: 'xsmall',
    shareSize: 'xsmall',
  };
  render() {
    return (
      <Flex
        className={this.props.cssClassName + StyleConstants.BUTTON_TOOLBAR}
        justifyContent="center"
        style={{ margin: '0px', padding: '0px', cursor: 'auto' }}
        onClick={stopPropagation}
      >
        {this.props.showEdit && (
          <ButtonEdit
            onClick={() => this.props.editClick()}
            cssClassName={this.props.cssClassName}
            style={{
              marginLeft: '0px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '2px',
              color: 'var(--ab-color-accent)',
              background: 'var(--ab-color-accentlight)',
            }}
            overrideDisableButton={this.props.overrideDisableEdit}
            overrideTooltip={this.props.overrideTooltipEdit}
            DisplayMode="Glyph"
            size={this.props.editSize}
            AccessLevel={this.props.AccessLevel}
          />
        )}
        {this.props.showDelete && (
          <ButtonDelete
            cssClassName={this.props.cssClassName}
            style={{
              marginLeft: '1px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '1px',
              color: 'var(--ab-color-error)',
              background: 'var(--ab-color-errorlight)',
            }}
            overrideDisableButton={this.props.overrideDisableDelete}
            overrideTooltip={this.props.overrideTooltipDelete}
            DisplayMode="Glyph"
            ConfirmAction={this.props.ConfirmDeleteAction}
            ConfirmationMsg={'Are you sure you want to delete this ' + this.props.EntityType + '?'}
            ConfirmationTitle={'Delete ' + this.props.EntityType}
            size={this.props.deleteSize}
            AccessLevel={this.props.AccessLevel}
          />
        )}
        {this.props.showShare && (
          <ButtonShare
            onClick={() => this.props.shareClick()}
            cssClassName={this.props.cssClassName}
            style={{ marginLeft: '2px', marginTop: '2px', marginBottom: '2px', marginRight: '0px' }}
            overrideDisableButton={this.props.overrideDisableShare}
            overrideTooltip={this.props.overrideTooltipShare}
            DisplayMode="Glyph"
            size={this.props.shareSize}
            AccessLevel={this.props.AccessLevel}
          />
        )}
      </Flex>
    );
  }
}
