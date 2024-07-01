import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface FormFieldProps {
  labelName?: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
  isTextarea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  isTextarea,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Label htmlFor={name}>
        {labelName}
      </Label>
      {isSurpriseMe && (
        <Button
          onClick={handleSurpriseMe}
          size="sm"
        >
          Surprise me
        </Button>
      )}
    </div>
    {isTextarea ? (
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    ) : (
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    )}
  </div>
);

export default FormField;
