import * as React from 'react';

import { Button, ButtonProps as BtnProps } from 'rebass';

import join from '../../../../components/utils/join';
import { AccessLevel } from '../../../../PredefinedConfig/EntitlementState';

const Glyphicon = ({ glyph, style }: { style?: any; glyph: string }) => {
  return <span style={style} className={`glyphicon glyphicon-${glyph}`} />;
};
const baseClassName = 'ab-Button';

// export interface ButtonProps extends React.ClassAttributes<ButtonBase> {
//   onClick?: (...args: any[]) => void;
//   //override disabled normal status. i.e. when IsReadOnly == true.
//   overrideDisableButton?: boolean;
//   //Override normal tooltip i.e. Edit
//   overrideTooltip?: string;
//   //The entity we pass in to check normal disabled status
//   //  ConfigEntity?: IAdaptableObject
//   style?: React.CSSProperties;

//   //Override normal Text i.e. Edit
//   overrideText?: string;
//   DisplayMode: 'Glyph' | 'Text' | 'Glyph+Text' | 'Text+Glyph';
//   tooltip: ReactNode;
//   transformGlyph?: boolean;
//   bsStyle?: string;
//
//   glyph?: string;
//   hideToolTip?: boolean;
//   AccessLevel?: AccessLevel;
//   showDefaultStyle?: boolean;
// }

export interface ButtonBaseProps extends BtnProps {
  overrideDisableButton?: boolean;
  transformGlyph?: boolean;
  className?: string;
  accessLevel?: AccessLevel;
  showDefaultStyle?: boolean;
  displayMode?: string;
  icon?: string;
  toolTipAndText?: string;
  glyph?: string;
  overrideText?: string;
  overrideTooltip?: string;
  iconPosition?: string;
  hideToolTip?: boolean;
}

export type ButtonProps = ButtonBaseProps;

export class ButtonBase extends React.Component<ButtonBaseProps, {}> {
  public static defaultProps: ButtonBaseProps = {
    overrideDisableButton: false,
    toolTipAndText: '',
    glyph: '',
    displayMode: 'Glyph+Text',
    transformGlyph: false,
    accessLevel: 'Full',
    showDefaultStyle: false,
  };
  render() {
    let isDisabled: boolean;
    isDisabled = this.props.accessLevel == 'Hidden';

    if (this.props.overrideDisableButton || this.props.disabled) {
      isDisabled = true;
    }
    let text = this.props.children || this.props.toolTipAndText;
    if (this.props.overrideText) {
      text = this.props.overrideText;
    }
    let tooltip = this.props.toolTipAndText;
    if (this.props.overrideTooltip) {
      tooltip = this.props.overrideTooltip;
    }
    let hideToolTip = this.props.hideToolTip ? this.props.hideToolTip : false;

    let content: React.ReactElement<any>;
    if (this.props.displayMode == 'Glyph') {
      if (this.props.transformGlyph) {
        content = <Glyphicon glyph={this.props.glyph} style={{ transform: 'scale(-1, 1)' }} />;
      } else {
        content = <Glyphicon glyph={this.props.glyph} />;
      }
    } else if (this.props.displayMode == 'Text') {
      content = <span>{text}</span>;
    } else if (this.props.displayMode == 'Glyph+Text') {
      content = (
        <div>
          <Glyphicon glyph={this.props.glyph} /> {text}
        </div>
      );
    } else if (this.props.displayMode == 'Text+Glyph') {
      content = (
        <div>
          {text} <Glyphicon glyph={this.props.glyph} />
        </div>
      );
    }

    if (this.props.icon) {
      content = (
        <>
          {this.props.iconPosition === 'end' ? text : null} <Glyphicon glyph={this.props.icon} />{' '}
          {this.props.iconPosition !== 'end' ? text : null}
        </>
      );
    }

    let button = (
      <Button
        {...this.props}
        style={{ color: 'currentColor', ...this.props.style }}
        className={join(
          baseClassName,
          `${baseClassName}--size-${'normal'}`,
          `${baseClassName}--style-${'normal'}`,
          isDisabled ? `${baseClassName}--disabled` : `${baseClassName}--enabled`
        )}
        disabled={isDisabled}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown || (e => e.preventDefault())}
      >
        {content}
      </Button>
    );
    let buttonwithtooltip = <div>{button}</div>;
    return hideToolTip ? button : buttonwithtooltip;
  }
}
