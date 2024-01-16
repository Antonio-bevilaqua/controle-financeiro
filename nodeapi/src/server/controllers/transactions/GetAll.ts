import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IQueryProps {
  type?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    type: yup.string().optional(),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const headerValue_user_id = req.headers['user_id'];
  
  if (!headerValue_user_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Você precisa enviar um token'
      }
    });
  }

  const user_id = Array.isArray(headerValue_user_id) ? headerValue_user_id[0] : headerValue_user_id;

  const result = await TransactionsProvider.getAll(user_id, req.query.page || 1, req.query.limit || 7, req.query.type || '');

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};