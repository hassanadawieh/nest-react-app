//@ts-check

import { z } from "zod";

export const apiValidations = {
  AddProduct: z
    .object({
      title: z.string().min(1, "title is required"),
      description: z.string().min(1, "description is required"),
}),

};
