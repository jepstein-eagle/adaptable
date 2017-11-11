import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, Modal } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ExportDestination, PopoverType } from '../../Core/Enums'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import * as StrategyIds from '../../Core/StrategyIds'
import { StringExtensions } from '../../Core/Extensions';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface ExportActionProps extends IStrategyViewPopupProps<ExportActionComponent> {
    onExport: (value: string) => ExportRedux.ExportAction;
  }

class ExportActionComponent extends React.Component<ExportActionProps, {}> {

   
    render() {
      
        let previewHeader: string = "Hello";
       
      
        
        
        return (
            <div >
               
                <Panel header={previewHeader} bsStyle="info" >
                   
                   
                </Panel>
            </div>
        );
    }

    


    private onApplyExport(): void {
      //  this.props.onApplyExport("hello")
    }

   
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
   //     ExportValue: state.Export.ExportValue,
      };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onExport: (value: string) => dispatch(ExportRedux.Export(value, ExportDestination.CSV)),
       };
}

export let ExportAction = connect(mapStateToProps, mapDispatchToProps)(ExportActionComponent);

