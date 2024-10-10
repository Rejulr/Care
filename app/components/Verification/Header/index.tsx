import React from 'react';
import {moderateScale} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';

type IHeader = {
  title: string;
  summary?: string;
};
export const Header = ({summary, title}: IHeader) => {
  return (
    <Box marginHorizontal="l" pt="xl">
      <Text color="primary" variant="mSemiBold" fontSize={moderateScale(30)}>
        {title}
      </Text>
      <Text variant="regular" pt="n">
        {summary
          ? summary
          : 'Your information will be shared with our Medical Expert team for identity verification.'}
      </Text>
    </Box>
  );
};
