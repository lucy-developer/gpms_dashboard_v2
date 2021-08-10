import { ISelectOptions } from '@/utils/form';
import { localeStore } from '@store/localeStore';

export enum EDelYn {
  Y = 'Y',
  N = 'N'
}
export enum EStatus {
  On = 'On',
  Off = 'Off'
}

export const statusOpt: ISelectOptions[] = [
  { value: EStatus.On, label: '开启', color: 'blue' },
  { value: EStatus.Off, label: '关闭', color: 'red' }
];

export enum ECity {
  SEOUL = 'SEOUL',
  GYEONGGIDO = 'GYEONGGIDO',
  INCHEON = 'INCHEON',
  BUSAN = 'BUSAN',
  DAEJEON = 'DAEJEON',
  DAEGU = 'DAEGU',
  ULSAN = 'ULSAN',
  SEJONG = 'SEJONG',
  GWANGJU = 'GWANGJU',
  GANGWONDO = 'GANGWON-DO',
  CHUNGCHEONGBUKDO = 'CHUNGCHEONGBUKDO',
  CHUNGCHEONGNAMDO = 'CHUNGCHEONGNAMDO',
  GYEONGSANGBUKDO = 'GYEONGSANGBUKDO',
  GYEONGSANGNAMDO = 'GYEONGSANGNAMDO',
  JEOLLABUKDO = 'JEOLLABUKDO',
  JEOLLANAMDO = 'JEOLLANAMDO',
  JEJU = 'JEJU'
}

export const cityOpt: ISelectOptions[] = [
  { value: ECity.SEOUL, label: '서울시', color: 'black' },
  { value: ECity.GYEONGGIDO, label: '경기도', color: 'black' },
  { value: ECity.INCHEON, label: '인천시', color: 'black' },
  { value: ECity.BUSAN, label: '부산시', color: 'black' },
  { value: ECity.DAEJEON, label: '대전시', color: 'black' },
  { value: ECity.DAEGU, label: '대구시', color: 'black' },
  { value: ECity.ULSAN, label: '울산시', color: 'black' },
  { value: ECity.SEJONG, label: '세종시', color: 'black' },
  { value: ECity.GWANGJU, label: '광주시', color: 'black' },
  { value: ECity.GANGWONDO, label: '강원도', color: 'black' },
  { value: ECity.CHUNGCHEONGBUKDO, label: '충청북도', color: 'black' },
  { value: ECity.CHUNGCHEONGNAMDO, label: '충청남도', color: 'black' },
  { value: ECity.GYEONGSANGBUKDO, label: '경상북도', color: 'black' },
  { value: ECity.GYEONGSANGNAMDO, label: '경상남도', color: 'black' },
  { value: ECity.JEOLLABUKDO, label: '전라북도', color: 'black' },
  { value: ECity.JEOLLANAMDO, label: '전라남도', color: 'black' },
  { value: ECity.JEJU, label: '제주도', color: 'black' }
];

export enum ECategory {
  LPR = 'LPR',
  BREAKER = 'BREAKER',
  DISPLAY = 'DISPLAY',
  PAYSTATION = 'PAYSTATION'
}

export const categoryOpt: ISelectOptions[] = [
  { value: ECategory.LPR, label: 'LPR', color: 'black' },
  { value: ECategory.BREAKER, label: '차단기', color: 'blue' },
  { value: ECategory.DISPLAY, label: '전광판', color: 'green' },
  { value: ECategory.PAYSTATION, label: '정산기', color: 'navy' }
];

export enum EGateType {
  IN = 'IN',
  OUT = 'OUT',
  INOUT = 'IN-OUT'
}

export const gateTypeOpt: ISelectOptions[] = [
  { value: EGateType.IN, label: '입구전용', color: 'black' },
  { value: EGateType.OUT, label: '출구전용', color: 'blue' },
  { value: EGateType.INOUT, label: '입출구', color: 'green' }
];

export enum EBreakerStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  UNLOCK = 'UNLOCK',
  LOCK = 'LOCK',
  XUPLOCK = 'XUPLOCK',
  NONE = 'NONE'
}

export const breakerStatusOpt: ISelectOptions[] = [
  { value: EBreakerStatus.UP, label: '열림', color: 'blue' },
  { value: EBreakerStatus.LOCK, label: '열림고정', color: 'yellow' },
  { value: EBreakerStatus.UNLOCK, label: '고정해제', color: 'cyan' },
  { value: EBreakerStatus.DOWN, label: '닫힘', color: 'magenta' },
  { value: EBreakerStatus.XUPLOCK, label: '열림고정(수동)', color: 'gray' },
  { value: EBreakerStatus.NONE, label: 'NONE', color: 'gray' }
];

export enum ERemoteTool {
  ANYDESK = 'ANYDESK',
  TEAMVIEWER = 'TEAMVIEWER',
  NONE = 'NONE'
}

export const remoteToolOpt: ISelectOptions[] = [
  { value: ERemoteTool.ANYDESK, label: '애니데스크', color: 'black' },
  { value: ERemoteTool.TEAMVIEWER, label: '팀뷰어', color: 'black' },
  { value: ERemoteTool.NONE, label: '없음', color: 'red' }
];

export enum EVehicleType {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export const vehicleTypeOpt: ISelectOptions[] = [
  { value: EVehicleType.SMALL, label: '소형', color: 'black' },
  { value: EVehicleType.MEDIUM, label: '중형', color: 'black' },
  { value: EVehicleType.LARGE, label: '대형', color: 'black' }
];

export enum ETicketType {
  NORMAL = 'NORMAL',
  SEASONTICKET = 'SEASONTICKET',
  FREETICKET = 'FREETICKET',
  VISITTICKET = 'VISITTICKET',
  UNRECOGNIZED = 'UNRECOGNIZED',
  DISCOUNT = 'DISCOUNT'
}

export const ticketTypeOpt: ISelectOptions[] = [
  { value: ETicketType.SEASONTICKET, label: '정기권', color: 'black' },
  { value: ETicketType.FREETICKET, label: '무료주차권', color: 'black' },
  { value: ETicketType.VISITTICKET, label: '방문권', color: 'black' },
  { value: ETicketType.NORMAL, label: '일반차량', color: 'black' },
  { value: ETicketType.UNRECOGNIZED, label: '미인식', color: 'red' },
  { value: ETicketType.DISCOUNT, label: '미인식', color: 'red' }
];

export enum ETicketSearchDateType {
  EFFECT = 'EFFECT',
  EXPIRE = 'EXPIRE',
  VALIDATE = 'VALIDATE'
}

export const ticketSearchDateTypeOpt: ISelectOptions[] = [
  { value: ETicketSearchDateType.EFFECT, label: '시작일', color: 'black' },
  { value: ETicketSearchDateType.EXPIRE, label: '종료일', color: 'black' },
  { value: ETicketSearchDateType.VALIDATE, label: '사용가능', color: 'black' }
];

export enum EInoutType {
  IN = 'IN',
  OUT = 'OUT'
}

export const inoutSearchDateTypeOpt: ISelectOptions[] = [
  { value: EInoutType.IN, label: '입차', color: 'black' },
  { value: EInoutType.OUT, label: '출차', color: 'black' }
];

export enum EDiscountType {
  DISCOUNT = 'DISCOUNT',
  REDUCTION = 'REDUCTION'
}

export const discountTypeOpt: ISelectOptions[] = [
  { value: EDiscountType.DISCOUNT, label: '할인', color: 'black' },
  { value: EDiscountType.REDUCTION, label: '감면', color: 'black' }
];

export enum EDiscountApplyType {
  TIME = 'TIME',
  WON = 'WON',
  PERCENT = 'PERCENT'
}

export const discountApplyTypeOpt: ISelectOptions[] = [
  { value: EDiscountApplyType.TIME, label: '시간', color: 'black' },
  { value: EDiscountApplyType.WON, label: '원', color: 'black' },
  { value: EDiscountApplyType.PERCENT, label: '%', color: 'black' }
];

export enum EDayRangeType {
  ALL = 'ALL',
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND'
}

export const dayRangeTypeOpt: ISelectOptions[] = [
  { value: EDayRangeType.ALL, label: '전체', color: 'black' },
  { value: EDayRangeType.WEEKDAY, label: '주중', color: 'black' },
  { value: EDayRangeType.WEEKEND, label: '주말', color: 'black' }
];

export enum EPayType {
  PAID = 'PAID',
  FREE = 'FREE'
}

export const payTypeOpt: ISelectOptions[] = [
  { value: EPayType.PAID, label: '유료', color: 'black' },
  { value: EPayType.FREE, label: '무료', color: 'black' }
];

export enum EGateActionType {
  PCC = 'PCC',
  GATE = 'GATE'
}

export const gateActionTypeOpt: ISelectOptions[] = [
  { value: EGateActionType.PCC, label: 'PCC', color: 'black' },
  { value: EGateActionType.GATE, label: 'GATE', color: 'black' }
];

export enum EGateOpenActionType {
  NONE = 'NONE',
  RECOGNITION = 'RECOGNITION',
  RESTRICT = 'RESTRICT'
}

export const gateOpenActionTypeOpt: ISelectOptions[] = [
  { value: EGateOpenActionType.NONE, label: '모두허용', color: 'black' },
  { value: EGateOpenActionType.RECOGNITION, label: '인식차량허용', color: 'black' },
  { value: EGateOpenActionType.RESTRICT, label: '등록차량허용', color: 'black' }
];

export enum EMessageClassType {
  IN = 'IN',
  OUT = 'OUT',
  WAIT = 'WAIT'
}

export const messageClassTypeOpt: ISelectOptions[] = [
  { value: EMessageClassType.IN, label: '입차', color: 'black' },
  { value: EMessageClassType.OUT, label: '출차', color: 'black' },
  { value: EMessageClassType.WAIT, label: '정산', color: 'black' }
];

export enum EMessageTypeType {
  NONMEMBER = 'NONMEMBER',
  MEMBER = 'MEMBER',
  CALL = 'CALL',
  RESTRICTE = 'RESTRICTE',
  FAILNUMBER = 'FAILNUMBER',
  INIT = 'INIT',
  FULL = 'FULL',
  VIP = 'VIP'
}

export const messageTypeTypeOpt: ISelectOptions[] = [
  { value: EMessageTypeType.INIT, label: '리셋', color: 'black' },
  { value: EMessageTypeType.NONMEMBER, label: '일반차량', color: 'black' },
  { value: EMessageTypeType.MEMBER, label: '티맵회원', color: 'black' },
  { value: EMessageTypeType.VIP, label: '정기권', color: 'black' },
  { value: EMessageTypeType.CALL, label: '호출', color: 'black' },
  { value: EMessageTypeType.RESTRICTE, label: '입차제한차량', color: 'black' },
  { value: EMessageTypeType.FAILNUMBER, label: '번호인식실패', color: 'black' },
  { value: EMessageTypeType.FULL, label: '만차', color: 'black' }
];
