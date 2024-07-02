export type Order = 'asc' | 'desc';

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T): number => {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <T>(order: Order, orderBy: keyof T): ((a: T, b: T) => number) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
