'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const insertIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
      data,
      include: {
        category: true,
      },
    });
    return result;
  });
const getAllBookFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters,
      filtersData = __rest(filters, ['searchTerm', 'minPrice', 'maxPrice']);
    const andCondition = [];
    // Add minPrice and maxPrice conditions if provided
    if (parseFloat(minPrice)) {
      andCondition.push({
        price: {
          gte: parseFloat(minPrice),
        },
      });
    }
    // Max Price
    if (parseFloat(maxPrice)) {
      andCondition.push({
        price: {
          lte: parseFloat(maxPrice),
        },
      });
    }
    if (searchTerm) {
      andCondition.push({
        OR: ['title', 'genre', 'author'].map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length > 0) {
      andCondition.push({
        AND: Object.keys(filtersData).map(key => ({
          [key]: {
            equals: filtersData[key],
            mode: 'insensitive',
          },
        })),
      });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.book.findMany({
      include: {
        category: true,
      },
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    const total = yield prisma_1.default.book.count({
      where: whereCondition,
    });
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  });
const getSingleBookFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return result;
  });
const getByCategoryIDFromDB = categoryId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });
    return result;
  });
const updateSingleBookFromDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
      where: {
        id,
      },
      data: payload,
      include: {
        category: true,
      },
    });
    return result;
  });
const deleteSingleBookFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return result;
  });
exports.BookService = {
  insertIntoDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  updateSingleBookFromDB,
  getByCategoryIDFromDB,
  deleteSingleBookFromDB,
};
