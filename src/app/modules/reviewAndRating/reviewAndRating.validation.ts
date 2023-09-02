import { z } from 'zod';

const create = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is Required',
    }),
    rating: z.number({
      required_error: 'Rating is Required',
    }),
    userId: z.string({
      required_error: 'User Id is Required',
    }),
    bookId: z.string({
      required_error: 'Book Id is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    userId: z.string().optional(),
    bookId: z.string().optional(),
  }),
});

export const ReviewAndRatingValidation = {
  create,
  update,
};
