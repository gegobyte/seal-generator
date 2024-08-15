export const centerText = (page, text, y, size, font) => {
  const textWidth = font.widthOfTextAtSize(text, size);
  const textHeight = font.heightAtSize(size);
  const x = (page.getSize().width - textWidth) / 2;
  page.drawText(text, { x, y: y - textHeight / 2, size, font });
};

export const drawMultilineText = (
  page,
  text,
  x,
  y,
  width,
  lineHeight,
  font,
  fontSize
) => {
  const words = text.split(" ");
  let line = "";
  let yOffset = 0;

  words.forEach((word) => {
    const testLine = line + word + " ";
    const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testLineWidth > width && line !== "") {
      page.drawText(line.trim(), { x, y: y - yOffset, size: fontSize, font });
      line = word + " ";
      yOffset += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line.trim() !== "") {
    page.drawText(line.trim(), { x, y: y - yOffset, size: fontSize, font });
  }

  return yOffset + lineHeight; // Return the total height of the text block
};

export const placeSeal = (page, sealY, regularFont, sealData, x = 50) => {
  page.drawText(sealData.value.firstLine, {
    x: x,
    y: sealY,
    size: sealData.value.fontSize,
  });

  // Measure the width of the first line of text
  const widthOfFirstLine = regularFont.widthOfTextAtSize(
    sealData.value.firstLine,
    sealData.value.fontSize
  );

  // Calculate the x-coordinate for the start of the second line of text
  const xStartSecondLine =
    x +
    widthOfFirstLine -
    regularFont.widthOfTextAtSize(
      sealData.value.secondLine,
      sealData.value.fontSize
    );

  // Draw the second line of text aligned with the end of the first line
  page.drawText(sealData.value.secondLine, {
    x: xStartSecondLine,
    y: sealY - 40, // Adjust Y-coordinate for the second line, 40 is line spacing
    size: sealData.value.fontSize,
  });

  return sealY - 40;
};

export function getCurrentDay() {
  return new Date().getDate().toString().padStart(2, "0");
}

export function getCurrentMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[new Date().getMonth()];
}

export function getCurrentYear() {
  return new Date().getFullYear().toString();
}

export function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}
