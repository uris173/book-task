export const removeSpaceFromCardNum = (cardNumber: string) => {
  let replaced = cardNumber.replace(/\s/g, "");
  const num = parseInt(replaced, 10);

  return num % 2 === 0;
};