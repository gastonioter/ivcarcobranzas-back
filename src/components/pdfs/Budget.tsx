const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

interface BudgetProps {
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

  budget: {
    id: string;
    date: string;
    serie: string;
  };
}

// Datos de ejemplo
const data = [
  {
    cantidad: 1,
    descripcion: "Laptop HP EliteBook",
    precioUnitario: 1200,
    total: 1200,
  },
  {
    cantidad: 2,
    descripcion: "Mouse Inalámbrico",
    precioUnitario: 25,
    total: 50,
  },
  {
    cantidad: 3,
    descripcion: "Teclado Mecánico",
    precioUnitario: 80,
    total: 240,
  },
];
export const Budget = async ({
  company,
  client,

  budget,
}: BudgetProps) => {
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
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    footer: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 10,
      color: "#888",
      fontStyle: "italic",
    },
  });

  const aclarationsStyles = StyleSheet.create({
    section: {
      marginTop: 20,
      fontSize: 8,
      color: "#404040",
      fontStyle: "italic",
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid #a2a2a2",
      bordertop: "1px solid #888",
    },

    box: {
      padding: 10,
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: 10,
      marginBottom: 4,
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
            <Text style={styles.tipoComprobanteText}>PRESUPUESTO</Text>
            <Text style={{ marginBottom: 2 }}>Nro: {budget.serie}</Text>
            <Text>Fecha: {budget.date}</Text>
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
          {data.map((item, index) => (
            <View style={tableStyles.tableRow} key={index}>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{item.cantidad}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>{item.descripcion}</Text>
              </View>
              <View style={tableStyles.tableCol}>
                <Text style={tableStyles.tableCell}>
                  ${item.precioUnitario.toFixed(2)}
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
