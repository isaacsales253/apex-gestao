-- APEX GESTÃO - Schema Inicial

-- 1. Empresas (Multi-tenancy)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    document TEXT, -- CNPJ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Fornecedores
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insumos (Estoque)
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    unit TEXT, -- kg, un, l, etc
    current_stock DECIMAL(12,2) DEFAULT 0,
    min_stock DECIMAL(12,2) DEFAULT 0,
    unit_cost DECIMAL(12,2) DEFAULT 0,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Fichas Técnicas
CREATE TABLE technical_sheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    yield DECIMAL(12,2), -- rendimento
    total_cost DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Itens da Ficha Técnica
CREATE TABLE technical_sheet_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sheet_id UUID REFERENCES technical_sheets(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id),
    quantity DECIMAL(12,2) NOT NULL,
    cost_at_time DECIMAL(12,2) -- custo no momento da criação
);

-- 5. Financeiro (Contas a Pagar/Receber)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    type TEXT CHECK (type IN ('payable', 'receivable')),
    status TEXT CHECK (status IN ('pending', 'paid', 'cancelled')),
    due_date DATE NOT NULL,
    payment_date DATE,
    category TEXT,
    entity_name TEXT, -- Nome do fornecedor ou cliente
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RH - Colaboradores e Custos
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT,
    base_salary DECIMAL(12,2) NOT NULL,
    admission_date DATE,
    status TEXT DEFAULT 'active'
);

-- Composição de Custo Trabalhista
CREATE TABLE labor_cost_composition (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    charge_type TEXT NOT NULL, -- INSS, FGTS, Férias, etc
    percentage DECIMAL(5,2),
    fixed_amount DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
