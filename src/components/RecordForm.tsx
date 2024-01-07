import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export const RecordForm: React.FC = () => {
  return (
    <FormControl isRequired>
      <FormLabel>獲得ポイント</FormLabel>
      <Input type="number"></Input>
    </FormControl>
  );
};
