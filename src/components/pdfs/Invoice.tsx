const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

interface InvoiceProps {
  company: {
    name: string;

    razonSocial: string;
    iva: string;
    logo: string;
    address: string;
    contact: {
      phone: string;
      email: string;
      web: string;
    };
  };
  client: {
    name: string;
    email: string;
    phone: string;
  };
  saleDetails: {
    description: string;
    quantity: number;
    price: number;
    total: number;
  }[];

  venta: {
    id: string;
    date: string;
    serie: string;
  };
}

export const Invoice = async ({
  company,
  client,
  saleDetails,
  venta,
}: InvoiceProps) => {
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
      borderBottom: "1px solid #a9a9a9",
      marginBottom: 20,
      width: "50%",
    },

    /* ************* */

    customerSection: {
      padding: 5,
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
    table: {
      marginTop: 10,
      marginBottom: 20,
      width: "100%",
      borderBottom: "1px solid #000",
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "5px 0",
      borderBottom: "1px solid #ddd",
    },
    tableHeaderRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "5px 0",
      fontWeight: "extrabold",
      textTransform: "uppercase",
    },
    tableCell: {
      width: "25%",
      fontSize: 12,
      textAlign: "left",
      paddingLeft: 5,
    },
    totalSection: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 15,
    },
    footer: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 10,
      color: "#888",
      fontStyle: "italic",
    },
  });

  const footerStyles = StyleSheet.create({});

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
      alignItems: "flex-end",
      flexDirection: "column",
      gap: 4,
      fontWeight: 900,
    },
  });

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {/* HeaderContainer  */}
        <View style={styles.headerContainer}>
          <Image
            src="https://ivcaralarmas.com/public/img/logo.png"
            style={styles.logo}
          />
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
            <Text style={styles.tipoComprobanteText}>NOTA DE VENTA</Text>
            {/* <Text style={{ marginBottom: 2 }}>Venta ID: {venta.id}</Text> */}
            <Text style={{ marginBottom: 2 }}>Nro: {venta.serie}</Text>
            <Text>Fecha: {venta.date}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        {/* Datos del Cliente */}
        <View style={styles.customerSection}>
          <Text style={styles.text}>Cliente: {client.name}</Text>
          <Text style={styles.text}>Teléfono: {client.phone}</Text>
          <Text style={styles.text}>Email: {client.email}</Text>
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
          {saleDetails.map((item, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{item.description}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  ${item.total.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* Totals Section */}
        <View style={tableStyles.summary}>
          <Text>Subtotal: $1200</Text>
          <Text>IVA (21%): $252</Text>
          <Text>Total: $1452</Text>
        </View>
        {/* Mensaje de Agradecimiento */}
        <Text style={styles.footer}>
          Este documento no representa un comprobante de pago. Para cualquier
          duda, contáctenos.
        </Text>
      </Page>
    </Document>
  );
};
