import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useAppStore} from '../data';
import {USERS} from '../services';

export const useFirestore = () => {
  const [uploaded, setUploaded] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const {UID, bio, dob, fullName, gender, specialty, addVerificationStatus} =
    useAppStore();

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

  return {verification, uploaded, error};
};
