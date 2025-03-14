import {
  AccountSummary,
  SummaryDetail,
} from "@/customer/domain/customer.entity";
import { PrintableTransaction } from "@/prints/types";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";

const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

type PrintableSummary = Omit<
  PrintableTransaction,
  "details" | "transaction"
> & {
  details: SummaryDetail[];
  summary: Omit<AccountSummary, "details">;
};
export const AccountSummaryCmp = async ({
  company,
  customer,
  details,
  summary,
}: PrintableSummary) => {
  const { Document, Page, Text, View, StyleSheet, Image } =
    await loadPDFRenderer();

  const { uuid = "" } = customer;
  const accountId = uuid.split("-")[0];
  const { debe, haber, saldo } = summary;
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
      alignItems: "flex-start",
    },
    logo: {
      marginLeft: 2,
      width: 65,
      height: 56,
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
      borderBottom: "1px solid #a9a9a9",
      marginBottom: 20,
      width: "55%",
    },

    /* ************* */

    customerSection: {
      padding: 5,
    },
    customerTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 2,
    },
    footer: {
      textAlign: "center",
      fontSize: 10,
      color: "#888",
      fontStyle: "italic",
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

  const tableStyles = StyleSheet.create({
    table: {
      width: "100%",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#383838",
      borderBottom: "1px solid #1d1d1d",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderBottom: "1px solid #383838",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#000",
      color: "#fff",
      backgroundColor: "#0A3B9C",
      padding: 5,
    },
    tableCol: {
      width: "25%",
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#383838",
      padding: 5,
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: "extrabold",
      textTransform: "uppercase",
      textAlign: "center",
    },
    tableCell: {
      fontSize: 10,
      textAlign: "center",
    },

    summary: {
      padding: 5,

      color: "#000",
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 6,
    },
    summaryItem: {
      fontWeight: "bold",
      padding: 5,
      textAlign: "center",
      border: "1px solid #383838",
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
            <Text style={styles.tipoComprobanteText}>RESUMEN DE CUENTA</Text>
            <Text style={{ marginBottom: 2 }}>
              ID CUENTA: {accountId.toUpperCase()}
            </Text>
            <Text>A la fecha: {formattedDate(new Date().toISOString())}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        {/* Datos del Cliente */}
        <View style={styles.customerSection}>
          <Text style={styles.text}>
            CLIENTE: {customer.firstName.toUpperCase()}{" "}
            {customer.lastName.toUpperCase()}
          </Text>

          <Text style={styles.text}>CELULAR: {customer.phone}</Text>
          <Text style={styles.text}>EMAIL: {customer.email}</Text>
        </View>
        {/* Detalle de la Venta */}
        <View style={tableStyles.table}>
          {/* Encabezado de la tabla */}
          <View style={tableStyles.tableRow}>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Fecha</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Concepto</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Debe</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Haber</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Saldo</Text>
            </View>
          </View>

          {/* Filas de la tabla */}
          {details.map((item, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedDate(item.date.toISOString(), true)}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {item.saleSerie.toUpperCase()}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.debe)}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.haber)}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.saldo)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* Totals Section */}
        <View style={tableStyles.summary}>
          <Text style={tableStyles.summaryItem}>
            TOTAL DEBE: {formattedCurrency(debe)}
          </Text>
          <Text style={tableStyles.summaryItem}>
            TOTAL HABER:
            {formattedCurrency(haber)}
          </Text>
          <Text style={{ ...tableStyles.summaryItem, flexBasis: "50%" }}>
            SALDO: {formattedCurrency(saldo)}
          </Text>
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
          Estamos a su disposición para cualquier consulta o ajuste que
          necesite. Para confirmar su aceptación, por favor comuníquese con
          nosotros. ¡Gracias por elegirnos!
        </Text>
      </Page>
    </Document>
  );
};
