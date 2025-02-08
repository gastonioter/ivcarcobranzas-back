const loadPDFRenderer = async () => {
  const pdfRenderer = await import("@react-pdf/renderer");
  return pdfRenderer;
};

export const MyDocument = async (name: string) => {
  const { Page, Text, View, Document, StyleSheet } = await loadPDFRenderer();

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: 20,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20,
    },
    content: {
      fontSize: 12,
      textAlign: "justify",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Hola, {name}!</Text>
          <Text style={styles.content}>
            Este es un documento PDF generado dinámicamente usando react-pdf en
            un backend de Node.js.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
