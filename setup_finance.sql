-- Criar tabela de categorias dinâmicas
CREATE TABLE IF NOT EXISTS finance_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('payable', 'receivable')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela mestra de contas a pagar e receber (planilha de alta performance)
CREATE TABLE IF NOT EXISTS finance_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_id TEXT NOT NULL, 
    description TEXT,
    category TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status TEXT CHECK (status IN ('pendente', 'pago', 'atrasado')) DEFAULT 'pendente',
    type TEXT CHECK (type IN ('payable', 'receivable')) NOT NULL,
    entity_name TEXT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS (Row Level Security) temporariamente 
-- Isso permite conectar seu Vercel diretamente sem autenticação restrita de sistema de locatários (empresas)
ALTER TABLE finance_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE finance_categories DISABLE ROW LEVEL SECURITY;

-- Evitar duplicação antes de inserir categorias iniciais
DELETE FROM finance_categories;

-- Inserir as Categorias Padrão (Start)
INSERT INTO finance_categories (name, type) VALUES 
('Utilidades', 'payable'),
('Telecom', 'payable'),
('Infraestrutura', 'payable'),
('Segurança', 'payable'),
('TI', 'payable'),
('Serviços', 'receivable'),
('Produtos', 'receivable'),
('Consultoria', 'receivable'),
('Suporte', 'receivable');
