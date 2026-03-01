-- 1. ADICIONAR NOVAS COLUNAS NA NOSSA TABELA

ALTER TABLE finance_transactions
ADD COLUMN IF NOT EXISTS recurrence TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Observação: Se a coluna já existir ela será ignorada graças ao comando 'IF NOT EXISTS'.
