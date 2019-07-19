import * as React from 'react';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import FieldWrap from '../../../components/FieldWrap';
import SimpleButton from '../../../components/SimpleButton';
import Input, { InputProps } from '../../../components/Input';

export type AdaptableBlotterFormControlTextClearProps = {
  OnTextChange: (textValue: string) => void;
  autoFocus?: boolean;
  cssClassName: string;
} & InputProps;

export class AdaptableBlotterFormControlTextClear extends React.Component<
  AdaptableBlotterFormControlTextClearProps,
  {}
> {
  render() {
    let cssClassName: string = this.props.cssClassName + StyleConstants.TEXT_ENTRY_FORM;

    return (
      <FieldWrap
        style={{ marginLeft: 2, marginRight: 2 /* in order for focus feedback to be visible */ }}
      >
        <Input
          className={cssClassName}
          autoFocus={this.props.autoFocus}
          style={this.props.style}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(x: any) => this.props.OnTextChange((x.target as HTMLInputElement).value)}
        />

        <SimpleButton
          className={cssClassName}
          onClick={() => this.props.OnTextChange('')}
          variant="text"
          icon="clear"
          tooltip="Clear"
          disabled={StringExtensions.IsNullOrEmpty(this.props.value.toString())}
        />
      </FieldWrap>
    );
  }
}
