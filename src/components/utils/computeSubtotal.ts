export const computeSubtotal = (details: any) => {
  return details.reduce((acc: number, detail: any) => {
    return acc + detail.price * detail.quantity;
  }, 0);
};
