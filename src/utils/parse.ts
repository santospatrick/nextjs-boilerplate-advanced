export const parseMaskedNumber = (
  real: number | string,
  currency?: "BRL" | undefined
) => {
  if (!real) return 0;
  if (typeof real === "number") {
    return real;
  }

  const match = real.match(/[\d.,]/g)?.join("");
  const pureNumber =
    currency === "BRL"
      ? match?.replace(".", "").replace(",", ".")
      : match?.replace(",", "");
  return pureNumber ? parseFloat(pureNumber) : 0;
};

export const removeEmptyValues = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });
};
