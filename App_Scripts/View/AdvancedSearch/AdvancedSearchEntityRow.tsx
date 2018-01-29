import * as React from "react";
import * as Redux from "redux";
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import * as StrategyNames from '../../Core/StrategyNames'

export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow> extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
    IsCurrentAdvancedSearch: boolean;
    onSelect: (advancedSearch: IAdvancedSearch) => void;
}

export class AdvancedSearchEntityRow extends React.Component<AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>, {}> {
   
    render(): any {
        let advancedSearch: IAdvancedSearch = this.props.ConfigEntity as IAdvancedSearch;

        let myCols: IColItem[] = []
        myCols.push({ size: 1, content: <Radio style={{padding: "0px", margin: "0px"}} onChange={() => this.props.onSelect(advancedSearch)} checked={this.props.IsCurrentAdvancedSearch} /> });
        myCols.push({ size: 3, content: advancedSearch.Name });
        myCols.push({ size: 5, content: ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns, this.props.UserFilters) });

        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, advancedSearch)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={null}
            ConfigEntity={advancedSearch}
            EntityName={StrategyNames.AdvancedSearchStrategyName} />

        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
        />
    }
}

