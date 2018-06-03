import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { StrategyViewPopupProps } from "../Components/SharedProps/StrategyViewPopupProps";
import { EditableConfigEntityState } from "../Components/SharedProps/EditableConfigEntityState";
import { IColItem } from "../UIInterfaces";
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";


interface SelectedCellsPopupProps extends StrategyViewPopupProps<SelectedCellsPopupComponent> {
  }

class SelectedCellsPopupComponent extends React.Component<SelectedCellsPopupProps, EditableConfigEntityState> {
  
    render() {
        let cssClassName: string = this.props.cssClassName + "__SelectedCells";
     
        let infoBody: any[] = ["Selected cells info."]

         return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyNames.SelectedCellsStrategyName} className="ab_main_popup"
                bsStyle="primary" glyphicon={StrategyGlyphs.SelectedCellsGlyph}
                infoBody={infoBody}>

               <span>going to add stuff here </span>

            </PanelWithButton>
        </div>
    }

  
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
     };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
          };
}

export let SelectedCellsPopup = connect(mapStateToProps, mapDispatchToProps)(SelectedCellsPopupComponent);

