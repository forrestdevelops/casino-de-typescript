import { trace} from "@opentelemetry/api";
import {meterProvider} from "./otelConfig";

const tracer = trace.getTracer('dice');
function roll(min:number, max:number){
    return tracer.startActiveSpan('roll', {}, (span) => {
        const result = Math.floor(Math.random() * (max - min) + min);
        span.addEvent('roll', {
            result
        });
        span.end();
        return result;
    });
}

const serviceMeter = meterProvider.getMeter('casino-requests');
const totalCounter = serviceMeter.createCounter('Total Roll Value', { description: 'Total Value of Rolls' });
const rollCounter = serviceMeter.createCounter('Rolls', { description: 'Number of Rolls' });
export function rollDice(rolls:number, min:number, max:number){

    return tracer.startActiveSpan('rollDice', {}, (span) => {
        span.setAttribute('roll_count', rolls);
        const results = [];
        let total = 0;
        rollCounter.add(rolls);
        for (let i = 0; i < rolls; i++) {
            results.push(roll(min, max));
            total += results[i];
        }
        totalCounter.add(total);
        span.setAttribute('total', total);
        span.end();
        return results;
    });
}

