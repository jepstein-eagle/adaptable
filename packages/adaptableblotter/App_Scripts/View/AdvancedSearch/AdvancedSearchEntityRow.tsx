import * as React from "react";
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IColItem } from "../UIInterfaces";
import { IAdvancedSearch } from "../../Utilities/Interface/BlotterObjects/IAdvancedSearch";
import { EntityRowItem } from "../Components/EntityRowItem";

export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow> extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
    IsCurrentAdvancedSearch: boolean;
    onSelect: (advancedSearch: IAdvancedSearch) => void;
}

export class AdvancedSearchEntityRow extends React.Component<AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>, {}> {

    render(): any {
        let advancedSearch: IAdvancedSearch = this.props.AdaptableBlotterObject as IAdvancedSearch;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = <Radio style={{ padding: "0px", margin: "0px" }} onChange={() => this.props.onSelect(advancedSearch)} checked={this.props.IsCurrentAdvancedSearch} />
        colItems[1].Content =  <EntityRowItem Content={advancedSearch.Name} />;
        colItems[2].Content = <EntityRowItem Content={ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns)} />
       
        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, advancedSearch)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={null}
            EntityType={StrategyConstants.AdvancedSearchStrategyName} />

        colItems[3].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
