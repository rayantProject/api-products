// src/rabbitmq.ts (ajoutez ces fonctions)
import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost';

let connection: Connection;
let channel: Channel;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        process.exit(1);
    }
};

export const getChannel = () => channel;

export const publishToQueue = async (queueName: string, message: string) => {
    try {
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message sent to queue ${queueName}`);
    } catch (error) {
        console.error('Failed to publish message', error);
    }
};

export const consumeFromQueue = async (queueName: string, callback: (msg: ConsumeMessage | null) => void) => {
    try {
        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, callback, { noAck: true });
        console.log(`Consuming messages from queue ${queueName}`);
    } catch (error) {
        console.error('Failed to consume messages', error);
    }
};
