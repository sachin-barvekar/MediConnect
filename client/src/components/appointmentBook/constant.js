export const FORM_FIELDS_NAME = {
  DOCTOR: {
    name: 'doctor',
    label: 'Doctor',
    rules: {
      required: 'Doctor is required',
    }
  },
  DATE: {
    name: 'date',
    label: 'Date',
    type: 'calendar',
    rules: {
      required: 'Date is required',
    },
    placeholder: 'Select an appointment date',
  },
  TIME: {
    name: 'time',
    label: 'Time',
    type: 'input',
    rules: {
      required: 'Time is required',
    },
    placeholder: 'Enter appointment time',
  },
  REASON: {
    name: 'reason',
    label: 'Reason for Appointment',
    type: 'input',
    rules: {
      required: 'Reason is required',
    },
    placeholder: 'Reason for appointment',
  },
}
