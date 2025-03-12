import { PrintableTransaction } from "@/prints/types";
import { formattedCurrency } from "../utils/formattedCurrency";
import { formattedDate } from "../utils/formattedDate";
import { formattedFullname } from "../utils/formattedFullname";

const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

export const Budget = async ({
  company,
  customer,
  details,
  transaction,
}: PrintableTransaction) => {
  const { Document, Page, Text, View, StyleSheet, Image } =
    await loadPDFRenderer();
  console.log(
    formattedFullname(customer.firstName, customer.lastName),
    formattedCurrency(details[0].price),
  );

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
      borderBottom: "1px solid #a9a9a9",
      marginBottom: 20,
      width: "50%",
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
      borderTop: "1px solid #1d1d1d",
      padding: 5,
      color: "#000",
      marginTop: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      gap: 4,
    },
    summaryItem: {
      fontWeight: "bold",
      padding: 5,
      textAlign: "center",
      width: "25%",
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
            <Text style={styles.tipoComprobanteText}>PRESUPUESTO</Text>
            <Text style={{ marginBottom: 2 }}>ID: {transaction.id}</Text>
            <Text>Fecha: {formattedDate(transaction.date)}</Text>
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
              <Text style={tableStyles.tableCellHeader}>Cantidad</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Descripción</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Precio Unitario</Text>
            </View>
            <View style={tableStyles.tableColHeader}>
              <Text style={tableStyles.tableCellHeader}>Total</Text>
            </View>
          </View>

          {/* Filas de la tabla */}
          {details.map((item, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {item.description.toUpperCase()}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.price)}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  {formattedCurrency(item.total)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* Totals Section */}
        <View style={tableStyles.summary}>
          <Text style={tableStyles.summaryItem}>
            Subtotal: {formattedCurrency(transaction.subtotal)}
          </Text>
          <Text style={tableStyles.summaryItem}>
            IVA ({transaction.iva}):
            {formattedCurrency((transaction.subtotal * transaction.iva) / 100)}
          </Text>
          <Text style={{ ...tableStyles.summaryItem, width: "50.5%" }}>
            Total: {formattedCurrency(transaction.total)}
          </Text>
        </View>

        <View style={aclarationsStyles.section}>
          <View style={aclarationsStyles.box}>
            <Text style={aclarationsStyles.title}>Formas de Pago</Text>
            <Text style={aclarationsStyles.text}>Pago en efectivo</Text>
            <Text style={aclarationsStyles.text}>Transferencia bancaria</Text>
            <Text style={aclarationsStyles.text}>
              Pago con QR o billetera virtual
            </Text>
          </View>
          <View style={aclarationsStyles.box}>
            <Text style={aclarationsStyles.title}>Aclaraciones</Text>
            <View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Text style={aclarationsStyles.text}>
                <Text style={{ textDecoration: "underline" }}>
                  Tiempo de entrega
                </Text>
                : "El plazo estimado de entrega es de [X] días hábiles desde la
                confirmación del pago."
              </Text>
              <Text style={aclarationsStyles.text}>
                <Text style={{ textDecoration: "underline" }}>
                  Costos de envío:
                </Text>
                "El envío dentro de [zona] es sin cargo. Para otras localidades,
                consulte costos adicionales."
              </Text>
              <Text style={aclarationsStyles.text}>
                "Todos nuestros productos/servicios cuentan con una garantía de
                [X] meses/años contra defectos de fabricación."
              </Text>
              <Text style={aclarationsStyles.text}>
                <Text style={{ textDecoration: "underline" }}>
                  Seña o anticipo:
                </Text>
                "Para confirmar el pedido, se requiere un anticipo del [X]%. El
                saldo se abonará antes de la entrega."
              </Text>
            </View>
          </View>
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
          nosotros. Gracias por elegirnos!.
        </Text>
      </Page>
    </Document>
  );
};
