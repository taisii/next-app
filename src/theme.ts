import { baseTheme, extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    colors: {
      brand: baseTheme.colors.red,
    },
    components: {
      Alert: {
        defaultProps: {
          colorScheme: 'blue',
          borderRadius: `full`,
        },
      },
      Button: {
        baseStyle: {
          borderRadius: 'full',
        },
      },
      Input: {
        baseStyle: {},
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'green' }),
  withDefaultVariant({
    variant: 'outline',
    components: ['Input', 'NumberInput', 'PinInput'],
  })
);
