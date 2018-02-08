import * as React from "react";
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';

export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow> extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
    IsCurrentAdvancedSearch: boolean;
    onSelect: (advancedSearch: IAdvancedSearch) => void;
}

export class AdvancedSearchEntityRow extends React.Component<AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>, {}> {

    render(): any {
        let advancedSearch: IAdvancedSearch = this.props.ConfigEntity as IAdvancedSearch;

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = <Radio style={{ padding: "0px", margin: "0px" }} onChange={() => this.props.onSelect(advancedSearch)} checked={this.props.IsCurrentAdvancedSearch} />
        colItems[1].Content = advancedSearch.Name;
        colItems[2].Content = ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns, this.props.UserFilters)

        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, advancedSearch)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={null}
            ConfigEntity={advancedSearch}
            EntityName={StrategyNames.AdvancedSearchStrategyName} />

        colItems[3].Content = buttons;

        return <ConfigEntityRowItem ColItems={colItems} />
    }
}

