import React from 'react';
import CSS from 'csstype';
import { TextField, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import FieldDescriptor from '../types/FieldDescriptor';
import FieldArrayWrapper from './FieldArrayWrapper';

interface Props  {
    name: string;
    onBlur: (e?: any) => void;
    value: Record<string, any>;
    fields: FieldDescriptor[] ;
    onChange: (e?: any) => void;
  }
  const inputFieldStyle: CSS.Properties = {
    marginLeft:'7px', 
    marginTop:'5px'
  }
  
  const MultipleInputField: React.FC<Props> = ({ onChange, onBlur, name, value, fields, ...other}) => {
    
    const inputComponent = (field: FieldDescriptor, computedName: string) => {
      switch(field.type){
        case 'text':
          return (
              <TextField
                  fullWidth
                  multiline
                  rowsMax={3}
                  name={computedName}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={field && field.name && value[field.name] ? value[field.name] : field.initialValue }
                  label={field.label}
                  {...other}
              />);
        case 'select':
          return (
                <Select
                    name={computedName}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value[field.name]}
                    label={field.label}
                    {...other}
                >
                  {field.choices ? field.choices.map( choice => (
                      <MenuItem value={choice.value}>{choice.name}</MenuItem>
                  )) : null}
                </Select>); 
        case 'checkbox':
          return (
            <FormGroup style={inputFieldStyle} row>
              <FormControlLabel
                control={
                <Checkbox 
                  checked={ field.name && value[field.name] ? value[field.name] : false} 
                  onChange={onChange} 
                  name={computedName} />}
                label={field.label}
              />
            </FormGroup>);
        case 'array':
          return (
            <FieldArrayWrapper 
              heading={field.label} 
              parentName={name}
              name={field.name}
              value={value }
              inputField={field.inputField ? field.inputField : null}
              emptyObject={{ label:'', type:'' }}
              color="green"
            />);   
        default:
          return (
              <TextField
                  name={computedName}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value[field.name]}
                  label={field.label}
                  {...other}
              />);
        }
      }
    
    return (
    <FormGroup>
        { fields.map( field => {
          const computedName = (!name || name === '') ? field.name : name + '.'+field.name;
          return (
            <div key={computedName} style={inputFieldStyle}>
              {inputComponent(field, computedName)}
            </div>
          )
        })}
    </FormGroup>
  )
}

export default MultipleInputField;