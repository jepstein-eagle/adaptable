import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { IPreviewInfo, IPreviewResult } from '../../Utilities/Interface/IPreview';
import { CellValidationRule } from '../../PredefinedConfig/RunTimeState/CellValidationState';

import WizardPanel from '../../components/WizardPanel';
import CheckIcon from '../../components/icons/check';
import styled from 'styled-components';

export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
  UpdateValue: string;
  PreviewInfo: IPreviewInfo;
  Columns: IColumn[];
  UserFilters: UserFilter[];
  SelectedColumn: IColumn;
  ShowPanel: boolean;
  style?: React.CSSProperties;
  cssClassName: string;
  ShowHeader: boolean;
}
const Table = styled.table`
  td,
  th {
    padding: var(--ab-space-2);
  }
  th {
    border-bottom: 2px solid var(--ab-color-darkgray);
  }
  tr:not(last-child) td {
    border-bottom: 1px solid var(--ab-color-lightgray);
  }
`;

export class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + StyleConstants.PREVIEW_RESULTS;
    let previewHeader: string =
      this.props.ShowHeader && this.props.PreviewInfo != null
        ? 'Preview Results: ' +
          (this.props.SelectedColumn ? this.props.SelectedColumn.FriendlyName : '')
        : '';

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
                    cssClassName={cssClassName}
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
                    cssClassName={cssClassName}
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
                <CheckIcon />
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
      <div className={cssClassName} style={{ ...this.props.style, flex: 1, overflow: 'auto' }}>
        {this.props.ShowPanel && (
          <WizardPanel header={previewHeader} bodyScroll>
            <Table style={{ width: '100%' }}>
              {header}
              <tbody style={{ minWidth: 500 }}>{previewItems}</tbody>
            </Table>
          </WizardPanel>
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
