import { Moment } from 'moment';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IShoppingCart {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  totalPrice?: number;
  paymentMethod?: PaymentMethod;
  orders?: IProductOrder[];
  customerDetails?: ICustomerDetails;
}

export const defaultValue: Readonly<IShoppingCart> = {};
