import StateManagedSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import type AsyncSelect from "react-select/async";

import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { FormDescription, FormErrorMessage } from "./form-comps";
import { HTMLAttributes, TextareaHTMLAttributes } from "react";

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
  className: string;
  resizable: boolean;
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
  className,
  resizable,
}) => {
  return (
    <>
      <div className={className}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Textarea
          className={`${resizable ? "resize-none" : ""}`}
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

interface FormCustomSelectType {
  id: string;
  selectType: StateManagedSelect | CreatableSelect | AsyncSelect;
  maxMenuHeight?: number;
  onChangeHandler: (e: any) => void;
  options?: any;
  loadOptions?: any;
  cacheOptions?: any;
  label?: string;
  placeholder: string;
  defaultValue: string | string[] | number;
  multiple?: boolean;
  disabled: boolean;
  isloading?: boolean;
  errorMessage: string | undefined;
  required: boolean;
  description?: any;
}

export const FormCustomSelectField: React.FC<FormCustomSelectType> = ({
  id,
  options,
  loadOptions,
  cacheOptions,
  label,
  placeholder,
  defaultValue,
  multiple,
  disabled,
  isloading,
  errorMessage,
  description,
  selectType: SelectFieldType,
  maxMenuHeight = 100,
  onChangeHandler,
  required,
}) => {
  const colourStyles = {
    option: (styles: any) => ({
      ...styles,
      color: "purple",
    }),
  };
  return (
    <>
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <SelectFieldType
          styles={colourStyles}
          isLoading={isloading}
          id={id}
          required={required}
          options={options}
          loadOptions={loadOptions}
          cacheOptions={cacheOptions}
          maxMenuHeight={maxMenuHeight}
          onChange={onChangeHandler}
          isDisabled={disabled}
          defaultValue={defaultValue}
          isMulti={multiple}
          placeholder={placeholder}
        />

        {description && <FormDescription description={description} />}
        <FormErrorMessage errorMessage={errorMessage} />
      </div>
    </>
  );
};
