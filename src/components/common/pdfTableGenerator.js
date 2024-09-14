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

  // Add this helper function to wrap text
  const wrapText = (text, maxWidth, font, fontSize) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
      if (width < maxWidth - 2 * padding) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

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

  // Update the table content drawing
  let currentY = startY - headerHeight;
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((row, rowIndex) => {
      let maxCellHeight = dataCellHeight;
      if (typeof row === "object" && row !== null) {
        fields.forEach((field, cellIndex) => {
          let cellValue;
          if (field === "sno") {
            cellValue = String(rowIndex + 1);
          } else if (field === "signature") {
            cellValue = ""; // Leave signature field empty
          } else {
            cellValue = row[field] !== undefined ? String(row[field]) : "";
          }
          const cellWidth = cellWidths[cellIndex] - 2 * padding;
          const wrappedText = wrapText(
            cellValue,
            cellWidth,
            regularFont,
            textHeight
          );
          maxCellHeight = Math.max(
            maxCellHeight,
            wrappedText.length * textHeight + 2 * padding
          );

          wrappedText.forEach((line, lineIndex) => {
            page.drawText(line, {
              x:
                startX +
                cellWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0) +
                padding,
              y: currentY - (lineIndex + 1) * textHeight - padding,
              size: textHeight,
              font: regularFont,
              color: rgb(0, 0, 0),
            });
          });
        });
      } else {
        console.error(`Invalid row data at index ${rowIndex}:`, row);
      }
      currentY -= maxCellHeight;

      // Draw horizontal line after each row
      page.drawLine({
        start: { x: startX, y: currentY },
        end: { x: startX + cellWidths.reduce((a, b) => a + b, 0), y: currentY },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    });
  } else {
    console.error("Invalid or empty data passed to createTable:", data);
  }

  // Draw vertical lines
  let lineX = startX;
  for (let i = 0; i <= cellWidths.length; i++) {
    page.drawLine({
      start: { x: lineX, y: startY },
      end: { x: lineX, y: currentY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    lineX += cellWidths[i] || 0;
  }

  // Return the end Y position of the table
  return currentY;
};
