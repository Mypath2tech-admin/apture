-- Supabase Migration: Enable pgvector and update document_embeddings table
-- Run this in your Supabase SQL Editor

-- Step 1: Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Step 2: Check if table exists and update structure
-- If the table already exists, we need to migrate the data
-- Note: Table name is document_embeddings (snake_case) as per Prisma @@map

-- First, let's check the current structure and migrate if needed
DO $$
BEGIN
  -- Check if embedding column exists and is text type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'document_embeddings' 
    AND column_name = 'embedding' 
    AND data_type = 'text'
  ) THEN
    -- Add new vector column
    ALTER TABLE document_embeddings 
    ADD COLUMN IF NOT EXISTS embedding_vector vector(768);
    
    -- Migrate existing JSON embeddings to vector format (if any exist)
    -- Note: This will only work if embeddings are stored as JSON arrays
    UPDATE document_embeddings
    SET embedding_vector = (
      SELECT embedding::vector(768)
      FROM (
        SELECT 
          id,
          CASE 
            WHEN embedding LIKE '[%' THEN embedding::vector(768)
            ELSE NULL
          END as embedding
        FROM document_embeddings
      ) sub
      WHERE sub.id = document_embeddings.id
    )
    WHERE embedding IS NOT NULL 
      AND embedding LIKE '[%'
      AND embedding_vector IS NULL;
    
    -- Drop old text column (uncomment after verifying migration)
    -- ALTER TABLE document_embeddings DROP COLUMN embedding;
    
    -- Rename new column to match Prisma schema
    ALTER TABLE document_embeddings RENAME COLUMN embedding_vector TO embedding;
  END IF;
END $$;

-- Step 3: Create vector index for similarity search (IVFFlat for better performance)
-- This index enables fast cosine similarity searches
CREATE INDEX IF NOT EXISTS document_embeddings_embedding_idx 
ON document_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Step 4: Ensure metadata indexes exist
CREATE INDEX IF NOT EXISTS document_embeddings_document_year_month_week_idx 
ON document_embeddings (document_id, year, month, week);

CREATE INDEX IF NOT EXISTS document_embeddings_document_id_idx 
ON document_embeddings (document_id);

-- Step 5: Rename table to match Prisma schema (if using snake_case)
-- Uncomment if you want to use snake_case table name
-- ALTER TABLE "DocumentEmbedding" RENAME TO document_embeddings;

-- Verify the setup
SELECT 
  column_name, 
  data_type,
  udt_name
FROM information_schema.columns 
WHERE table_name = 'document_embeddings' 
  AND column_name = 'embedding';

