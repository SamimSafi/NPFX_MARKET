import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentProductOrder from '../../api/agent';
import {
  productList,
  productOrder,
  ProductOrdersParams,
} from 'src/@types/foamCompanyTypes/productOrder';

export default class ProductOrderStore {
  openDialog = false;

  ProductOrderRegistry = new Map<number, productList>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedProductOrder: productList | undefined;

  totalRecord: number = 0;

  ProductOrderTypeOption: SelectControl[] = []; // for ProductOrder Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get ProductOrderList() {
    return Array.from(this.ProductOrderRegistry.values());
  }

  setProductOrderList = (productOrder: productList) => {
    this.ProductOrderRegistry.set(productOrder.id!, productOrder);
  };

  //Pagination
  loadProductOrder = async (params: ProductOrdersParams) => {
    try {
      const result = await agentProductOrder.ProductOrder.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setProductOrderList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentProductOrder.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadProductOrder({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  ProductOrderearch = async (params: ProductOrdersParams) => {
    this.ProductOrderRegistry.clear();
    this.loadProductOrder(params);
  };

  getProductOrderFromRegistry = (id: number) => {
    let dep = this.ProductOrderRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedProductOrder = dep;
    }
  };

  clearSelectedProductOrder = () => {
    this.editMode = false;
    this.selectedProductOrder = undefined;
  };

  //   deleteProductOrder = async (id: number, remark?: string) => {
  //     try {
  //       await agentProductOrder.ProductOrder.delete(id, remark!);
  //       runInAction(() => {
  //         this.ProductOrderRegistry.delete(id);
  //         this.totalRecord--;
  //         this.setOpenCloseDialog();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createProductOrder = async (ProductOrder: productOrder) => {
    await agentProductOrder.ProductOrder.create(ProductOrder);
    runInAction(() => {
      this.loadProductOrder({ pageIndex: 0, pageSize: 5 });
    });
  };

  //   updateProductOrder = async (ProductOrder: ProductOrder) => {
  //     await agentProductOrder.ProductOrder.update(ProductOrder);
  //     runInAction(() => {
  //       this.loadProductOrder({ pageIndex: 0, pageSize: 5 });
  //       this.ProductOrderRegistry.delete(ProductOrder.id!);
  //       this.ProductOrderRegistry.set(ProductOrder.id!, ProductOrder);
  //     });
  //   };
}
