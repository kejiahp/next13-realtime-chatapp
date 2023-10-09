"use client";

import React, { useState } from "react";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidatorType, login_validator } from "@/schema/authentication";
import { FormInputField } from "../ui/form-components/form-item";
import { loginUserService } from "@/services/authentication";
import { notify } from "@/hooks/useToast";
import { setCookieFromJWT } from "@/lib/authUtils/cookieCtrl";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(login_validator),
  });

  const onSubmitHandler = async (inputData: LoginValidatorType) => {
    setIsLoading(false);

    loginUserService(inputData)
      .then((res) => {
        setCookieFromJWT("tk", res.access_token);
        setCookieFromJWT("rtk", res.refresh_token);

        notify({ types: "success", message: "login successfull" });

        router.push("/chat");
        router.refresh();
      })
      .catch(() => {
        notify({ types: "error", message: "Invalid Credentials" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className="rounded-lg shadow-lg dark:shadow-none flex flex-col gap-4 p-5">
      <Logo />

      <FormInputField
        id={"email"}
        label="Email"
        placeholder={"Email"}
        errorMessage={errors.email?.message}
        register={register("email")}
        disabled={isLoading}
        type={"email"}
      />

      <FormInputField
        id={"password"}
        label="Password"
        placeholder={"Password"}
        errorMessage={errors.password?.message}
        register={register("password")}
        disabled={isLoading}
        type={"password"}
      />

      <Button variant={"secondary"} onClick={handleSubmit(onSubmitHandler)}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
