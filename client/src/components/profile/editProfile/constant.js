export const FORM_FIELDS_NAME = {
    AGE: {
      name: 'age',
      label: 'Age',
      type: 'input',
      rules: {
        required: 'Age is required',
      },
      placeholder: 'Enter age',
    },
    GENDER: {
      name: 'gender',
      label: 'Gender',
      type: 'dropdown',
      options: [
        { id: 'male', name: 'Male' },
        { id: 'female', name: 'Female' },
        { id: 'other', name: 'Other' },
      ],
      optionLabel: 'name',
      optionValue: 'id',
      rules: {
        required: 'Gender is required',
      },
      placeholder: 'Select gender',
    },
    HEIGHT: {
      name: 'height',
      label: 'Height',
      type: 'input',
      rules: {
        required: 'Height is required',
      },
      placeholder: 'Enter height',
    },
    WEIGHT: {
      name: 'weight',
      label: 'Weight',
      type: 'input',
      rules: {
        required: 'Weight is required',
      },
      placeholder: 'Enter weight',
    },
    BLOOD_GROUP: {
      name: 'bloodGroup',
      label: 'Blood Group',
      type: 'dropdown',
      options: [
        { id: 'O+', name: 'O+' },
        { id: 'O-', name: 'O-' },
        { id: 'A+', name: 'A+' },
        { id: 'A-', name: 'A-' },
        { id: 'B+', name: 'B+' },
        { id: 'B-', name: 'B-' },
        { id: 'AB+', name: 'AB+' },
        { id: 'AB-', name: 'AB-' },
      ],
      optionLabel: 'name',
      optionValue: 'id',
      rules: {
        required: 'Blood group is required',
      },
      placeholder: 'Select blood group',
    },
    CONTACT: {
      name: 'contact',
      label: 'Contact',
      type: 'input',
      rules: {
        required: 'Contact is required',
        pattern: {
          value: /^[+]?[0-9]{1,4}[ ]?[-\s]?[0-9]{7,10}$/,
          message: 'Invalid contact number',
        },
      },
      placeholder: 'Enter contact number',
    },
  };
  