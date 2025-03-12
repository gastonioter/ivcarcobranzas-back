// For sales and budgets:
export interface PrintableTransaction {
  company: CompanyInfo;
  customer: CustomerInfo;
  transaction: TransactionInfo;
  details: SaleDetailItem[];
}

export interface PrintableAccountSummary {
  company: CompanyInfo;
  customer: CustomerInfo;
  detalis: AccountSummaryItem[];
  transaction: TransactionInfo;
}

type CompanyInfo = {
  logo: string;
  name: string;
  iva: string;
  razonSocial: string;
  address: string;
  contact: ContactInfo;
};
type ContactInfo = {
  web: string;
  phone: string;
  email: string;
};

type TransactionInfo = {
  date: string;
  id: string;
  iva: number;
  total: number;
  subtotal: number;
};

type CustomerInfo = {
  uuid?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type SaleDetailItem = {
  quantity: number;
  description: string;
  price: number;
  total: number;
};

type AccountSummaryItem = {
  date: string;
  concepto: string;
  debe: number;
  haber: number;
  saldo: number;
};
