import mongoose from 'mongoose';
import { environment } from '../../environments/environment';

/**
 * Mongoose Connection
 **/
export class dbConnector {
    static init(): void {
        mongoose.connect(environment.dbString);

        const db = mongoose.connection;

        db.on('error', () => {
            console.error('Error while connecting to DB');
        });
    }
}
