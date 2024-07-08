import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentPaymentType from '../../api/agent';
import { IPaymentType, IPaymentTypeParams } from 'src/@types/foamCompanyTypes/looks/PaymentType';

export default class PaymentTypeStore {
  openDialog = false;

  PaymentTypeRegistry = new Map<number, IPaymentType>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedPaymentType: IPaymentType | undefined;

  totalRecord: number = 0;

  PaymentTypeTypeOption: SelectControl[] = []; // for PaymentType Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get PaymentTypeList() {
    return Array.from(this.PaymentTypeRegistry.values());
  }

  setPaymentTypeList = (Cupboard: IPaymentType) => {
    this.PaymentTypeRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadPaymentType = async (params: IPaymentTypeParams) => {
    try {
      const result = await agentPaymentType.PaymentType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setPaymentTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentPaymentType.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadPaymentType({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  PaymentTypeearch = async (params: IPaymentTypeParams) => {
    this.PaymentTypeRegistry.clear();
    this.loadPaymentType(params);
  };

  getPaymentTypeFromRegistry = (id: number) => {
    let dep = this.PaymentTypeRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedPaymentType = dep;
    }
  };

  clearSelectedPaymentType = () => {
    this.editMode = false;
    this.selectedPaymentType = undefined;
  };

  deletePaymentType = async (id: number, remark?: string) => {
    try {
      await agentPaymentType.PaymentType.delete(id, remark!);
      runInAction(() => {
        this.PaymentTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createPaymentType = async (PaymentType: IPaymentType) => {
    await agentPaymentType.PaymentType.create(PaymentType);
    runInAction(() => {
      this.loadPaymentType({ pageIndex: 0, pageSize: 5 });
    });
  };

  updatePaymentType = async (PaymentType: IPaymentType) => {
    await agentPaymentType.PaymentType.update(PaymentType);
    runInAction(() => {
      this.loadPaymentType({ pageIndex: 0, pageSize: 5 });
      this.PaymentTypeRegistry.delete(PaymentType.id!);
      this.PaymentTypeRegistry.set(PaymentType.id!, PaymentType);
    });
  };

  // loadPaymentTypeTypeDropdown = async () => {
  //   try {
  //     const result = await agentPaymentType.PaymentTypeTypes.PaymentTypeTypeDDL();
  //     this.setPaymentTypeTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setPaymentTypeTypeOptions = (data: PaymentTypeTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.PaymentTypeTypeOption = op;
  // };
}
