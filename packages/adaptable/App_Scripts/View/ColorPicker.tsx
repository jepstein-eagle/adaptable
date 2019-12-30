import * as React from 'react';
import Input from '../components/Input';

export interface ColorPickerProps extends React.HTMLProps<ColorPicker> {
  ColorPalette: string[];
}

export class ColorPicker extends React.Component<ColorPickerProps, {}> {
  render(): any {
    const { ColorPalette, ...restProps } = this.props;
    let ABcolorChoicesOptions = ColorPalette.map(x => <option key={x}>{x}</option>);
    let ABcolorChoices = <datalist id={'ABcolorChoices'}>{ABcolorChoicesOptions}</datalist>;
    const Inpt = Input as any;
    return (
      <div className={'ColorPicker'}>
        <Inpt
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
