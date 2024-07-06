export interface orderDetails {
  goodsId: number | undefined;
  quantity: number | undefined;
  originalPrice: number | undefined;
  salePrice: number | undefined;
  discount: number | undefined;
  totalPrice: number | undefined;
}

export interface productOrder {
  id?: number;
  cusetomerId?: number;
  customerName?: string;
  orderDetails: orderDetails[];
  afterSubmit?: string;
}
export interface ProductOrdersParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}

export interface productOrderDetails {
  id?: number;
  name: string;
  totalAmount: number;
  paidAmount: number;
  remainAmount: number;
  createdOn: string;
  cusetomerId?: number;
  orderItems: orderDetails[];
  afterSubmit?: string;
}

export interface productList {
  id: number;
  name: string;
  surName: string;
  totalAmount: number;
  paidAmount: number;
  remainAmount: number;
  cusetomerId?: number;
  orderDetails: orderDetails[];
  createdOn: string;
}
