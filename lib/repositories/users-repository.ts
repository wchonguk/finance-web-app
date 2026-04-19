import { getDbPool, sql } from "@/lib/db"

export async function ensureUser(externalId: string, email: string | null, name: string | null) {
  const pool = await getDbPool()

  await pool
    .request()
    .input("ExternalId", sql.NVarChar(128), externalId)
    .input("Email", sql.NVarChar(255), email)
    .input("DisplayName", sql.NVarChar(255), name)
    .query(`
      MERGE dbo.Users AS target
      USING (SELECT @ExternalId AS ExternalId) AS src
      ON target.ExternalId = src.ExternalId
      WHEN MATCHED THEN
        UPDATE SET Email = @Email, DisplayName = @DisplayName, UpdatedAt = SYSUTCDATETIME()
      WHEN NOT MATCHED THEN
        INSERT (ExternalId, Email, DisplayName)
        VALUES (@ExternalId, @Email, @DisplayName);
    `)

  const result = await pool
    .request()
    .input("ExternalId", sql.NVarChar(128), externalId)
    .query("SELECT TOP 1 Id FROM dbo.Users WHERE ExternalId = @ExternalId")

  return result.recordset[0]?.Id as number
}
