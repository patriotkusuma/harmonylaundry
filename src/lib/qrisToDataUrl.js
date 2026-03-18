import QRCode from "qrcode";

export async function qrisStringToDataUrl(qrisString) {
  if (!qrisString) return null;

  return await QRCode.toDataURL(qrisString, {
    errorCorrectionLevel: "M",
    width: 380,
    margin: 1,
  });
}
