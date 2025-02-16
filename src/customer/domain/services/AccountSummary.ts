import { Sale } from "../../../transaction/sale/domain/sale.entity";
import { SummaryDetail } from "../customer.entity";

export const getCustomerSummaryAccount = async (sales: Sale[]) => {
  if (!sales.length) {
    return {
      debe: 0,
      haber: 0,
      saldo: 0,
      details: [],
    };
  }
  const summaryDetails: SummaryDetail[] = sales.map((sale) => {
    const detail: SummaryDetail = {
      date: sale.getCreatedAt(),
      saleId: sale.getId(),
      saleSerie: sale.getSerie(),
      debe: sale.getTotalAmount(),
      haber: sale.getTotalPaid(),
      saldo: sale.getTotalAmount() - sale.getTotalPaid(),
    };
    return detail;
  });
  const reducedSummary = summaryDetails.reduce((acc, detail) => {
    return {
      debe: acc.debe + detail.debe,
      haber: acc.haber + detail.haber,
      saldo: acc.saldo + detail.saldo,
    } as SummaryDetail;
  });

  return {
    ...reducedSummary,
    details: summaryDetails,
  };
};
