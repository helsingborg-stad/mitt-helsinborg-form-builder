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
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
  { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
];

const EditableListInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={editableListFields} {...props} />;
};

export default EditableListInputField;
