import { rgb } from "pdf-lib";

export const createTable = (
  page,
  regularFont,
  boldFont,
  headers,
  data,
  fields,
  startX,
  startY,
  cellWidths,
  headerCellHeight,
  dataCellHeight
) => {
  const textHeight = 10;
  const padding = 5;

  // Calculate actual header height based on content
  let maxHeaderLines = 0;
  headers.forEach((header) => {
    const lines = header.split("\n");
    maxHeaderLines = Math.max(maxHeaderLines, lines.length);
  });
  const headerHeight = Math.max(
    headerCellHeight,
    maxHeaderLines * textHeight + 2 * padding
  );

  // Draw table headers
  headers.forEach((header, colIndex) => {
    const lines = header.split("\n");
    lines.forEach((line, lineIndex) => {
      page.drawText(line, {
        x:
          startX +
          cellWidths.slice(0, colIndex).reduce((a, b) => a + b, 0) +
          padding,
        y: startY - (lineIndex + 1) * textHeight - padding,
        size: textHeight,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    });
  });

  // Draw horizontal lines for header
  page.drawLine({
    start: { x: startX, y: startY },
    end: { x: startX + cellWidths.reduce((a, b) => a + b, 0), y: startY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: startX, y: startY - headerHeight },
    end: {
      x: startX + cellWidths.reduce((a, b) => a + b, 0),
      y: startY - headerHeight,
    },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Draw table content
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((row, rowIndex) => {
      let currentX = startX;
      if (typeof row === "object" && row !== null) {
        fields.forEach((field, cellIndex) => {
          let cellValue;
          if (field === "sno") {
            cellValue = String(rowIndex + 1);
          } else {
            cellValue = row[field] !== undefined ? String(row[field]) : "";
          }
          page.drawText(cellValue, {
            x: currentX + padding,
            y: startY - headerHeight - (rowIndex + 0.5) * dataCellHeight,
            size: textHeight,
            font: regularFont,
            color: rgb(0, 0, 0),
          });
          currentX += cellWidths[cellIndex];
        });
      } else {
        console.error(`Invalid row data at index ${rowIndex}:`, row);
      }
    });
  } else {
    console.error("Invalid or empty data passed to createTable:", data);
  }

  // Draw horizontal lines
  for (let i = 0; i <= data.length; i++) {
    const y = startY - headerHeight - i * dataCellHeight;
    page.drawLine({
      start: { x: startX, y },
      end: { x: startX + cellWidths.reduce((a, b) => a + b, 0), y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  }

  // Draw vertical lines
  let lineX = startX;
  for (let i = 0; i <= cellWidths.length; i++) {
    page.drawLine({
      start: { x: lineX, y: startY },
      end: {
        x: lineX,
        y: startY - headerHeight - data.length * dataCellHeight,
      },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    lineX += cellWidths[i] || 0;
  }

  // Calculate the end Y position of the table
  const tableEndY = startY - headerHeight - data.length * dataCellHeight;

  // Return the end Y position of the table
  return tableEndY;
};
