import { rgb } from "pdf-lib";
import { centerText } from "./helpers";

export const createLetterhead = (
  page,
  regularFont,
  boldFont,
  corporateData
) => {
  page.drawLine({
    start: { x: 50, y: page.getSize().height - 70 },
    end: { x: page.getSize().width - 50, y: page.getSize().height - 70 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  centerText(
    page,
    corporateData.value.corporateName,
    page.getSize().height - 25,
    14,
    boldFont
  );
  centerText(
    page,
    corporateData.value.address,
    page.getSize().height - 40,
    12,
    regularFont
  );
  centerText(
    page,
    `Mobile: ${corporateData.value.mobileNumber} | Email: ${corporateData.value.email}`,
    page.getSize().height - 55,
    12,
    regularFont
  );
};
