import { IAdvancedSearch } from '../../../Core/Interface/IAdvancedSearchStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { IConfigEntityExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'

export class AdvancedSearchWizard extends React.Component<IConfigEntityExpressionAdaptableWizardProps<AdvancedSearchWizard>, {}> {
  
    render() {
        return <AdaptableWizard Steps={[
            <AdvancedSearchExpressionWizard
                ColumnList={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumnId={null}
                getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
            <AdvancedSearchSettingsWizard AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]} />

        ]}
            Data={this.props.EditedConfigEntity as IAdvancedSearch}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.onCloseWizard()}
            onFinish={() => this.props.onFinishWizard()} />
    }

}

