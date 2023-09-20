"use client";

import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useState } from "react";
import { registerUserService } from "@/services/authentication";
import {
  RegisterUserValidatorType,
  register_user_validator,
} from "@/schema/authentication";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "../ui/form-components/form-item";
import { notify } from "@/hooks/useToast";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserValidatorType>({
    resolver: zodResolver(register_user_validator),
  });

  const onSubmitHandler = async (inputData: RegisterUserValidatorType) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", inputData.email);
      formData.append("password", inputData.password);
      formData.append("username", inputData.username);
      formData.append("profilePhoto", inputData.profilePhoto[0]);

      await registerUserService(formData);
      notify({
        types: "success",
        message: "Registration Successful",
      });
    } catch (error: any) {
      console.log(error);

      if (
        error.response.data.details === "user with this email already exist"
      ) {
        notify({
          types: "error",
          message: "user with this email already exist",
        });
      } else {
        notify({
          types: "error",
          message: "something went wrong",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="rounded-lg shadow-lg dark:shadow-none flex flex-col gap-4 p-5">
      <Logo />

      <FormInputField
        id={"username"}
        label="Username"
        placeholder={"kilogram"}
        errorMessage={errors.username?.message}
        register={register("username", { required: true })}
        disabled={false}
        type={"text"}
      />

      <FormInputField
        id={"email"}
        label="Email"
        placeholder={"kilogram@gmail.com"}
        errorMessage={errors.email?.message}
        register={register("email", { required: true })}
        disabled={false}
        type={"email"}
      />

      <FormInputField
        id={"password"}
        label="Password"
        placeholder={"kilogram_sama_UwU😳"}
        errorMessage={errors.password?.message}
        register={register("password", { required: true })}
        disabled={false}
        type={"password"}
      />

      <FormInputField
        id={"profilePhoto"}
        label="Profile Photo"
        accept="image/*"
        type={"file"}
        errorMessage={errors.profilePhoto ? "invalid profile photo" : ""}
        register={register("profilePhoto", { required: true })}
        disabled={false}
        placeholder={"select profile photo"}
      />

      <Button
        variant={"secondary"}
        onClick={handleSubmit(onSubmitHandler)}
        type="button"
        disabled={isLoading}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </form>
  );
}

export default SignUpForm;
