import Excel from "exceljs";

type ExecuteSeedCallback = (workSheet: Excel.Worksheet) => void;

type ExecuteSeedParams = {
  fileName: string;
  callback: ExecuteSeedCallback;
};

export type ExecuteSeed = (params: ExecuteSeedParams) => void;

export const executeSeed: ExecuteSeed = ({
  fileName,
  callback,
}: ExecuteSeedParams) => {
  const workbook = new Excel.Workbook();

  workbook.xlsx.readFile(fileName).then(function () {
    const worksheet = workbook.getWorksheet("Sheet1");
    callback(worksheet);
  });
};
