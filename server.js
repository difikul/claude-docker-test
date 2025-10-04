const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'claude',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'claude_test',
  password: process.env.POSTGRES_PASSWORD || 'claude123',
  port: process.env.POSTGRES_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Express server is running',
    timestamp: new Date().toISOString()
  });
});

// Test database connection endpoint
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');

    res.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        currentTime: result.rows[0].current_time,
        postgresVersion: result.rows[0].pg_version
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Create test table and insert sample data
app.post('/api/setup', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    await client.query(`
      INSERT INTO users (name, email)
      VALUES
        ('Claude AI', 'claude@anthropic.com'),
        ('Test User', 'test@example.com')
      ON CONFLICT (email) DO NOTHING
    `);

    await client.query('COMMIT');

    res.json({
      status: 'success',
      message: 'Database setup completed'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Setup error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Setup failed',
      error: error.message
    });
  } finally {
    client.release();
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');

    res.json({
      status: 'success',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// ============================================
// TODO API ENDPOINTS
// ============================================

// GET /api/todos - Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );

    res.json({
      status: 'success',
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch todos',
      error: error.message
    });
  }
});

// POST /api/todos - Create new todo
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;

  // Validation
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required and cannot be empty'
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title.trim()]
    );

    res.status(201).json({
      status: 'success',
      message: 'Todo created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create todo',
      error: error.message
    });
  }
});

// PATCH /api/todos/:id - Toggle completed status
app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;

  // Validation
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid todo ID'
    });
  }

  try {
    const result = await pool.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Todo updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update todo',
      error: error.message
    });
  }
});

// DELETE /api/todos/:id - Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;

  // Validation
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid todo ID'
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Todo deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete todo',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️  Database test: http://localhost:${PORT}/api/test`);
  console.log(`✅ TODO App: http://localhost:${PORT}`);
  console.log(`📝 API Endpoints:`);
  console.log(`   GET    /api/todos`);
  console.log(`   POST   /api/todos`);
  console.log(`   PATCH  /api/todos/:id`);
  console.log(`   DELETE /api/todos/:id`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing connections...');
  await pool.end();
  process.exit(0);
});
