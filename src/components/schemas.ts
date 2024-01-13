import { z } from 'zod';

export const recordFormSchema = z.object({
  point: z.coerce.number(),
  top: z.coerce.number(),
  second: z.coerce.number(),
  three: z.coerce.number(),
  four: z.coerce.number(),
});
