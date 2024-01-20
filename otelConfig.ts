import {BasicTracerProvider, ConsoleSpanExporter} from '@opentelemetry/sdk-trace-node';
import {BatchSpanProcessor, WebTracerProvider} from '@opentelemetry/sdk-trace-web';
import {diag, DiagConsoleLogger, DiagLogLevel} from "@opentelemetry/api";
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-proto";
import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-proto";
import {MeterProvider, PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";


const resource = Resource.default().merge(new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'Casino de Typescript',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0',
    }),
    );

const provider = new BasicTracerProvider();

const otlpTraceExporter = new OTLPTraceExporter(
    {}
)


provider.addSpanProcessor(new BatchSpanProcessor(otlpTraceExporter));
provider.register()

const metricExporter = new OTLPMetricExporter()
export const meterProvider = new MeterProvider({})
meterProvider.addMetricReader(new PeriodicExportingMetricReader(
    {
        exporter: metricExporter,
        exportIntervalMillis: 60000
    }
))

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
