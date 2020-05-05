import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
import ErrorBox from '../../../components/ErrorBox';
import Textarea from '../../../components/Textarea';
import WizardPanel from '../../../components/WizardPanel';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import Input from '../../../components/Input';
import { Box, Flex } from 'rebass';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import CheckBox from '../../../components/CheckBox';
import { CalculatedColumnExpressionService } from '../../../Utilities/Services/CalculatedColumnExpressionService';
import { ICalculatedColumnExpressionService } from '../../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { AdaptableColumn } from '../../../types';
import calculatedColumn from '../../../components/icons/calculated-column';
import { evaluate } from 'adaptable-parser';
import useSelectionRange from '../../../components/utils/useSelectionRange';
import { Dispatch, SetStateAction, useState } from 'react';
import useProperty from '../../../components/utils/useProperty';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface CalculatedColumnExpressionWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
  calculatedColumnExpressionService: ICalculatedColumnExpressionService;
}
export interface CalculatedColumnExpressionWizardState {
  ColumnExpression: string;
}

const dragImage = new Image(0, 0);
dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

interface EditorButtonProps extends SimpleButtonProps {
  data: string;
  textAreaRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>;
}
function EditorButton(props: EditorButtonProps) {
  return (
    <SimpleButton
      draggable={true}
      onDragStart={event => {
        document.getSelection().empty();
        event.dataTransfer.setData('text', props.data);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }}
      onClick={() => {
        props.textAreaRef.current.focus();
        document.execCommand('insertText', false, props.data);
      }}
      {...props}
    />
  );
}

interface ExpressionEditorProps {
  value?: string;
  onChange?: (event: React.FormEvent) => void;
  firstRow: { [key: string]: any };
  columns: AdaptableColumn[];
}
function ExpressionEditor(props: ExpressionEditorProps) {
  const [textAreaRefCallback, textAreaRef, selectionStart, selectionEnd] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;
  const [data, setData] = useState(props.firstRow);
  let result;

  try {
    result = evaluate(props.value, { data });
  } catch (error) {
    result = 'Error: ' + error.message;
  }

  return (
    <Flex flexDirection="row">
      <Box flex={1}>
        <EditorButton data="+" textAreaRef={textAreaRef}>
          +
        </EditorButton>
        <EditorButton data="-" textAreaRef={textAreaRef}>
          -
        </EditorButton>
        <EditorButton data="*" textAreaRef={textAreaRef}>
          *
        </EditorButton>
        <EditorButton data="/" textAreaRef={textAreaRef}>
          /
        </EditorButton>
        <Textarea
          ref={textAreaRefCallback}
          value={props.value}
          placeholder="Enter expression"
          autoFocus
          onChange={props.onChange}
          style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
        />
        <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
      </Box>
      <FormLayout>
        {props.columns.map(column => (
          <FormRow
            key={column.ColumnId}
            label={
              <EditorButton data={`COL('${column.ColumnId}')`} textAreaRef={textAreaRef}>
                {column.FriendlyName}
              </EditorButton>
            }
          >
            {column.DataType === 'Number' ? (
              <Input type="number" defaultValue={data[column.ColumnId]} />
            ) : column.DataType === 'String' ? (
              <Input type="text" defaultValue={data[column.ColumnId]} />
            ) : column.DataType === 'Date' ? (
              <Input type="date" defaultValue={data[column.ColumnId].toISOString().substr(0, 10)} />
            ) : column.DataType === 'Boolean' ? (
              <CheckBox defaultChecked={data[column.ColumnId]} />
            ) : null}
          </FormRow>
        ))}
      </FormLayout>
    </Flex>
  );
}

export class CalculatedColumnExpressionWizard
  extends React.Component<
    CalculatedColumnExpressionWizardProps,
    CalculatedColumnExpressionWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnExpressionWizardProps) {
    super(props);
    this.state = { ColumnExpression: this.props.Data.ColumnExpression };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(
      this.props.GetErrorMessage()
    )
      ? null
      : 'error';

    const firstRow = this.props.Adaptable.getFirstRowNode().data;

    return (
      <Flex p={2}>
        <Box flex={1}>
          <ExpressionEditor
            value={this.state.ColumnExpression}
            onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
            firstRow={firstRow}
            columns={this.props.Columns}
          />
          {/* {validationState ? (
            <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
          ) : null} */}
        </Box>
      </Flex>
    );
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.IsExpressionValid(e.value);
    this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression) &&
      StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage())
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    const hasChanged: boolean = this.props.Data.ColumnExpression != this.state.ColumnExpression;
    this.props.Data.ColumnExpression = this.state.ColumnExpression;

    // if its changed then lets work out the other values based on it
    if (hasChanged) {
      // workd out the correct datatype if possible
      const cleanedExpression: string = this.props.calculatedColumnExpressionService.CleanExpressionColumnNames(
        this.state.ColumnExpression,
        this.props.Columns
      );

      const dataType = this.props.calculatedColumnExpressionService.GetCalculatedColumnDataType(
        cleanedExpression
      );

      const pivotable: boolean = dataType == DataType.String;
      const aggregatable: boolean = dataType == DataType.Number;

      this.props.Data.CalculatedColumnSettings.DataType = dataType;
      this.props.Data.CalculatedColumnSettings.Pivotable = pivotable;
      this.props.Data.CalculatedColumnSettings.Aggregatable = aggregatable;
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
