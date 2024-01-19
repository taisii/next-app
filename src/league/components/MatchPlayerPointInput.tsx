import { FormControl, FormControlProps, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface NumberInputProps extends FormControlProps {
  label: string;
}

export const MatchPlayerPointInput: React.FC<NumberInputProps> = ({ label, ...props }) => {
  const { register } = useFormContext();
  return (
    <FormControl>
      <Input {...register(label)}></Input>
    </FormControl>
  );
};
