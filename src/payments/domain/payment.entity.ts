
export interface PaymentEntity {
  uuid: string;
  customer: string;
  detail: PaymentDetailItem[];
  createdAt: Date;
}

export interface PaymentDetailItem {
  amount: number;
  month: number;
  year: number;
}
