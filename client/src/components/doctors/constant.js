export const FORM_FIELDS = {
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
  CITIES: {
    name: 'city',
    label: 'City',
    placeholder: 'Select City',
    optionLabel: 'name',
    optionValue: 'name',
    optionsByState: {
      Maharashtra: [{ name: 'Mumbai' }, { name: 'Pune' }, { name: 'Nagpur' }],
      Karnataka: [{ name: 'Bangalore' }, { name: 'Mysore' }, { name: 'Hubli' }],
      Delhi: [{ name: 'New Delhi' }, { name: 'Old Delhi' }],
    },
    rules: {
      required: 'City is required',
    },
  },
}
