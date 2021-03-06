import * as React from 'react';
import { Flex } from 'rebass';
import { useState } from 'react';
import Dialog from '../../../components/Dialog';
import { AdaptableOptions } from '../../../types';
import Panel from '../../../components/Panel';
import SimpleButton from '../../../components/SimpleButton';
import ColumnsList from './ColumnsList';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Input from '../../../components/Input';
import ConfigurationForm from './ConfigurationForm';
import { humanize } from '../../../Utilities/Helpers/Helper';

interface ConfigurationDialogProps extends React.HTMLProps<HTMLElement> {
  adaptableOptions: AdaptableOptions;
  onFinish: (adaptableOptions: AdaptableOptions) => void;
  onCancel: () => void;
}

const ConfigurationDialog = (props: ConfigurationDialogProps) => {
  const [abOptions, setABOptions] = useState<AdaptableOptions>(props.adaptableOptions);

  const [finishEnabled, setFinishEnabled] = useState(true);
  const [currentStep, setCurrentStep] = useState<0 | 1>(0);

  let canFinish = finishEnabled;

  if (!abOptions.adaptableId) {
    canFinish = false;
  }

  let canNext = canFinish && currentStep === 0;

  const columnsHandle = React.useRef<{
    getColumns: () => any[];
    getPrimaryKey: () => string;
  }>();

  const onadaptableIdChange = (event: React.SyntheticEvent) => {
    const newABOptions = { ...abOptions };

    newABOptions.adaptableId = (event.target as any).value;
    setABOptions(newABOptions);
  };

  const onFinish = () => {
    const newABOptions = { ...abOptions };
    newABOptions.vendorGrid = { ...abOptions.vendorGrid };

    newABOptions.vendorGrid.columnDefs = columnsHandle.current!.getColumns().map(c => {
      const col = {
        ...c,
        headerName: c.caption || humanize(c.field),
      };

      delete col.caption;

      return col;
    });
    newABOptions.primaryKey = columnsHandle.current!.getPrimaryKey();
    setABOptions(newABOptions);

    props.onFinish(newABOptions);
  };

  const onNext = () => {
    setCurrentStep(1);
  };

  const stepOne = (
    <>
      <Panel
        header={'Configure AdapTable'}
        border="none"
        bodyScroll
        bodyProps={{ padding: 0 }}
        borderRadius="none"
        style={{ fontSize: 16, flex: 1, overflow: 'auto' }}
      >
        <Panel border="none">
          <FormLayout>
            <FormRow label="AdaptableId">
              <Input
                value={abOptions.adaptableId}
                onChange={onadaptableIdChange}
                style={{ minWidth: '20rem' }}
              />
            </FormRow>
          </FormLayout>
        </Panel>
        <ColumnsList
          handle={columnsHandle}
          onValidityChange={valid => {
            setFinishEnabled(valid);
          }}
          columns={abOptions.vendorGrid.columnDefs}
        />
      </Panel>
    </>
  );

  const stepTwo = (
    <>
      <Panel header={'Configure AdapTable'} border="none" style={{ flex: 1, overflow: 'auto' }}>
        <ConfigurationForm
          adaptableOptions={abOptions}
          onChangeadaptableOptions={abOptions => {
            setABOptions(abOptions);
          }}
        />
      </Panel>
    </>
  );

  return (
    <Dialog modal isOpen={true} showCloseButton={false}>
      <Flex
        flexDirection="column"
        style={{
          height: '100%',
          width: '80vw',
          maxWidth: 900,
          maxHeight: '80vh',
        }}
      >
        {currentStep === 0 ? stepOne : stepTwo}
        <Flex flexDirection="row" padding={2} backgroundColor="primary" alignItems="center">
          <SimpleButton
            tone="neutral"
            variant="text"
            tooltip="Cancel configuration "
            onClick={props.onCancel}
          >
            Cancel
          </SimpleButton>
          <div style={{ flex: 1 }} />
          <SimpleButton
            variant="outlined"
            onClick={() => setCurrentStep(0)}
            disabled={currentStep === 0}
            marginRight={2}
            tone="neutral"
          >
            Back
          </SimpleButton>
          <SimpleButton
            variant="outlined"
            onClick={onNext}
            disabled={!canNext}
            marginRight={2}
            tone="neutral"
          >
            Next
          </SimpleButton>
          <SimpleButton
            tone="accent"
            variant="raised"
            icon={'check'}
            onClick={onFinish}
            disabled={!canFinish}
          >
            Finish
          </SimpleButton>
        </Flex>
      </Flex>
    </Dialog>
  );
};

export default ConfigurationDialog;
