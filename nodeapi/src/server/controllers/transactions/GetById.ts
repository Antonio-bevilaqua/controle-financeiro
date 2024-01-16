import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IParamProps {
  id?: string;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.string().required(),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const headerValue_user_id = req.headers['user_id'];
  
  if (!headerValue_user_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Você precisa enviar um token'
      }
    });
  }

  const user_id = Array.isArray(headerValue_user_id) ? headerValue_user_id[0] : headerValue_user_id;

  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await TransactionsProvider.getById(req.params.id, user_id);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};