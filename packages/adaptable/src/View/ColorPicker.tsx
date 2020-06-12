import * as React from 'react';
import Input from '../components/Input';
import { HTMLProps } from 'react';
import { BoxProps } from 'rebass';

export type ColorPickerProps = HTMLProps<HTMLInputElement> & {
  ColorPalette: string[];
} & BoxProps;

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
  render(): any {
    const { ColorPalette, ...restProps } = this.props;
    let ABcolorChoicesOptions = ColorPalette.map(x => <option key={x}>{x}</option>);
    let ABcolorChoices = <datalist id={'ABcolorChoices'}>{ABcolorChoicesOptions}</datalist>;
    return (
      <div className={'ColorPicker'}>
        <Input
          {...restProps}
          type="color"
          style={{
            width: 70,
            padding: 0 /* we need this to be 0, since otherwise on Windows browsers, the chosen color cannot be seen */,
          }}
          list="ABcolorChoices"
        />
        {ABcolorChoices}
      </div>
    );
  }
}
