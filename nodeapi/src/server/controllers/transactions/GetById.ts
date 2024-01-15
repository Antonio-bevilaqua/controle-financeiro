import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { ITransactions } from '../../database/models';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IParamProps {
  id?: string;
}

interface IBodyProps extends Omit<ITransactions,  'id' | 'type' | 'description' | 'value' | 'date' | 'created_at' | 'updated_at'>{}

export const getByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    user_id: yup.string().optional().default(''),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.string().required(),
  })),
}));

export const getById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await TransactionsProvider.getById(req.params.id, req.body.user_id);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};