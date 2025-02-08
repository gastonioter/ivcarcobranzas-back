export const base64 = (data: string | Buffer<ArrayBufferLike>) =>
  Buffer.from(data).toString("base64");
