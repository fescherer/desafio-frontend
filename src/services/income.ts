import { axiosInstance } from '.';
import { IApiResponse } from '../@types/income';

export const getIncome = async (): Promise<IApiResponse> => {
  const response = await axiosInstance.get('getFixedIncomeClassData');
  return response.data.data;
};
