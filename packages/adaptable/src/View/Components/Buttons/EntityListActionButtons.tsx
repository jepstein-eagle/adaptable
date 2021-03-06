import * as React from 'react';
import * as Redux from 'redux';

import { ButtonEdit } from './ButtonEdit';
import { ButtonClone } from './ButtonClone';
import { ButtonDelete } from './ButtonDelete';

import { Flex } from 'rebass';
import { ButtonShare } from './ButtonShare';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import { IAdaptable } from '../../../types';

export interface EntityListActionButtonsProps
  extends React.ClassAttributes<EntityListActionButtons> {
  // Adaptable: IAdaptable;
  editClick?: () => void;
  cloneClick?: () => void;
  shareClick?: (description: string) => void;
  showEdit?: boolean;
  showClone?: boolean;
  showDelete?: boolean;
  showShare?: boolean;
  overrideDisableEdit?: boolean;
  overrideDisableDelete?: boolean;
  overrideDisableClone?: boolean;
  overrideDisableShare?: boolean;
  overrideTooltipEdit?: string;
  overrideTooltipClone?: string;
  overrideTooltipDelete?: string;
  overrideTooltipShare?: string;
  confirmDeleteAction: Redux.Action;
  entityType: string;
  justifyContent?: string;

  accessLevel: AccessLevel;
  editSize: any;
  deleteSize: any;
  shareSize: any;
}

const stopPropagation = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
  public static defaultProps: EntityListActionButtonsProps = {
    // Adaptable: null,
    showEdit: true,
    showDelete: true,
    showShare: false,
    overrideDisableEdit: false,
    overrideDisableDelete: false,
    overrideDisableClone: false,
    overrideDisableShare: false,
    confirmDeleteAction: null,
    entityType: '',
    accessLevel: 'Full',
    editSize: 'xsmall',
    deleteSize: 'xsmall',
    shareSize: 'xsmall',
  };
  render() {
    return (
      <Flex
        justifyContent={this.props.justifyContent || 'center'}
        margin={0}
        padding={0}
        onClick={stopPropagation}
      >
        {this.props.showEdit && (
          <ButtonEdit
            onClick={() => (this.props.editClick ? this.props.editClick() : null)}
            style={{
              marginLeft: '0px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '2px',
              color: 'var(--ab-color-text-on-edit)',
              fill: 'var(--ab-color-text-on-edit)',
              background: 'var(--ab-color-action-edit)',
            }}
            disabled={this.props.overrideDisableEdit || this.props.accessLevel == 'ReadOnly'}
            tooltip={this.props.overrideTooltipEdit}
            accessLevel={this.props.accessLevel}
          />
        )}
        {this.props.showClone && (
          <ButtonClone
            onClick={() => (this.props.cloneClick ? this.props.cloneClick() : null)}
            style={{
              marginLeft: '0px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '2px',
              color: 'var(--ab-color-text-on-clone)',
              fill: 'var(--ab-color-text-on-clone)',
              background: 'var(--ab-color-action-clone)',
            }}
            children={null}
            disabled={this.props.overrideDisableClone || this.props.accessLevel == 'ReadOnly'}
            tooltip={this.props.overrideTooltipClone}
            accessLevel={this.props.accessLevel}
          />
        )}
        {this.props.showDelete && (
          <ButtonDelete
            data-name="delete"
            style={{
              marginLeft: '1px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '1px',
              //TODO move those styles in ButtonDelete
              color: 'var(--ab-color-text-on-delete)',
              fill: 'var(--ab-color-text-on-delete)',
              background: 'var(--ab-color-action-delete)',
            }}
            disabled={this.props.overrideDisableDelete || this.props.accessLevel == 'ReadOnly'}
            tooltip={this.props.overrideTooltipDelete}
            ConfirmAction={this.props.confirmDeleteAction}
            ConfirmationMsg={'Are you sure you want to delete this ' + this.props.entityType + '?'}
            ConfirmationTitle={'Delete ' + this.props.entityType}
            accessLevel={this.props.accessLevel}
          />
        )}
        {this.props.showShare && (
          <ButtonShare
            style={{
              marginLeft: '1px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '1px',
              color: 'var(--ab-color-text-on-share)',
              fill: 'var(--ab-color-text-on-share)',
              background: 'var(--ab-color-action-share)',
            }}
            onShare={(description: string) =>
              this.props.shareClick ? this.props.shareClick(description) : null
            }
            Header={'Please provide a Description for the Shared Item'}
            Message={undefined}
            disabled={this.props.overrideDisableShare || this.props.accessLevel == 'ReadOnly'}
            tooltip={this.props.overrideTooltipShare}
            accessLevel={this.props.accessLevel}
          />
        )}
      </Flex>
    );
  }
}
