import { read, utils, WorkBook, WorkSheet, writeFileXLSX } from 'xlsx';
import slugify from 'slugify';
import { SearchValue } from '../components/SearchField';

export type Row = Record<string, string>;

export function loadWorkbook(file: Blob): Promise<WorkBook> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const workbook = read(e.target.result);
      resolve(workbook);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getSheetData(sheet: WorkSheet): Row[] {
  // const sheet = workbook.Sheets[workbook.SheetNames[1]];
  const rows = utils.sheet_to_json(sheet) as Row[];
  return rows;
}

export async function processSheet(sheet: WorkSheet, searchQueries: SearchValue[]) {
  const rows = getSheetData(sheet);

  const andGroups = searchQueries.reduce((group, q) => {
    group[q.column] = group[q.column] ?? [];
    group[q.column].push(q.value);
    return group;
  }, {});

  const filtered = rows.filter((item) =>
    Object.keys(andGroups).every((column) => {
      const queries = andGroups[column];
      return queries.some((q: string) => item[column].includes(q));
    })
  );

  const listOfQueries = Object.values(andGroups).flat();
  const sheetName = listOfQueries.join(',').substring(0, 30); // 31 char is maximum sheet name length
  const xlsxName = slugify(listOfQueries.join('_').substring(0, 50));

  const newWorkbook = utils.book_new();
  const worksheet = utils.json_to_sheet(filtered);
  worksheet['!cols'] = [{ wch: 20 }, { wch: 30 }, { wch: 50 }, { wch: 50 }];
  utils.book_append_sheet(newWorkbook, worksheet, sheetName);

  writeFileXLSX(newWorkbook, xlsxName + '.xlsx');
}

export function getCategories(rows: Row[], categoriesColumn: string) {
  return rows.reduce((set, row) => {
    row[categoriesColumn].split(',').forEach((c) => set.add(c));
    return set;
  }, new Set());
}
