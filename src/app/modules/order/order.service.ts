import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICreateOrder } from './order.interface';

const insertIntoDB = async (data: ICreateOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllOrder = async (
  userId: string,
  role: string
): Promise<Order[] | Order | null> => {
  if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        user: true,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findMany({
      where: {
        userId: userId,
      },

      include: {
        user: true,
      },
    });
    return result;
  }
};

const getSingleOrder = async (
  id: string,
  userId: string,
  role: string
): Promise<Order[] | Order | null> => {
  if (role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return result;
  } else {
    const result = await prisma.order.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
};

export const OrderService = {
  insertIntoDB,
  getAllOrder,
  getSingleOrder,
};
