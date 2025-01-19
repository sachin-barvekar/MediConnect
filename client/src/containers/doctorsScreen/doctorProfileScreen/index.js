import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'primereact/progressbar';
import DoctorProfile from '../../../components/doctors/doctorProfile';
import { fetchDoctorsById } from '../../../redux/action/doctors/doctors';

const DoctorProfileScreen = props => {
  const { isLoading, fetchDoctorDetails, isError } = props;
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user._id;
  useEffect(() => {
    if (userId) {
      fetchDoctorDetails(userId);
    }
  }, [fetchDoctorDetails, userId]);

  const doctorProfileProps = {
        isError
  }
  const renderProgressBar = () => {
    return <ProgressBar mode="indeterminate" style={{ height: '6px' }} />;
  };

  return (
    <div>
      {isLoading && renderProgressBar()}
      <DoctorProfile doctorProfileProps={doctorProfileProps} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctorDetails: userId => dispatch(fetchDoctorsById(userId)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.doctorsReducer.isLoading,
    isError: state.doctorsReducer.isError
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfileScreen);
