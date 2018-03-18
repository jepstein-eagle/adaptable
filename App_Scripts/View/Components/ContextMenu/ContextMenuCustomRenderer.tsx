import * as React from "react";
import { Glyphicon } from 'react-bootstrap';

export class ContextMenuCustomRenderer extends React.Component<any, {}> {
    render() {
        var className = this.props.className + " " + this.props.classPrefix + 'menu-item-button',
            data = this.props.data,
            chevron = this.props.isExpandable ? <span className='fa fa-chevron-right fa-fw'></span> : null;
        let glyph = <Glyphicon glyph={this.props.data.menuitem.GlyphIcon} style={{ 'marginRight': '5px' }} />
        return (
            <button {...data.handlers} key={data.key}  id={data.id} className={className}>
                {glyph}
                {data.menuitem.Label}
                {chevron}
            </button>
        );
    }
}