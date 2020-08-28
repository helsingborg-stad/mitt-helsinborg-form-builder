import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const editableListFields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: 'text',
    label: 'Type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
    ],
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'key', type: 'text', initialValue: '', label: 'Key' },
];

const EditableListInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={editableListFields} {...props} />;
};

export default EditableListInputField;
