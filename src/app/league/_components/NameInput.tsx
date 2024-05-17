import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

type NameInputProps = {
  isNameEmptyLabelShown: boolean;
  isNameExistLabelShown: boolean;
  value: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
};

export const NameInput = ({ value, onInputChange, isNameEmptyLabelShown, isNameExistLabelShown }: NameInputProps) => {
  return (
    <FormControl isInvalid={isNameEmptyLabelShown || isNameExistLabelShown} height="5rem">
      <Input size="lg" placeholder="name" value={value} onChange={onInputChange} />

      {/* 名前がない場合と名前がすでに使われている名前の場合のvalidation */}
      {isNameEmptyLabelShown ? (
        <FormErrorMessage>名前を入力してください</FormErrorMessage>
      ) : isNameExistLabelShown ? (
        <FormErrorMessage>同じ名前は使えません</FormErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
