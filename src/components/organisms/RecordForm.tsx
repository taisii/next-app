'use client';

import { Box, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { RecordInput, createRecord } from '@/mutations/createRecord';

import { LabeledInput } from '../atoms/LabeledInput';
import { recordFormSchema } from '../schemas';

export const RecordForm: React.FC = () => {
  const methods = useForm<RecordInput>({ resolver: zodResolver(recordFormSchema) });
  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(async (data) => {
          await createRecord(data);
        })}
      >
        <LabeledInput label="point" name="point" isRequired />
        <LabeledInput label="1着" name="top" isRequired />
        <LabeledInput label="2着" name="second" isRequired />
        <LabeledInput label="3着" name="three" isRequired />
        <LabeledInput label="4着" name="four" isRequired />
        <Button type="submit" mt={4}>
          submit
        </Button>
      </Box>
    </FormProvider>
  );
};
