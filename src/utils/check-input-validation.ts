import { validationParams } from '../constants';
import { IValidationParams } from '../types/custom-types';

export const checkInputValidation = (inputName: string, value: string) => {
  let error = '';

  validationParams[inputName as keyof IValidationParams].forEach((item) => {
    if (!item.pattern.test(value)) {
      error += `${item.error} `;
    }
  });

  return error ? error : true;
};
