import * as Redux from 'redux';
import { UserInterfaceState } from './Interface/IState'

const initialUserInterfaceState: UserInterfaceState = {
    ColorPalette: [
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
    ],
    StyleClassNames: [],
   

}

export const UserInterfaceStateReducer: Redux.Reducer<UserInterfaceState> = (state: UserInterfaceState = initialUserInterfaceState, action: Redux.Action): UserInterfaceState => {
    switch (action.type) {
        default:
            return state
    }
}