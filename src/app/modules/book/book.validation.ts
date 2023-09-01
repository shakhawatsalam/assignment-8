import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    author: z.string({
      required_error: 'Author is Required',
    }),
    price: z.number({
      required_error: 'Price is Required',
    }),
    genre: z.string({
      required_error: 'Genre Is Required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is Required',
    }),
    categoryId: z.string({
      required_error: 'Category is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
