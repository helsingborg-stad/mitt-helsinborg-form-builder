import React from 'react';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import SubstepListItemAmountConfig from './SubstepListItemAmountConfig';
import FieldArrayWrapper from '../../../general/FieldArrayWrapper';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'key', type: 'text', initialValue: '', label: 'Key (for tracking the data)' },
  { name: 'formId', type: 'formSelect', initialValue: '', label: 'Subform' },
  { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
];

const SubstepListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { name, value, ...other } = props;
  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      <FieldArrayWrapper
        key="config"
        heading="Amount Config"
        parentName={name}
        name="amountConfig"
        value={value}
        inputField={SubstepListItemAmountConfig}
        emptyObject={{
          category: '',
          description: '',
        }}
        {...other}
      />
    </>
  );
};

export default SubstepListItemField;
