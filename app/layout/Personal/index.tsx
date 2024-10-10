import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {AnimatedBox, Box, Option, Text} from '../../components';
import {Dropdown, InputField} from '../../components/Form';
import {Header} from '../../components/Verification';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppStore} from '../../data';
import {formatDate, moderateScale} from '../../utils';

type IBasicInformation = {
  fullName: string;
  email: string;
  bio: string;
};

export const PersonalInformation = () => {
  const {
    gender,
    fullName,
    email,
    dob,
    bio,
    addGender,
    addDOB,
    addFullName,
    addBio,
    addPersonalInformationStep,
  } = useAppStore();

  const {control, watch, getValues} = useForm<IBasicInformation>({
    defaultValues: {fullName: fullName, email},
  });
  const [open, setOpen] = useState(false);
  const snapPoints = useMemo(() => ['1', '26%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const maxDate = new Date('1999-12-31');
  useEffect(() => {
    if (getValues('fullName') || getValues('bio')) {
      addFullName(getValues('fullName'));
      addBio(getValues('bio'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('fullName'), watch('bio')]);

  useEffect(() => {
    addPersonalInformationStep(false);
    return () => {
      if (fullName && gender && dob && email && bio) {
        addPersonalInformationStep(true);
      }
    };
  }, [addPersonalInformationStep, bio, dob, email, fullName, gender]);
  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Header title={'Personal\nInformation'} />
          <Box marginTop="ll" mb="n" gap="m" marginHorizontal="l">
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <InputField
                  value={value}
                  onBlur={onBlur}
                  label={'Full Name'}
                  onChange={onChange}
                />
              )}
            />

            <Dropdown
              value={gender}
              label="Gender"
              onPress={() => bottomSheetModalRef.current?.present()}
            />

            <Dropdown
              value={formatDate(dob)}
              label="Date of Birth"
              onPress={() => setOpen(true)}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputField
                  editable={false}
                  label="Email"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="bio"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputField
                  isTextArea={true}
                  label="Bio"
                  multiline={true}
                  numberOfLines={10}
                  scrollEnabled={false}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
        </Box>
        {/* dob instanceof Date */}
        <DatePicker
          modal
          maximumDate={maxDate}
          mode="date"
          open={open}
          date={!dob && dob instanceof Date ? dob : maxDate}
          onConfirm={date => {
            setOpen(false);
            addDOB(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          backdropComponent={BottomSheetBackdrop}
          snapPoints={snapPoints}>
          <BottomSheetView>
            <AnimatedBox>
              <Text
                pl="m"
                color="primary"
                variant="mSemiBold"
                fontSize={moderateScale(20)}>
                Gender
              </Text>
              <Box mt="n">
                <Pressable onPress={() => addGender('Male')}>
                  <Option isActive={gender === 'Male'} label="Male" />
                </Pressable>
                <Box backgroundColor="socialButton" height={2} />
                <Pressable onPress={() => addGender('Female')}>
                  <Option isActive={gender === 'Female'} label="Female" />
                </Pressable>
              </Box>
            </AnimatedBox>
          </BottomSheetView>
        </BottomSheetModal>
      </KeyboardAwareScrollView>
    </>
  );
};
