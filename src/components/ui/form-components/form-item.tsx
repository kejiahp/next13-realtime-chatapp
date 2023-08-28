import { Input } from "../input";
import { Label } from "../label";
import { FormDescription, FormErrorMessage } from "./form-comps";

export const FormInputItem = () => {
  return (
    <>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="kilogram@gmail.com" type="text" />
        <FormDescription description="fdgnunniunoinm" />
        <FormErrorMessage errorMessage={""} />
      </div>
    </>
  );
};

export const FormTextAreaItem = () => {
  return (
    <>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="kilogram@gmail.com" type="text" />
        <FormDescription description="fdgnunniunoinm" />
        <FormErrorMessage errorMessage={""} />
      </div>
    </>
  );
};
