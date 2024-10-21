import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useAppStore} from '../data';
import {APPOINTMENTS, USERS} from '../services';
import {isDateValid} from '../utils';

export const useFirestore = () => {
  const [hasReceived, setHasReceived] = useState<boolean>(false);
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
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

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
          setHasReceived(true);
        })
        .catch(() => setError(true));
    }
  };

  const updateDoctorSchedule = async () => {
    const collection = await firestore().collection(USERS).doc(UID);
    const validHours = workingHours.filter(
      item => isDateValid(item.endTime) && isDateValid(item.startTime),
    );

    collection
      .update({
        fee,
        customRange,
        dateRange,
        workingHours: firestore.FieldValue.arrayUnion(...validHours),
      })
      .then(() => {
        setHasReceived(true);
      })
      .catch(() => setError(true));
  };

  const appointmentTiming = async (appointmentDate: string) => {
    try {
      const collection = await firestore()
        .collection(APPOINTMENTS)
        .where('doctorID', '==', UID)
        .where('appointmentDate', '==', appointmentDate)
        .get();

      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      setHasReceived(true);
    } catch (_) {
      setError(true);
    }
  };

  const getUser = async (patientID: string) => {
    const user = (
      await firestore().collection(USERS).doc(patientID).get()
    ).data();
    return user;
  };

  return {
    verification,
    hasReceived,
    error,
    getUser,
    data,
    updateDoctorSchedule,
    appointmentTiming,
  };
};
