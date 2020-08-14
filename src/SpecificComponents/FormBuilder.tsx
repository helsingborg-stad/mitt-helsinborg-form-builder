import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from '@material-ui/core';
import {Step} from '../types/FormTypes';
import StepField from './StepField';
import FieldArrayWrapper from '../GeneralComponents/FieldArrayWrapper';
import FormDataField from './FormDataField';

export interface FormBuilderProps {
  name: string;
  description: string;
  provider?: string;
  steps: Step[];
  id?: string;
  onSubmit: Function;
  subform?: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> =(props) => {
  const {id, onSubmit } = props;
  return (
    <div>
      <Formik
        initialValues={ {
          name: props.name,
          description: props.description,
          provider: props.provider? props.provider : '',
          steps: props.steps, 
          subform: props.subform,
        }}       
        onSubmit={form => { onSubmit(form); }}
        >
          {({values, ...props }) => (
            <Form>
              {id ? <pre>Form id: {id}</pre> : null}
              <h2>Form data</h2>
              <Field 
                type="input" as={FormDataField} />

              <div style={{border:'1px solid gray', padding:'10px'}}>
                <FieldArrayWrapper 
                  heading="Steps" 
                  parentName=""
                  name="steps"
                  value={values}
                  inputField={StepField}
                  emptyObject={{
                    title:'', description:'', group:'', id:'',
                  }}
                />
              </div>
              
                <Button
                  style={{margin:'5px'}}
                  variant="contained"
                  color="primary"
                  type='submit'>
                  Submit
                </Button>
              <pre>
                {JSON.stringify(values, null,2)}
              </pre>
            </Form>
          )}
        </Formik>
        
    </div>
  )
}

export default FormBuilder;
