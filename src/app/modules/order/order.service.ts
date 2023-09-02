import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICreateOrder } from './order.interface';

const insertIntoDB = async (data: ICreateOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
};
