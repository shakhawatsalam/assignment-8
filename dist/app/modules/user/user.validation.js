'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({
      required_error: 'Name is Required',
    }),
    email: zod_1.z.string({
      required_error: 'Email is Required',
    }),
    password: zod_1.z.string({
      required_error: 'Password is Required',
    }),
    contactNo: zod_1.z.string({
      required_error: 'contactNo is Required',
    }),
    role: zod_1.z.enum([...Object.values(client_1.UserRole)], {
      required_error: 'Role Is Required',
    }),
    address: zod_1.z.string({
      required_error: 'Address Is Required',
    }),
    profileImg: zod_1.z.string({
      required_error: 'Profile Img is Required',
    }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z
    .object({
      name: zod_1.z.string().optional(),
      email: zod_1.z.string().optional(),
      password: zod_1.z.string().optional(),
      contactNo: zod_1.z.string().optional(),
      role: zod_1.z.enum([...Object.values(client_1.UserRole)], {}).optional(),
      address: zod_1.z.string().optional(),
      profileImg: zod_1.z.string().optional(),
    })
    .optional(),
});
exports.UserValidation = {
  create,
  update,
};
