export const DOCTOR_PROFILE_FIELDS = {
  PROFILE_IMAGE: {
    name: 'profileImg',
    label: 'Profile Image',
    rules: {
      required: 'Profile Image is required',
    },
  },
  SPECIALIZATION: {
    name: 'specialization',
    label: 'Specialization',
    type: 'string',
    rules: {
      required: 'Specialization is required',
    },
  },
  DESCRIPTION: {
    name: 'description',
    label: 'Description',
    type: 'string',
    rules: {
      required: 'Description is required',
    },
  },
  CONTACT_NUMBER: {
    name: 'contactNumber',
    label: 'Contact Number',
    type: 'number',
    rules: {
      required: 'Contact Number is required',
    },
  },
  HOSPITAL_NAME: {
    name: 'hospitalName',
    label: 'Hospital Name',
    type: 'string',
    rules: {
      required: 'Hospital Name is required',
    },
  },
  ADDRESS: {
    STREET_NAME: {
      name: 'streetName',
      label: 'Street Name',
      type: 'string',
      rules: {
        required: 'Street Name is required',
      },
    },
    STATES: {
      name: 'state',
      label: 'State',
      placeholder: 'Select State',
      optionLabel: 'name',
      optionValue: 'name',
      options: [
        { name: 'Maharashtra', code: 'MH' },
        { name: 'Karnataka', code: 'KA' },
        { name: 'Delhi', code: 'DL' },
      ],
      rules: {
        required: 'State is required',
      },
    },
    CITY: {
      name: 'city',
      label: 'City',
      placeholder: 'Select City',
      optionLabel: 'name',
      optionValue: 'name',
      optionsByState: {
        Maharashtra: [{ name: 'Mumbai' }, { name: 'Pune' }, { name: 'Nagpur' }],
        Karnataka: [
          { name: 'Bangalore' },
          { name: 'Mysore' },
          { name: 'Hubli' },
        ],
        Delhi: [{ name: 'New Delhi' }, { name: 'Old Delhi' }],
      },
      rules: {
        required: 'City is required',
      },
    },
    PINCODE: {
      name: 'pinCode',
      label: 'Pincode',
      type: 'number',
      required: true,
      rules: {
        required: 'Pincode is required',
      },
    },
  },
}
