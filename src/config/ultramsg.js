// const ultramsg = require("ultramsg-whatsapp-api");
// const base64 = require("../shared/utils/base64");
// const { readFileSync } = require("fs");
// const path = require("path");
// const instance_id = process.env.WPP_API_INSTANCE_ID;
// const ultramsg_token = process.env.WPP_API_TOKEN;
// const api = new ultramsg(instance_id, ultramsg_token);
// (async function () {
//   var to = 3385448583;
//   var filename = "docuemnt.pdf";
//   const file = readFileSync(
//     path.resolve(`${__dirname}/../../temp/doc-1738967090421.pdf`),
//   );
//   var document = Buffer.from(file).toString("base64");
//   const response = await api.sendDocumentMessage(to, filename, document);
//   console.log(response);
// })();
