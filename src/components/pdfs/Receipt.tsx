import { PrintableTransaction } from "@/prints/types";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";

const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

interface RecieptProps {
  receipt: {
    id: string;
    date: string;
    amount: number;
    method: string;
    saleNumer: string;
  };
  saleSummary: {
    debe: number;
    haber: number;
    saldo: number;
  };
}

type PrintableRecipt = Omit<PrintableTransaction, "details" | "transaction"> &
  RecieptProps;

export const Reciept = async ({
  company,
  customer,
  receipt,
  saleSummary,
}: PrintableRecipt) => {
  const { Document, Page, Text, View, StyleSheet, Image } =
    await loadPDFRenderer();

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      color: "#1d1d1d",
      fontSize: 12,
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    logo: {
      width: 60,
      height: 60,
      objectFit: "cover",
    },
    companyContainer: {
      flex: 2,
    },
    companyName: {
      color: "#232323",
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 5,
      letterSpacing: "1px",
    },
    companyDescriptionText: {
      color: "#6c6c6c",
      fontWeight: "light",
      marginBottom: 3,
      fontSize: 8,
    },
    tipoComprobanteContainer: {
      // marginLeft: "auto",
      border: "3px solid #8e8e8e",
      padding: 15,
      fontSize: 12,
      flex: 1,
    },
    tipoComprobanteText: {
      fontSize: 18,
      marginBottom: 4,
      fontWeight: "bold",
    },
    divider: {
      marginVertical: 10,
      width: "50%",
      borderBottom: "1px solid #a9a9a9",
    },

    /* ************* */

    customerSection: {
      paddingVertical: 5,
    },
    totals: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
      fontSize: 10,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },

    footer: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 10,
      color: "#888",
      fontStyle: "italic",
    },
  });

  const tableStyles = StyleSheet.create({
    table: {
      display: "flex",
      gap: 2,
      marginTop: 10,
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#383838",
    },
    tableRow: {
      flexDirection: "row",
      // borderBottom: "1px solid #3d3d3d",
      // borderWidth: "60px",
    },
    tableColHeader: {
      width: "60px",
      marginBottom: 2,
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#000",
      color: "#fff",
      backgroundColor: "#2c4d8d",
      padding: 5,
    },
    tableCol: {
      width: "150px",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#383838",
      marginBottom: 2,
      backgroundColor: "#aaaaaa",
      padding: 5,
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: "extrabold",
      textTransform: "uppercase",
      textAlign: "center",
    },
    tableCell: {
      fontSize: 12,
      textAlign: "center",
      fontWeight: "black",
    },
  });

  const aclarationsStyles = StyleSheet.create({
    section: {
      marginTop: "auto",
      fontSize: 8,
      color: "#404040",
      fontStyle: "italic",
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #a2a2a2",
      bordertop: "1px solid #888",
    },

    box: {
      padding: 10,
      gap: 2,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    title: {
      fontSize: 10,
      padding: 3,
      backgroundColor: "#bbbbbb",
    },
    text: {
      fontSize: 8,
      fontWeight: "light",
    },
  });

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {/* HeaderContainer  */}
        <View style={styles.headerContainer}>
          <Image src={company.logo} style={styles.logo} />
          <View style={styles.companyContainer}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyDescriptionText}>{company.address}</Text>
            <Text style={styles.companyDescriptionText}>
              {company.razonSocial}
            </Text>
            <Text style={styles.companyDescriptionText}>{company.iva}</Text>
          </View>

          {/* Datos del Recibo (ID, Fecha, etc.) */}
          <View style={styles.tipoComprobanteContainer}>
            <Text style={styles.tipoComprobanteText}>RECIBO</Text>
            <Text style={{ marginBottom: 2 }}>ID VTA: {receipt.saleNumer}</Text>

            <Text>Fecha: {formattedDate(receipt.date)}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        {/* Datos del Cliente */}
        <View style={styles.customerSection}>
          <Text style={styles.sectionTitle}>
            Recibido de:{" "}
            {customer.firstName.toUpperCase() +
              " " +
              customer.lastName.toUpperCase()}
          </Text>
          <Text style={styles.text}>Teléfono: {customer.phone}</Text>
          <Text style={styles.text}>Email: {customer.email}</Text>
        </View>

        {/* Informacion del Pago */}
        <View>
          <Text>Monto pagado: {formattedCurrency(receipt.amount)}</Text>
          <Text>Metodo de pago: {receipt.method.toUpperCase()}</Text>
        </View>

        <View style={styles.divider}></View>
        <View>
          <Text style={styles.text}>Resumen de venta a la fecha:</Text>
        </View>
        {/* Resumen de Venta */}
        <View style={{ display: "flex", gap: 10 }}>
          <View style={tableStyles.table}>
            {/* DEBE */}
            <View style={tableStyles.tableRow}>
              <View style={tableStyles.tableColHeader}>
                <Text style={tableStyles.tableCellHeader}>Debe</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(saleSummary.debe)}
                </Text>
              </View>
            </View>
            {/* HABER */}
            <View style={tableStyles.tableRow}>
              <View style={tableStyles.tableColHeader}>
                <Text style={tableStyles.tableCellHeader}>Haber</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(saleSummary.haber)}
                </Text>
              </View>
            </View>
            {/* SALDO */}
            <View style={tableStyles.tableRow}>
              <View style={tableStyles.tableColHeader}>
                <Text style={tableStyles.tableCellHeader}>Saldo</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(saleSummary.saldo)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={aclarationsStyles.section}>
          <View style={aclarationsStyles.box}>
            <Text style={aclarationsStyles.title}>Contacto</Text>
            <Text style={aclarationsStyles.text}>alarmasivcar@hotmail.com</Text>
            <Text style={aclarationsStyles.text}>3385448583</Text>
            <Text style={aclarationsStyles.text}>www.ivcaralarmas.com</Text>
          </View>
        </View>

        {/* Mensaje de Agradecimiento */}
        <Text style={styles.footer}>
          ¡Gracias por elegirnos! Para cualquier duda, contáctenos al
          3385448580.
        </Text>
      </Page>
    </Document>
  );
};
