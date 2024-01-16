import { FormControl, FormControlProps, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface LabeledInputProps extends FormControlProps {
  label: string;
  name: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, name, ...props }) => {
  const { register } = useFormContext();
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <Input placeholder={label} {...register(name)}></Input>
    </FormControl>
  );
};
