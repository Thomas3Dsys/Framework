import { createHash } from "crypto";

export class OpenShopCryptography {
   static generateHashedPassword(plainTextPassword: string, salt: string  ): string {
    return this.generateSHA1( salt + this.generateSHA1(salt + this.generateSHA1(plainTextPassword)),
    );
  }

  static generateSHA1(input: string): string {
    const hash = createHash("sha1");
    hash.update(input);
    return hash.digest("hex");
  }
}
