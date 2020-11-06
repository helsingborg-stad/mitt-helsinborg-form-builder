import ValidationObject, { ValidationRule } from '../../../types/ValidationRules';

export const isRequiredRule: ValidationRule = {
  method: 'isEmpty',
  validWhen: false,
  message: 'Du får inte lämna detta fält tomt',
};

export type ValidationFieldTypes =
  | 'text'
  | 'date'
  | 'email'
  | 'number'
  | 'personalNumber'
  | 'phoneNumber'
  | 'postalCode';

const ValidationFieldRules: Record<ValidationFieldTypes, ValidationObject> = {
  text: {
    isRequired: false,
    rules: [],
  },
  date: {
    isRequired: false,
    rules: [],
  },
  email: {
    isRequired: false,
    rules: [
      {
        method: 'isEmail',
        validWhen: true,
        message: 'Du måste ange en giltig emailadress',
      },
    ],
  },
  personalNumber: {
    isRequired: false,
    rules: [
      {
        method: 'isNumeric',
        validWhen: true,
        message: 'Enbart siffror i ett personnummer',
      },
      {
        method: 'isLength',
        args: {
          options: {
            min: 12,
            max: 12,
          },
        },
        validWhen: true,
        message: 'Ange personnummer med 12 siffror',
      },
    ],
  },
  number: {
    isRequired: false,
    rules: [
      {
        method: 'isNumeric',
        args: {
          options: {
            no_symbols: true,
          },
        },
        validWhen: true,
        message: 'Du måste ange en siffra',
      },
    ],
  },
  phoneNumber: {
    isRequired: true,
    rules: [
      {
        method: 'isMobilePhone',
        args: {
          locale: 'sv-SE',
        },
        validWhen: true,
        message: 'Numret du angav är inte ett giltigt telefonnummer',
      },
    ],
  },
  postalCode: {
    isRequired: false,
    rules: [
      {
        method: 'isNumeric',
        args: {
          options: {
            no_symbols: true,
          },
        },
        validWhen: true,
        message: 'Du har angett en siffra som är mindre än 1',
      },
      {
        method: 'isPostalCode',
        args: {
          locale: 'SE',
        },
        validWhen: true,
        message: 'Postnummret du angav är inte giltligt',
      },
    ],
  },
};

export default ValidationFieldRules;