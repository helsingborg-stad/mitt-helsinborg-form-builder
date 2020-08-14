import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from '../GeneralComponents/MultipleInputField';

const bannerFields: FieldDescriptor[] = [
  { name: "imageSrc", type:"text", initialValue:'', label:"Image"},
  { name: "iconSrc", type:"text", initialValue:'', label:"Icon" },
  { name: "backgroundColor", type:"text", initialValue:'', label:"Background Color"},
]

const BannerField: React.FC<any> = props => {
  return <MultipleInputField fields={bannerFields} {...props} />
}

export default BannerField;