import { generateNewTableRow } from './../SvgUtils/tableData';

export const splitOrAddRow = (data) => {
  const oldRowCords = { ...data.tableRows[0].coordinates };

  const oldHeight = data.cords.y - oldRowCords.y;

  const newY = data.cords.y;
  const newHeight = (oldRowCords.y + oldRowCords.height) - data.cords.y;

  const row1 = generateNewTableRow({
    id: 'x1',
    isHeader: false,
    cords: { ...oldRowCords, height: oldHeight },
    styles: { fill: '#000',},
  });

  const row2 = generateNewTableRow({
    id: 'x2',
    isHeader: false,
    cords: { ...oldRowCords, y: newY, height: newHeight },
    styles: {},
  });

  return [ row1, row2 ];
};