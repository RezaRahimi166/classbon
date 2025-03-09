"use server";

import { signInSchema } from "@/app/(auth)/signin/types/singin.schema";
import { OperationResult } from "@/types/operation-result";
import { redirect } from "next/navigation";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { SignIn } from "@/app/(auth)/signin/types/signin.types";
import { SendAuthCode } from "@/app/(auth)/verify/types/verify-user.types";
import { Problem } from "@/types/http-errors.interface";
import { signIn, signOut } from "@/auth";

export async function signinAction(
  formState: OperationResult<string> | null,
  formData: FormData
) {
  const mobile = formData.get("mobile") as string;

  const validatedData = signInSchema.safeParse({ mobile: mobile });

  // if (!validatedData.success) {
  //   return {
  //     message: "خطا در فرمت موبایل",
  //   };
  // } else {
  return serverActionWrapper(
    async () =>
      await createData<SignIn, string>("/signin", {
        mobile,
      })
  );
  // }
}

export async function sendAuthCode(
  formstate: OperationResult<string> | null,
  mobile: string
) {
  return serverActionWrapper(
    async () =>
      await createData<SendAuthCode, string>("/send-auth-code", { mobile })
  );
}

export async function verify(state: Problem | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    // todo
    return {
      status: 0,
      title: "",
    } satisfies Problem;
  }
}

export async function logout() {
  await signOut();
}
