import { EDelYn, EInoutType, EResultType, ETicketType } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ICorpObj } from '@models/corp';

export interface IInoutObj {
  type: EInoutType;
  parkinSn?: number;
  vehicleNo?: string;
  parkcartype: ETicketType;
  inGateId?: string;
  inDate: Date;
  parkoutSn?: number;
  outDate?: Date | null;
  outGateId?: string;
  parktime?: number;
  parkfee?: number;
  payfee?: number;
  discountfee?: number;
  inImgBase64Str?: string;
  outImgBase64Str?: string;
  ticketCorpName?: string;
  memo?: string;
  paymentAmount?: number;
  nonPayment?: number;
  dayDiscountfee?: number;
  addDiscountClasses?: IInoutDiscountApplyObj[];
  aplyDiscountClasses?: IInoutDiscountObj[];
}

export interface IInoutSelectReq {
  parkinglotId?: number;
  dateType: string;
  startDate: string;
  endDate: string;
  createTm: number[];
  vehicleNo?: string;
  parkcartype?: ETicketType;
  outSn: number | string;
}

export interface IInoutPaymentSelectReq {
  startDate: string;
  endDate: string;
  createTm: number[];
  vehicleNo?: string;
  resultType?: EResultType | string;
  limit: number;
}

export interface IInoutDiscountApplyObj {
  inSn: number;
  discountClassSn: number;
  cnt: number;
}

export interface IInoutDiscountObj {
  sn: number;
  discountType: ETicketType;
  corpSn?: number;
  discountClassSn: number;
  ticketHistSn?: number;
  inSn: number;
  quantity: number;
  useQuantity: number;
  applyDate?: Date | null;
  delYn: EDelYn;
  calcYn: EDelYn;
  outSn?: number;
  discountClass: IDiscountClassObj;
  ticketClass: ICorpTicketClassObj;
  //not metadata
  disabled: boolean;
  corp?: ICorpObj;
}
