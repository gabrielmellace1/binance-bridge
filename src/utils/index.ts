import crypto from "crypto";

export const randomString = (): string =>
  crypto.randomBytes(32).toString("hex").substring(0, 32);


  export const hashSignature = (queryString: string , secret: string): string => {
    return crypto.createHmac("sha512", secret).update(queryString).digest("hex");
  };