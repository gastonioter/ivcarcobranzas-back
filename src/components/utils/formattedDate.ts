export const formattedDate = (ISODate: string, short = false) => {
  const date = new Date(ISODate).toLocaleString("es-ES", {
    dateStyle: `${short ? "short" : "medium"}`,
    timeZone: "America/Argentina/Buenos_Aires",
  });
  return date.toUpperCase();
};
