import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICreateOrder } from './order.interface';

const insertIntoDB = async (data: ICreateOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllOrder = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({});
  return result;
};

const getSingleOrder = async (
  id: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  if (role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findUnique({
      where: {
        id,
        userId,
      },
    });
    return result;
  }
};

const getMyAllOrder = async (userId: string): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return result;
};
export const OrderService = {
  insertIntoDB,
  getAllOrder,
  getSingleOrder,
  getMyAllOrder,
};
