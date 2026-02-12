import { pool } from "./db";
import { RowDataPacket } from "mysql2/promise";

export interface ICustomer extends RowDataPacket {
  customer_id: number;
  email: string;
  customer_group_id: number;
  store_id: number;
  language_id: number;
  firstname: string;
  lastname: string;
  telephone: string;
  fax: string;
  password: string;
  salt: string;
  cart: string;
  wishlist: string;
  newsletter: boolean;
  address_id: number;
  custom_field: string;
  ip: string;
  status: boolean;
  safe: boolean;
  token: string;
  code: string;
  date_added: Date;
}

 interface ICustomerID extends RowDataPacket {
  customer_id: number;
  email: string;
}


export class Database {

  static async doesUserExist(email: string): Promise<boolean> {
    const query = `SELECT customer_id,email FROM oc_customer where email = '${email}'`;

    try {
      const [users] = await pool.query<ICustomerID[]>(query);
      return users.length > 0; // Return true if user exists, false otherwise
    } catch (error) {
      console.log(`Error executing query: '${query}'.`);
      throw error;
    }
  }

  static async getUserDetails(email: string): Promise<ICustomer> {
    const query = `SELECT * FROM oc_customer where email = '${email}'`;
    try {
      const [users] = await pool.query<ICustomer[]>(query);
      
      
      return users[0];
    } catch (error) {
        console.log(`Error executing query: '${query}'.`);
      throw error;
    }
  }


static async Disconnect(){
    pool.end();
}

}
