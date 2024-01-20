/*app.ts*/
import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();
import { rollDice } from "./dice"
import {SpanStatusCode, trace} from "@opentelemetry/api";
import {randomUUID} from "crypto";
import { meterProvider } from "./otelConfig";


const tracer = trace.getTracer('casino');
const serviceMeter = meterProvider.getMeter('casino-requests');
const requestCounter = serviceMeter.createCounter('requests', { description: 'Number of requests' });
const failedRequestCounter = serviceMeter.createCounter('failed_requests', { description: 'Number of failed requests' });
app.get('/rolldice', (req, res) => {
    return tracer.startActiveSpan('Request Dice roll', {}, (span) => {
        const histogram = serviceMeter.createHistogram('request.duration');
        const startTime = new Date().getTime();
        requestCounter.add(1);
        span.setAttribute('request_id', randomUUID())
        const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
        if(isNaN(rolls)) {
            failedRequestCounter.add(1);
            const endTime = new Date().getTime();
            const executionTime = endTime - startTime;
            histogram.record(executionTime);
            span.setStatus({code: SpanStatusCode.ERROR})
            res.status(400).send('Rolls must be a number');
            span.setAttribute('error', 'Rolls must be a number')
            span.end();
            return;
        }
        res.send(JSON.stringify(rollDice(rolls, 1, 6)));
        span.setStatus({code: SpanStatusCode.OK})

        const endTime = new Date().getTime();
        const executionTime = endTime - startTime;
        histogram.record(executionTime);
        span.end();
    });
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});
