"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ZodErrors } from "./../utils/transform-zod-errors";
import { transformZodErrors } from "@/utils/transform-zod-errors";
import { createToolSchema } from "@/validations/create-tool-schema";
import { z } from "zod";

type FormState = {
  error: boolean;
  message: string | ZodErrors;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  try {
    const parsed = createToolSchema.parse(formData);

    await db.tool.create({
      data: {
        ...parsed,
      },
    });

    revalidatePath("/");

    return {
      error: false,
      message: "SUCCESS",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log({
        error: true,
        message: transformZodErrors(error),
      });
      return {
        error: true,
        message: transformZodErrors(error),
      };
    }

    console.log(error)

    return {
      error: true,
      message: "An unexpected error occurred. Could not create tool.",
    };
  }
}
