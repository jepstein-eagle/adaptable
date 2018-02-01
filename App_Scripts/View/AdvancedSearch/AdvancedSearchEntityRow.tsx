import * as React from "react";
import * as Redux from "redux";
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/StrategyNames'
import {  IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';

export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow> extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
    IsCurrentAdvancedSearch: boolean;
    onSelect: (advancedSearch: IAdvancedSearch) => void;
}

export class AdvancedSearchEntityRow extends React.Component<AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>, {}> {
   
    render(): any {
        let advancedSearch: IAdvancedSearch = this.props.ConfigEntity as IAdvancedSearch;

        let myCols: IColItem[] = []
        myCols.push({ size: this.props.EntityRowInfo[0].Width, content: <Radio style={{padding: "0px", margin: "0px"}} onChange={() => this.props.onSelect(advancedSearch)} checked={this.props.IsCurrentAdvancedSearch} /> });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: advancedSearch.Name });
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns, this.props.UserFilters) });

        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, advancedSearch)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={null}
            ConfigEntity={advancedSearch}
            EntityName={StrategyNames.AdvancedSearchStrategyName} />

        myCols.push({ size: this.props.EntityRowInfo[3].Width, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
        />
    }
}

