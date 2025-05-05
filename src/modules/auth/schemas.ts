import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3)
    .max(63)
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, 'username can only contain lower case letters , numbers  and hyphens , It must start and end with a letter or number ')
    .refine((val) => !val.includes("--"), 'username cannot contain consecutive hyphens')
    .transform((val) => val.toLowerCase())
})


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

