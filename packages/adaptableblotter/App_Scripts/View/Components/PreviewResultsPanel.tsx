import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { IPreviewInfo, IPreviewResult } from '../../Utilities/Interface/IPreview';
import { CellValidationRule } from '../../PredefinedConfig/RunTimeState/CellValidationState';

import WizardPanel from '../../components/WizardPanel';
import Table from '../../components/Table';
import CheckIcon from '../../components/icons/check';
import icons, { Icon } from '../../components/icons';
import UIHelper from '../UIHelper';
import Panel from '../../components/Panel';

export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
  UpdateValue: string;
  PreviewInfo: IPreviewInfo;
  Columns: IColumn[];
  UserFilters: UserFilter[];
  SelectedColumn: IColumn;
  ShowPanel: boolean;
  style?: React.CSSProperties;
  ShowHeader: boolean;
}

export class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
  render(): any {
    let previewHeader: string =
      this.props.ShowHeader && this.props.PreviewInfo != null
        ? 'Preview Results: ' +
          (this.props.SelectedColumn ? this.props.SelectedColumn.FriendlyName : '')
        : '';

    let successColor = UIHelper.getColorByMessageType(MessageType.Success);

    var previewItems = this.props.PreviewInfo.PreviewResults.map(
      (previewResult: IPreviewResult, index: number) => {
        return (
          <tr key={index}>
            <td>{previewResult.InitialValue}</td>
            <td>{previewResult.ComputedValue}</td>
            {previewResult.ValidationRules.length > 0 ? (
              <td>
                {this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[
                      this.getValidationErrorMessage(
                        previewResult.ValidationRules,
                        this.props.Columns
                      ),
                    ]}
                    MessageType={MessageType.Error}
                  />
                )}
                {this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[
                      this.getValidationErrorMessage(
                        previewResult.ValidationRules,
                        this.props.Columns
                      ),
                    ]}
                    MessageType={MessageType.Warning}
                  />
                )}
              </td>
            ) : (
              <td>
                {' '}
                <CheckIcon style={{ color: successColor, fill: 'currentColor' }} />
              </td>
            )}
          </tr>
        );
      }
    );
    var header = (
      <thead>
        <tr>
          <th>Old</th>
          <th>New</th>
          <th>Valid</th>
        </tr>
      </thead>
    );

    return (
      <div style={{ flex: 1, overflow: 'auto', ...this.props.style }}>
        {this.props.ShowPanel && (
          <Panel header={previewHeader} bodyScroll>
            <Table style={{ width: '100%' }}>
              {header}
              <tbody style={{ minWidth: 500 }}>{previewItems}</tbody>
            </Table>
          </Panel>
        )}
      </div>
    );
  }

  private getValidationErrorMessage(
    CellValidations: CellValidationRule[],
    columns: IColumn[]
  ): string {
    let returnString: string[] = [];
    for (let CellValidation of CellValidations) {
      let expressionDescription: string = ExpressionHelper.IsNotNullOrEmptyExpression(
        CellValidation.Expression
      )
        ? ' when ' +
          ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns)
        : '';
      returnString.push(
        CellValidationHelper.createCellValidationDescription(CellValidation, columns) +
          expressionDescription
      );
    }
    return returnString.join('\n');
  }
}
