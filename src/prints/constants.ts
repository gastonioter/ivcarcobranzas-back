import path from "path";

const imgsrc = path.resolve(process.cwd(), "assets", "logo-azul.png");

export const companyInfo = {
  logo: imgsrc,
  name: "IVCAR ALARMAS",
  iva: "I.V.A: Resp Inscripto",
  razonSocial: "Razon Social: Osvaldo Norberto Castro ",
  address: "Domicilio Fiscal: Laboulaye, Cordoba - España 252",
  contact: {
    web: "www.ivcaralarmas.com",
    phone: "3385448580",
    email: "alarmasivcar@hotmail.com",
  },
};
