import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: 'white',
        bgImage: 'url(/images/bg_m.bmp)',
        bgRepeat: 'repeat',
        bgSize: '100%',
        color: 'brack',
        lineHeight: 1.75,
        touchAction: 'manipulation',
      },
    },
  },
});
