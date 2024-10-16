import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useAppStore} from '../data';
import {USERS} from '../services';
import {isDateValid} from '../utils';

export const useFirestore = () => {
  const [uploaded, setUploaded] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const {
    UID,
    bio,
    dob,
    fullName,
    gender,
    specialty,
    addVerificationStatus,
    fee,
    dateRange,
    customRange,
    workingHours,
  } = useAppStore();

  const verification = async (qualification: string, selfie: string) => {
    if (UID) {
      const userCollection = await firestore().collection(USERS).doc(UID);
      userCollection
        .update({
          bio,
          dob,
          fullName,
          gender,
          qualification,
          selfie,
          specialty,
          verificationStatus: 'pending',
        })
        .then(() => {
          addVerificationStatus('pending');
          setUploaded(true);
        })
        .catch(() => setError(true));
    }
  };

  const updateDoctorSchedule = () => {
    const collection = firestore().collection(USERS).doc(UID);
    const validHours = workingHours.filter(
      item => isDateValid(item.endTime) && isDateValid(item.startTime),
    );
    collection
      .update({
        fee,
        customRange,
        dateRange,
        workingHours: validHours,
      })
      .then(() => {
        setUploaded(true);
      })
      .catch(() => setError(true));
  };

  return {verification, uploaded, error, updateDoctorSchedule};
};
