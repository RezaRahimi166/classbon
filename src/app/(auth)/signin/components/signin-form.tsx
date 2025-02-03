"use client";
import { Button } from "@/app/_components/button";
import { Textbox } from "@/app/_components/textbox";
import { useForm } from "react-hook-form";
import { SignIn } from "../types/signin.types";
import { TextInput } from "@/app/_components/form-input";
import { useSignIn } from "../_api/signin";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/store/notification.store";
import { signInSchema } from "../types/singin.schema";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const signIn = useSignIn({
    onSuccess: () => {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
    },
  });
  const onSubmit = (data: SignIn) => {
    signIn.submit(data);
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

        <Button type="submit" variant="primary" isLoading={signIn.isPending}>
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
