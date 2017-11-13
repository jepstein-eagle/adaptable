import * as Redux from 'redux';
import { UIControlConfigState } from './Interface/IState'

const initialUIControlConfigState: UIControlConfigState = {
    PredefinedColorChoices: [
        "#000000", //  {/* black */}
        "#ffffff", //  {/* white */}
        "#C0C0C0", //  {/* light gray */}
        "#808080", //  {/* dark gray */}
        "#800000", //  {/* brown */}
    
        "#808000", //  {/* olive */}
        "#008000", //  {/* dark green */}
        "#00FF00", //  {/* light green */}
        "#FFFF00", //  {/* yellow */}
        "#FFFFCC", //  {/* pale yellow (quick search default) */}
    
        "#000080", //  {/* dark blue */}
        "#0000FF", //  {/* blue */}
        "#008080", //  {/* cyan */}
        "#00FFFF", //  {/* light blue */}
        "#FF00FF", //  {/* pink */}
    
        "#800080", //  {/* purple */}
        "#8B0000", //  {/* dark red */}
        "#FF0000", //  {/* red */}
        "#FF6961", //  {/* pastel red */}
        "#FFA500", //  {/* orange */}
    ]
}

export const UIControlConfigStateReducer: Redux.Reducer<UIControlConfigState> = (state: UIControlConfigState = initialUIControlConfigState, action: Redux.Action): UIControlConfigState => {
    switch (action.type) {
        default:
            return state
    }
}