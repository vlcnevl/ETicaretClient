import { ListProductImage } from "./list_product_image";

export class ListProduct {
  id:string;
  name:string;
  description:string;
  price:number;
  stock:number;
  createdDate:Date;
  updatedDate:Date;
  productImageFiles?:ListProductImage[];
  imagePath:string; // vitrin resmi urlsi
}
