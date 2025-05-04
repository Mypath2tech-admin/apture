import { Pool } from "@neondatabase/serverless";

// Use the DATABASE_URL environment variable for connection
const connectionString = process.env.DATABASE_URL || "";

// Create a connection pool
const pool = new Pool({ connectionString });

// Helper function to execute SQL queries
export async function query(text: string, params: any[] = []) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Close the pool when the application shuts down
process.on("SIGTERM", () => {
  pool.end();
});

export { pool };
