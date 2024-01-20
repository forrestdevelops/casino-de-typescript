# Casino de TypeScript

This is a simple application that simulates and monitors a dice roll at a casino using node, typescript. It uses [OpenTelemetry](https://opentelemetry.io/), an observability framework for cloud-native software, to generate traces and metrics. OpenTelemetry provides APIs, libraries, agents, and instrumentation to capture distributed traces and metrics from your application and send them to analysis tools.

## Prerequisites

- Node.js
- npm
- Docker



## Installation

1. Clone the repository:

```bash
git clone https://github.com/forrestdevelops/casino-de-typescript.git
```

2. Navigate to the project directory:

```bash
cd casino-de-typescript
```

3. Install the dependencies:

```bash
npm install
```

## Running the OpenTelemetry Collector

Before starting the application, you need to run the OpenTelemetry Collector. This can be done using Docker.

1. Create a `collector-config.yaml` file in the project root directory with your desired configuration.

2. Run the following command to start the collector:

```bash
docker run -p 4317:4317 -p 4318:4318 --rm -v $(pwd)/collector-config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector
```

This command will start the OpenTelemetry Collector and expose ports 4317 and 4318. It also mounts the `collector-config.yaml` file to the collector's configuration directory.

## Running the Application

After the collector is running, you can start the application:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Endpoints

- `/rolldice`: Rolls a dice. The number of rolls can be specified using the `rolls` query parameter. For example, `http://localhost:8080/rolldice?rolls=3` will roll the dice 3 times.

## Metrics

The application generates the following metrics:

- `requests`: The number of requests made to the `/rolldice` endpoint.
- `failed_requests`: The number of failed requests made to the `/rolldice` endpoint.
- `Total Roll Value`: The total value of all dice rolls.
- `Rolls`: The number of dice rolls.

These metrics are exported to the OpenTelemetry Collector using the OTLP protocol.
## Further Reading

If you want to learn more about OpenTelemetry and TypeScript, here are some resources:

### OpenTelemetry

- [OpenTelemetry Official Documentation](https://opentelemetry.io/docs/)
- [OpenTelemetry GitHub Repository](https://github.com/open-telemetry/opentelemetry-js)
- [OpenTelemetry Collector GitHub Repository](https://github.com/open-telemetry/opentelemetry-collector)
- [OpenTelemetry Community](https://opentelemetry.io/community/)

### TypeScript

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript GitHub Repository](https://github.com/microsoft/TypeScript)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Community](https://www.typescriptlang.org/community/)

These resources provide comprehensive guides, examples, and community discussions that can help you understand and use OpenTelemetry and TypeScript more effectively.