"use server";

import { signInSchema } from "@/app/(auth)/signin/types/singin.schema";
import { redirect } from "next/navigation";

export async function signinAction(
  formState: { message: string },
  formData: FormData
) {
  const mobile = formData.get("mobile");

  const validatedData = signInSchema.safeParse({ mobile: mobile });

  if (!validatedData.success) {
    return {
      message: "خطا در فرمت موبایل",
    };
  } else {
    redirect("/");
  }
}
