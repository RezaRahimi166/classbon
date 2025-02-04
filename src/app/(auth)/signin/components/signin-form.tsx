"use client";
import { Button } from "@/app/_components/button";
import { Textbox } from "@/app/_components/textbox";
import { useForm } from "react-hook-form";
import { SignIn } from "../types/signin.types";
import { TextInput } from "@/app/_components/form-input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/store/notification.store";
import { signInSchema } from "../types/singin.schema";
import { signinAction } from "@/actions/auth";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const [formStata, action] = useFormState(signinAction, null);

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  useEffect(() => {
    if (formStata && !formStata.isSuccess && formStata.error) {
      showNotification({
        message: formStata.error?.detail!,
        type: "error",
      });
    } else if (formStata && formStata.isSuccess) {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
    }
  }, [formStata, showNotification]);

  // reza : signin with react query

  // const signIn = useSignIn({
  //   onSuccess: () => {
  //     router.push(`/verify?mobile=${getValues("mobile")}`);
  //     showNotification({
  //       message: "کد تایید به شماره شما ارسال شد",
  //       type: "info",
  //     });
  //   },
  // });

  const onSubmit = (data: SignIn) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    action(formData);
    // signIn.submit(data);
  };

  return (
    <>
      <h5 className="text-2xl">ورود | ثبت نام</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<SignIn>
          register={register}
          name={"mobile"}
          errors={errors}
        />

        <Button type="submit" variant="primary">
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
