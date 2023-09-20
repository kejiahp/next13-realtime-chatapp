import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { FormDescription, FormErrorMessage } from "./form-comps";

type FormInputFieldType = {
  id: string;
  label?: string;
  description?: string;
  placeholder: string;
  accept?: string;
  errorMessage: string | undefined;
  register: any;
  disabled: boolean;
  type: React.HTMLInputTypeAttribute;
};

export const FormInputField: React.FC<FormInputFieldType> = ({
  id,
  label,
  description,
  placeholder,
  accept,
  errorMessage,
  register,
  disabled,
  type,
}) => {
  return (
    <>
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          id={id}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          accept={accept}
          {...register}
        />
        {description && <FormDescription description={description} />}
        <FormErrorMessage errorMessage={errorMessage} />
      </div>
    </>
  );
};

type FormTextareaFieldType = {
  id: string;
  cols?: number;
  rows?: number;
  label?: string;
  description?: string;
  placeholder: string;
  accept?: string;
  errorMessage: string | undefined;
  register: any;
  disabled: boolean;
};

export const FormTextAreaField: React.FC<FormTextareaFieldType> = ({
  id,
  cols,
  rows,
  label,
  description,
  placeholder,
  accept,
  errorMessage,
  register,
  disabled,
}) => {
  return (
    <>
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          accept={accept}
          cols={cols}
          rows={rows}
          {...register}
        />
        {description && <FormDescription description={description} />}
        <FormErrorMessage errorMessage={errorMessage} />
      </div>
    </>
  );
};
