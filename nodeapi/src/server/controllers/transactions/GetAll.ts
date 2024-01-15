import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { ITransactions } from '../../database/models';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IQueryProps {
  type?: string;
  page?: number;
  limit?: number;
}

interface IBodyProps extends Omit<ITransactions,  'id' | 'type' | 'description' | 'value' | 'date' | 'created_at' | 'updated_at'>{}

export const getAllValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    user_id: yup.string().optional().default(''),
  })),
  query: getSchema<IQueryProps>(yup.object().shape({
    type: yup.string().optional(),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
  })),
}));

export const getAll = async (req: Request<{}, {}, IBodyProps, IQueryProps>, res: Response) => {
  const result = await TransactionsProvider.getAll(req.body.user_id, req.query.page || 1, req.query.limit || 7, req.query.type || '');

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};