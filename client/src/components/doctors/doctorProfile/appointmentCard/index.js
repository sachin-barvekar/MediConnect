import React from 'react';
import { Card } from 'primereact/card';

const AppointmentCard = ({ appointments }) => {
  return (
    <div className='"flex-initial flex align-items-center justify-content-center font-bold flex-wrap px-5 py-3 gap-6 border-round'>
      {appointments.map((appointment, index) => (
        <div key={index} className="p-col">
          <Card
            title={appointment.patientName}
            subTitle={`${appointment.reason}`}
                 className='shadow-2 p-4 pb-1 w-20rem'
        
          > 
            <div className="p-d-flex p-flex-column">
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AppointmentCard;
