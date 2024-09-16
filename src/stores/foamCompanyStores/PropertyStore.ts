import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentProperty from '../../api/agent';
import {
  IPropertyType,
  IPropertyParams,
  PropertyRental,
  Payment,
  PropertyDetails,
  Assignment,
  IChangePropertyCondition,
} from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
export default class PropertyStore {
  openDialog = false;

  openAssignDialog = false;

  openPaymentDialog = false;

  openChangeStatusDialog = false;

  PropertyRegistry = new Map<number, IPropertyType>();

  editMode = false; //When click on edit button

  selectedProperty: IPropertyType | undefined;

  selectedPayment: Payment | undefined;

  selectedAssignment: Assignment | undefined;

  totalRecord: number = 0;

  PropertyTypeOption: SelectControl[] = []; // for Property Type Dropdown

  PropertyDetails: PropertyDetails | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get PropertyList() {
    return Array.from(this.PropertyRegistry.values());
  }

  setPropertyList = (Cupboard: IPropertyType) => {
    this.PropertyRegistry.set(Cupboard.id!, Cupboard);
  };

  setPayment = (payment: Payment) => {
    this.selectedPayment = payment;
  };

  setAssignment = (assignment: Assignment) => {
    this.selectedAssignment = assignment;
  };

  //Pagination
  loadProperty = async (params: IPropertyParams) => {
    try {
      const result = await agentProperty.Property.getList(params);
      runInAction(() => {
        result.data.data.forEach((lst: any) => {
          this.setPropertyList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Pagination
  loadPropertyDetails = async (id: number) => {
    try {
      const result = await agentProperty.Property.PropertyDetails(id);

      runInAction(() => {
        if (result.data) {
          this.PropertyDetails = result.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  Propertyearch = async (params: IPropertyParams) => {
    this.PropertyRegistry.clear();
    this.loadProperty(params);
  };

  getPropertyFromRegistry = async (id: number) => {
    let dep = await this.PropertyRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedProperty = dep;
    }
  };

  clearSelectedProperty = () => {
    this.editMode = false;
    this.selectedProperty = undefined;
    this.selectedPayment = undefined;
    this.selectedAssignment = undefined;
  };

  deleteProperty = async (id: number, remark?: string) => {
    try {
      await agentProperty.Property.delete(id, remark!);
      runInAction(() => {
        this.PropertyRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setOpenCloseAssignDialog = () => (this.openAssignDialog = !this.openAssignDialog);

  setOpenClosePaymentDialog = () => (this.openPaymentDialog = !this.openPaymentDialog);

  setOpenCloseChangeStatusDialog = () =>
    (this.openChangeStatusDialog = !this.openChangeStatusDialog);

  createProperty = async (Property: IPropertyType) => {
    await agentProperty.Property.create(Property);
    runInAction(() => {
      this.loadProperty({ pageIndex: 0, pageSize: 5 });
    });
  };

  assignProperty = async (Property: PropertyRental) => {
    await agentProperty.Property.AssignProperty(Property);
    runInAction(() => {
      this.loadProperty({ pageIndex: 0, pageSize: 5 });
    });
  };

  UpdateAssignProperty = async (Property: PropertyRental) => {
    await agentProperty.Property.updateAssignment(Property);
    runInAction(() => {
      this.loadProperty({ pageIndex: 0, pageSize: 5 });
    });
  };

  propertyPayment = async (Property: Payment) => {
    await agentProperty.Property.PayPropertyPayment(Property);
    runInAction(() => {
      this.loadPropertyDetails(Property.propertyId!);
    });
  };

  ChangeCondition = async (PropertyCondition: IChangePropertyCondition) => {
    await agentProperty.Property.ChangePropertyCondition(PropertyCondition);
    runInAction(() => {
      this.loadProperty({ pageIndex: 0, pageSize: 5 });
    });
  };

  UpdatePropertyPayment = async (Property: Payment) => {
    await agentProperty.Property.updatePropertyPayment(Property);
    runInAction(() => {
      this.loadPropertyDetails(Property.propertyId!);
    });
  };

  updateProperty = async (Property: IPropertyType) => {
    await agentProperty.Property.updateProperty(Property);
    runInAction(() => {
      this.loadProperty({ pageIndex: 0, pageSize: 5 });
      this.PropertyRegistry.delete(Property.id!);
      this.PropertyRegistry.set(Property.id!, Property);
    });
  };

  // GetPropertyTracking = async (PropertyTrackingParam: IPropertyTrackingParam) => {
  //   try {
  //     const result = agentProperty.Property.Gettracking(PropertyTrackingParam);
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // loadPropertyTypeDropdown = async () => {
  //   try {
  //     const result = await agentProperty.PropertyTypes.PropertyTypeDDL();
  //     this.setPropertyTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setPropertyTypeOptions = (data: PropertyTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.PropertyTypeOption = op;
  // };
}
