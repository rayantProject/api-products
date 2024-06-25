import express from 'express';
import { config } from 'dotenv';
import router from './routes/router';
import { connectDB } from './database/db';
import { connectRabbitMQ } from './helper/messagesBrokerHelper';

config();
import { registry, httpRequestDurationMicroseconds } from 'src/helper/monitoringHelper';
const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.route?.path ?? req.path, code: res.statusCode });
    });
    next();
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', registry.contentType);
    res.end(await registry.metrics());
});
app.use(router);
app.get('/error', (req, res) => {
    res.status(500).send('Something went wrong!');
});

connectDB()
    .then(() => {
        connectRabbitMQ()
            .then(() => {
                app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    })
    .catch((err) => {
        console.error(err);
    });
