import * as React from 'react';
import * as Redux from 'redux';

import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';

import { Flex } from 'rebass';
import { ButtonShare } from './ButtonShare';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import { IAdaptable } from '../../../types';

export interface EntityListActionButtonsProps
  extends React.ClassAttributes<EntityListActionButtons> {
  // Adaptable: IAdaptable;
  editClick?: () => void;
  shareClick?: (description: string) => void;
  showEdit?: boolean;
  showDelete?: boolean;
  showShare?: boolean;
  overrideDisableEdit?: boolean;
  overrideDisableDelete?: boolean;
  overrideDisableShare?: boolean;
  overrideTooltipEdit?: string;
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
              color: 'var(--ab-color-text-on-info)',
              fill: 'var(--ab-color-text-on-info)',
              background: 'var(--ab-color-info)',
            }}
            disabled={this.props.overrideDisableEdit || this.props.accessLevel == 'ReadOnly'}
            tooltip={this.props.overrideTooltipEdit}
            accessLevel={this.props.accessLevel}
          />
        )}
        {this.props.showDelete && (
          <ButtonDelete
            data-name="edit"
            style={{
              marginLeft: '1px',
              marginTop: '2px',
              marginBottom: '2px',
              marginRight: '1px',
              color: 'var(--ab-color-text-on-error)',
              fill: 'var(--ab-color-text-on-error)',
              background: 'var(--ab-color-error)',
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
              color: 'var(--ab-color-text-on-warn)',
              fill: 'var(--ab-color-text-on-warn)',
              background: 'var(--ab-color-warn)',
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
