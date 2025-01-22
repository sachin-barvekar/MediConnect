
# MediConnect

MediConnect is a comprehensive healthcare platform designed to simplify and enhance the experience of managing health records, scheduling appointments, and accessing medical services. The platform bridges the gap between patients and healthcare providers, ensuring efficient communication and service delivery.

## Features

### For Patients:
- **Health Records Management**: Store and access medical records securely.
- **Appointment Scheduling**: Book appointments with doctors and specialists.
- **Medication Reminders**: Get notified about medication schedules.
- **Search for Doctors**: Locate doctors by specialization, location, or ratings.
- **Prescription Management**: Create and share digital prescriptions.

### For Doctors:
- **Patient Management**: View patient profiles and medical history.
- **Appointment Tracking**: Manage and track appointments.

## Technologies Used

- **Frontend**: React.js, PrimeReact, PrimeFlex CSS.
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **API Integration**: Integration with external APIs (e.g., for geolocation and firebase).

## Installation

### Prerequisites
- Node.js (v16 or above)
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mediconnect.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mediconnect
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=4000
     MONGO_URI=your_mongodb_connection_string
     
5. Start the server:
   ```bash
   npm start
   ```
6. Navigate to the frontend directory:
   ```bash
   cd client
   ```
7. Install frontend dependencies:
   ```bash
   npm install
   ```
8. Start the frontend server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000` for the frontend interface.
2. Create a user account and log in.
3. Explore the platform as a patient or a doctor.

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries, please contact:
- Name: Sachin Barvekar
- Email: sachinbarvekar2003@gmail.com
