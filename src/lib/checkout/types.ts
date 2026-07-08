export type CheckoutPlan = {
  name: string;
  slug: string;
  price: number;
  couplesPrice: number;
  updateCycle: string;
};

export function planToCheckout(name: string, price: number, couplesPrice: number, updateCycle: string): CheckoutPlan {
  return {
    name,
    slug: name.toLowerCase(),
    price,
    couplesPrice,
    updateCycle,
  };
}
