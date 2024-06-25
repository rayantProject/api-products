import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
