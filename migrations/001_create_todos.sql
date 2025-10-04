-- Migration: Create todos table
-- Description: Creates the main todos table with all necessary columns

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries on created_at
CREATE INDEX idx_todos_created_at ON todos(created_at DESC);

-- Insert sample data for testing
INSERT INTO todos (title, completed) VALUES
    ('Naučit se Docker', true),
    ('Vytvořit REST API', true),
    ('Přidat frontend s Tailwind CSS', false)
ON CONFLICT DO NOTHING;
