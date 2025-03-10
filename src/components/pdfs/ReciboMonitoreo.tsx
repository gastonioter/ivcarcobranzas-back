import { Cuota } from "@/cuota/domain/cuota.entity";
import { PrintableTransaction } from "@/prints/types";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";

const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

type PrintableMonitoreoSummary = Omit<
  PrintableTransaction,
  "details" | "transaction"
> & {
  cuotas: Cuota[];
  reciboData: {
    createdAt: string;
    serie: string;
    totalAmount: number;
  };
  cuotasPtes: Cuota[];
};
export const ReciboMonitoreo = async ({
  company,
  customer,
  cuotas,
  reciboData,
  cuotasPtes,
}: PrintableMonitoreoSummary) => {
  const { Document, Page, Text, View, StyleSheet, Image } =
    await loadPDFRenderer();

  const { uuid = "" } = customer;
  const accountId = uuid.split("-")[0];
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
      fontSize: 11,
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
      borderBottom: "1px solid #cacaca",
    },

    tableColHeader: {
      width: "33.33%",
      //   borderBottom: "1px solid #383838",
      //   borderStyle: "solid",
      //   borderWidth: 1,
      //   borderColor: "#000",
      color: "#fff",
      backgroundColor: "#0A3B9C",
      padding: 5,
    },

    tableCol: {
      width: "33.33%",
      //   borderStyle: "solid",
      //   borderWidth: 1,
      //   borderColor: "#383838",
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
    tableColSummary: {},
    tableColHeaderSummary: {},

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
            <Text style={styles.tipoComprobanteText}>RECIBO</Text>
            <Text style={{ marginBottom: 2 }}>NRO: {reciboData.serie}</Text>
            <Text>FECHA: {formattedDate(reciboData.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        {/* Datos del Cliente */}
        <View style={styles.customerSection}>
          <Text
            style={{
              backgroundColor: "#0A3B9C",
              color: "#FFF",
              padding: 2,
              marginBottom: 3,
            }}
          >
            Datos del cliente
          </Text>
          <Text style={{ ...styles.text }}>
            Nombre: {customer.firstName.toUpperCase()}{" "}
            {customer.lastName.toUpperCase()}
          </Text>

          <Text style={styles.text}>Celular: {customer.phone}</Text>
          <Text style={styles.text}>Email: {customer.email}</Text>
        </View>
        {/* Detalle de la Venta */}
        <View style={tableStyles.table}>
          {/* Encabezado de la tabla */}
          <View style={tableStyles.tableRow}>
            <View style={{ ...tableStyles.tableColHeader, width: "10%" }}>
              <Text style={tableStyles.tableCellHeader}>#</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Concepto</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Monto</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Total Recibido</Text>
            </View>
          </View>

          {/* Filas de la tabla */}
          {cuotas.map((item, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={{ ...tableStyles.tableCol, width: "10%" }}>
                <Text style={tableStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {`CUOTA - ${String(item.getMonth()).padStart(2, "0")}/${item.getYear()}`}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.getAmount())}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}></Text>
              </View>
            </View>
          ))}
          <View style={tableStyles.tableRow}>
            <View style={{ ...tableStyles.tableCol, width: "10%" }}>
              <Text style={tableStyles.tableCell}></Text>
            </View>
            <View style={tableStyles.tableCol}>
              <Text style={tableStyles.tableCell}></Text>
            </View>
            <View style={tableStyles.tableCol}>
              <Text style={tableStyles.tableCell}></Text>
            </View>
            <View style={tableStyles.tableCol}>
              <Text
                style={{
                  ...tableStyles.tableCell,
                  fontWeight: 900,
                  fontSize: 18,
                  padding: 2,
                }}
              >
                {formattedCurrency(reciboData.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* Cuotas pendientes de pago */}
        {cuotasPtes.length > 0 && (
          <View style={{ marginTop: "auto" }}>
            <Text>
              Usted tiene {cuotasPtes.length} cuota(s) pendiente(s) de pago
            </Text>
            <View style={tableStyles.table}>
              {/* Encabezado de la tabla */}
              <View style={tableStyles.tableRow}>
                <View style={{ ...tableStyles.tableColHeader, width: "10%" }}>
                  <Text style={tableStyles.tableCellHeader}>#</Text>
                </View>
                <View style={tableStyles.tableColHeader}>
                  <Text style={tableStyles.tableCellHeader}>Concepto</Text>
                </View>
                <View style={tableStyles.tableColHeader}>
                  <Text style={tableStyles.tableCellHeader}>Monto</Text>
                </View>
                <View style={tableStyles.tableColHeader}>
                  <Text style={tableStyles.tableCellHeader}>Debe Total</Text>
                </View>
              </View>

              {/* Filas de la tabla */}
              {cuotasPtes.map((item, index) => (
                <View style={tableStyles.tableRow} key={index}>
                  <View style={{ ...tableStyles.tableCol, width: "10%" }}>
                    <Text style={tableStyles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={tableStyles.tableCol}>
                    <Text style={tableStyles.tableCell}>
                      {`CUOTA - ${String(item.getMonth()).padStart(2, "0")}/${item.getYear()}`}
                    </Text>
                  </View>
                  <View style={tableStyles.tableCol}>
                    <Text style={tableStyles.tableCell}>
                      {formattedCurrency(item.getAmount())}
                    </Text>
                  </View>
                  <View style={tableStyles.tableCol}>
                    <Text style={tableStyles.tableCell}></Text>
                  </View>
                </View>
              ))}
              <View style={tableStyles.tableRow}>
                <View style={{ ...tableStyles.tableCol, width: "10%" }}>
                  <Text style={tableStyles.tableCell}></Text>
                </View>
                <View style={tableStyles.tableCol}>
                  <Text style={tableStyles.tableCell}></Text>
                </View>
                <View style={tableStyles.tableCol}>
                  <Text style={tableStyles.tableCell}></Text>
                </View>
                <View style={tableStyles.tableCol}>
                  <Text
                    style={{
                      ...tableStyles.tableCell,
                      fontWeight: 900,
                      fontSize: 18,
                      padding: 2,
                    }}
                  >
                    {formattedCurrency(reciboData.totalAmount)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            ...aclarationsStyles.section,
            marginTop: `${cuotasPtes.length === 0 ? "auto" : "10px"}`,
          }}
        >
          <View style={aclarationsStyles.box}>
            <Text style={aclarationsStyles.title}>Contacto</Text>
            <Text style={aclarationsStyles.text}>alarmasivcar@hotmail.com</Text>
            <Text style={aclarationsStyles.text}>3385448583</Text>
            <Text style={aclarationsStyles.text}>www.ivcaralarmas.com</Text>
          </View>
        </View>
        {/* Mensaje de Agradecimiento */}
        <Text style={styles.footer}>Gracias por elegirnos!</Text>
      </Page>
    </Document>
  );
};
