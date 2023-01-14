import { read, utils, writeFileXLSX } from 'xlsx';
import slugify from 'slugify';

export type Row = Record<string, string>;

export function loadWorkbook(file: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const workbook = read(e.target.result);
      resolve(workbook);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getSheetData(workbook): Row[] {
  const sheet = workbook.Sheets[workbook.SheetNames[1]];
  const rows = utils.sheet_to_json(sheet) as Row[];
  return rows;
}

export async function processSheet(workbook, searchQueries: string[], categoriesColumn: string) {
  const rows = getSheetData(workbook);
  const filterByCategory = (queries: string[]) =>
    rows.filter((item) => queries.some((q) => item[categoriesColumn].includes(q)));
  const filtered = filterByCategory(searchQueries);

  const newWorkbook = utils.book_new();
  const worksheet = utils.json_to_sheet(filtered);
  worksheet['!cols'] = [{ wch: 20 }, { wch: 30 }, { wch: 50 }, { wch: 50 }];
  utils.book_append_sheet(newWorkbook, worksheet, searchQueries.join(','));

  writeFileXLSX(newWorkbook, slugify(searchQueries.join('_')) + '.xlsx');
}

export function getCategories(rows: Row[], categoriesColumn: string) {
  return rows.reduce((set, row) => {
    row[categoriesColumn].split(',').forEach((c) => set.add(c));
    return set;
  }, new Set());
}
