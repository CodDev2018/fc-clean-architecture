export interface InputCreateProductDto {
  type: "A" | "B";
  name: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
