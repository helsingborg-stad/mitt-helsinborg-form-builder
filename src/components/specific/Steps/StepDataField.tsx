import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const stepFields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'group', type: 'text', initialValue: '', label: 'Group' },
  { name: 'id', type: 'text', initialValue: '', label: 'Id' },
];

const StepDataField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={stepFields} {...props} />;
};

export default StepDataField;