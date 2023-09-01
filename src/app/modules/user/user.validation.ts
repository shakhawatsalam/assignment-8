import { UserRole } from '@prisma/client';
import { z } from 'zod';
const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is Required',
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]], {
      required_error: 'Role Is Required',
    }),
    address: z.string({
      required_error: 'Address Is Required',
    }),
    profileImg: z.string({
      required_error: 'Profile Img is Required',
    }),
  }),
});

export const UserValidation = {
  create,
};
