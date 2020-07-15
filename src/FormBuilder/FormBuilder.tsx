import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { Button, TextField } from '@material-ui/core';
import FieldDescriptor from '../types/FieldDescriptor';
import {Step} from '../types/FormTypes';
import SubContainer from './SubContainer';
import StepField from './StepField';



export interface FormBuilderProps {
  name: string;
  description: string;
  provider?: string;
  steps: Step[];
  id?: string;
  onSubmit: Function;
}


const formFields: FieldDescriptor[] = [
  { name: "name", type:"text", initialValue:'',label:"Name" },
  { name: "description", type:"text", initialValue:'',label:"Description" },
  { name: "provider", type:"text", initialValue:'',label:"Group" },
]

const FormBuilder: React.FC<FormBuilderProps> =(props) => {
  const {id, onSubmit } = props;
  return (
    <div>
      <Formik
        initialValues={ {
          name: props.name,
          description: props.description,
          provider: props.provider? props.provider : '',
          steps: props.steps
        }}        
        onSubmit={form => { onSubmit(form); }}
        >
          {({values, ...props }) => (
            <Form>
              {id ? <pre>Form id: {id}</pre> : null}
              <h2>Form data</h2>
              { formFields.map( field => 
                <div>
                <Field style={{margin:'5px'}}
                    name={field.name}
                    label={field.label}
                    width={1}
                    as={TextField}
                />
                </div>
            
              )}
              <h2>Steps</h2>
              <FieldArray name="steps">
                {(arrayHelpers) => (
                    <div style={{border:'1px solid gray', padding:'10px'}}>
                    { values.steps.map( (step, index) => {
                      const stepName = `steps.${index}`;                      
                      return (
                        <SubContainer 
                          itemValues={step} 
                          currentIndex={index}
                          name={stepName}
                          arrayHelpers={arrayHelpers} 
                          inputField={StepField} color="blue"/>
                      );
                    })}
                    <Button style={{margin:'5px'}}
                      variant="contained"
                      color="primary"
                      onClick={() => 
                        arrayHelpers.push({
                          title:'', description:'', group:'',
                          id:""+Math.random(),
                        })}>Add step</Button>                          
                  </div>
                )}
              </FieldArray>
             
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
