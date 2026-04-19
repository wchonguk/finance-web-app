import { DefaultAzureCredential } from "@azure/identity"
import sql, { type config as SqlConfig } from "mssql"
import { logError } from "@/lib/logger"

declare global {
  // eslint-disable-next-line no-var
  var __sqlPoolPromise: Promise<sql.ConnectionPool> | undefined
}

const SQL_SCOPE = "https://database.windows.net/.default"

function assertEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

async function buildConfig(): Promise<SqlConfig> {
  const useManagedIdentity = process.env.AZURE_SQL_USE_MANAGED_IDENTITY === "true"

  if (useManagedIdentity) {
    const credential = new DefaultAzureCredential()
    const token = await credential.getToken(SQL_SCOPE)

    if (!token?.token) {
      throw new Error("Could not acquire Azure SQL access token")
    }

    return {
      server: assertEnv("AZURE_SQL_SERVER"),
      database: assertEnv("AZURE_SQL_DATABASE"),
      options: {
        encrypt: true,
        trustServerCertificate: false,
      },
      authentication: {
        type: "azure-active-directory-access-token",
        options: {
          token: token.token,
        },
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    }
  }

  return {
    server: assertEnv("AZURE_SQL_SERVER"),
    database: assertEnv("AZURE_SQL_DATABASE"),
    user: assertEnv("AZURE_SQL_USER"),
    password: assertEnv("AZURE_SQL_PASSWORD"),
    options: {
      encrypt: true,
      trustServerCertificate: process.env.NODE_ENV !== "production",
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  }
}

export async function getDbPool() {
  if (!global.__sqlPoolPromise) {
    global.__sqlPoolPromise = buildConfig().then((config) => new sql.ConnectionPool(config).connect())
  }

  try {
    return await global.__sqlPoolPromise
  } catch (error) {
    global.__sqlPoolPromise = undefined
    logError("db.connection", error)
    throw error
  }
}

export { sql }
