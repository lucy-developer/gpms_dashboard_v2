export interface IFareInfoObj {
  sn?: number;
  effectDate: Date;
  expireDate: Date;
  type: FareType;
  fareName: string;
  time1: number;
  time2?: number;
  won1: number;
  won2?: number;
  count: number;
  count1: number;
  count2?: number;
  delYn: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
}

export interface IFareBasicObj {
  sn?: number;
  serviceTime: number;
  regTime: number;
  dayMaxAmt: number;
  effectDate: Date;
  delYn: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
}

export interface IFarePolicyObj {
  sn?: number;
  fareName: string;
  vehicleType: string;
  startTime: string;
  endTime: string;
  basicFareSn: number;
  basicFare?: IFareInfoObj;
  addFareSn: number;
  addFare?: IFareInfoObj;
  effectDate?: Date;
  expireDate?: Date;
  week: string[];
  delYn: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
}