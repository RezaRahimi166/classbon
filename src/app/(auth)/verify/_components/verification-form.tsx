"use client";
import AuthCode from "@/app/_components/auth-code/auth-code";
import { AuthCodeRef } from "@/app/_components/auth-code/auth-code.types";
import { Button } from "@/app/_components/button";
import { Timer } from "@/app/_components/timer/timer";
import { TimerRef } from "@/app/_components/timer/timer.types";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSendAuthCode } from "../_api/send-auth-code";
import { useNotificationStore } from "@/store/notification.store";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { VerifyUserModel } from "../types/verify-user.types";

const getTwoMinutesFromNow = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3);
  return time;
};

const VerificationForm = () => {
  const authCodeRef = useRef<AuthCodeRef>(null);
  const [showResendCode, setShowResendCode] = useState<boolean>(false);

  const timerRef = useRef<TimerRef>(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const showNotififcation = useNotificationStore(
    (state) => state.showNotification
  );

  const params = useSearchParams();
  const username = params.get("mobile")!;

  const sendAuthCode = useSendAuthCode({
    onSuccess: () => {
      //show notification
      showNotififcation({
        message: "کد تایید به شماره ی شما ارسال شد",
        type: "info",
      });
    },
  });

  register("code", {
    validate: (value: string) => (value ?? "").length === 5,
  });

  const onSubmit = (data: VerifyUserModel) => {
    data.username = username;
    console.log(data);
  };

  const resendAuthCode = () => {
    timerRef.current?.restart(getTwoMinutesFromNow());
    setShowResendCode(false);
    sendAuthCode.submit(username);
    authCodeRef.current?.clear();
  };

  return (
    <>
      <h5 className="text-2xl">کد تایید</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-10 flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthCode
          className="mt-10"
          ref={authCodeRef}
          onChange={(value) => {
            // set value
            setValue("code", value, { shouldValidate: true });
          }}
        />
        <Timer
          className="my-8 "
          ref={timerRef}
          size="small"
          expiryTimestamp={getTwoMinutesFromNow()}
          showDays={false}
          showHours={false}
          onExpire={() => {
            setShowResendCode(true);
          }}
        />
        <Button
          isLink={true}
          isDisabled={!showResendCode}
          onClick={resendAuthCode}
        >
          ارسال مجدد کد تایید
        </Button>
        <Button type="submit" variant="primary" isDisabled={!isValid}>
          تایید و ادامه
        </Button>
        <div className="flex items-start gap-1 justify-center mt-auto">
          <span>برای اصلاح شماره موبایل</span>
          <Link href="/signin">اینجا</Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};

export default VerificationForm;
