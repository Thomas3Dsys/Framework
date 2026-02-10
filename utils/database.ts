import { pool } from './db';
import { RowDataPacket } from 'mysql2/promise';

interface IUser extends RowDataPacket {
  customer_id: number;
  email: string;
  
}

export async function doesUserExist(email:string): Promise<boolean> {

    const query = `SELECT customer_id,email FROM oc_customer where email = '${email}'`;

    try {
        const [users] = await pool.query<IUser[]>(query);
        return users.length > 0; // Return true if user exists, false otherwise
    } catch (error) {
        console.log(`user not found, query '${query}' returned no results.`);
        throw error;
    }
}
