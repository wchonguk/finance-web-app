let appInsightsStarted = false

export function initializeObservability() {
  if (appInsightsStarted || !process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    return
  }

  try {
    // Lazy loaded to avoid crashing when dependency is unavailable in local environments.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAzureMonitor } = require("@azure/monitor-opentelemetry") as {
      useAzureMonitor: (options: { azureMonitorExporterOptions: { connectionString: string } }) => void
    }

    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      },
    })
    appInsightsStarted = true
    console.info("[observability] Azure Monitor initialized")
  } catch (error) {
    console.warn("[observability] Azure Monitor is not enabled", error)
  }
}

export function logError(context: string, error: unknown, metadata?: Record<string, unknown>) {
  console.error(`[${context}]`, { error, ...metadata })
}

export function logInfo(context: string, metadata?: Record<string, unknown>) {
  console.info(`[${context}]`, metadata ?? {})
}
