export interface Drink {
    name: string;
    base_price: number;
    multiple: boolean;
    variants: Record<string, number>;
  }

export interface SelectedDrink {
    drink: Drink;
    variants: string[];
}

export interface ExtraItem {
    name: string;
    price: number;
}