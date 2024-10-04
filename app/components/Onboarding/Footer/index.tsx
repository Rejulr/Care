import React from 'react';
import {Box} from '../../Box';
import {Button} from '../../Button';
import {$container} from './styles';

export const OnboardingFooter = () => {
  return (
    <Box style={$container}>
      <Box flexGrow={1} justifyContent="flex-end">
        <Button label="Get started" />
      </Box>
    </Box>
  );
};
