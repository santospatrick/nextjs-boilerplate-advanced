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
