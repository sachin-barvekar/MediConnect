export const FORM_FIELDS_NAME = {
  ROLE: {
    name: 'Role',
    label: 'role',
    type: 'dropdown',
    optionLabel: 'name',
    optionValue: 'value',
    rules: {
      required: 'Role is required',
    },
    options: [
      { name: 'Doctor', value: 'doctor' },
      { name: 'Patient', value: 'patient' },
    ],
    placeholder: 'Select an role',
  },
}
