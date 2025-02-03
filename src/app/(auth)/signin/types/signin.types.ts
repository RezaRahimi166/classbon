import { z } from "zod";
import { signInSchema } from "./singin.schema";

export type SignIn = z.infer<typeof signInSchema>;
