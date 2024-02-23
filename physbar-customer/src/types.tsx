export interface Drink {
    name: string;
    base_price: number;
    multiple: boolean;
    variants: Record<string, number>;
  }