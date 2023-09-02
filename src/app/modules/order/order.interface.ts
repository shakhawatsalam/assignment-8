import { Status } from '@prisma/client';

export type ICreateOrder = {
  id: string;
  userId: string;
  orderedBooks: [{ bookId: string; quantity: number }];
  status: Status;
};
