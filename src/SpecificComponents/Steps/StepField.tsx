import React from 'react';
import { Field } from 'formik';
import QuestionField from '../Questions/QuestionField';
import FieldArrayWrapper from '../../GeneralComponents/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';
import BannerField from './BannerField';
import { InputFieldPropType } from '../../types/PropTypes';

const StepField: React.FC<InputFieldPropType> = ({ name, value }: InputFieldPropType) => {
  return (
    <div>
      <h2>{value.title && value.title !== '' ? value.title : 'Unnamed step'}</h2>
      <Field name={name} type="input" as={StepDataField} />
      <h3>Banner</h3>
      <Field name={`${name}.banner`} type="input" as={BannerField} />

      <FieldArrayWrapper
        heading="Questions"
        parentName={name}
        name="questions"
        value={value}
        inputField={QuestionField}
        emptyObject={{
          label: '',
          description: '',
          type: '',
          id: '',
        }}
      />

      <FieldArrayWrapper
        heading="Actions"
        parentName={name}
        name="actions"
        value={value}
        inputField={ActionField}
        emptyObject={{ label: '', type: '' }}
        color="green"
      />
    </div>
  );
};

export default StepField;
