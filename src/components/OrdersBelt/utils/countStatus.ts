import { DataRow } from '../../OrderTable/utils/data';

export const countStatus = (data: DataRow[]) => {
  return data.reduce((acc: { [key: string]: number }, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
};
