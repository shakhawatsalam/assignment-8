'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewAndRatingValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    review: zod_1.z.string({
      required_error: 'Review is Required',
    }),
    rating: zod_1.z.number({
      required_error: 'Rating is Required',
    }),
    userId: zod_1.z.string({
      required_error: 'User Id is Required',
    }),
    bookId: zod_1.z.string({
      required_error: 'Book Id is Required',
    }),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    review: zod_1.z.string().optional(),
    rating: zod_1.z.number().optional(),
    userId: zod_1.z.string().optional(),
    bookId: zod_1.z.string().optional(),
  }),
});
exports.ReviewAndRatingValidation = {
  create,
  update,
};
