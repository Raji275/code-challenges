const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// In-memory storage
let items = [];

// Create item (task)
app.post('/items', (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const item = {
      id: uuidv4(),
      title: title || 'Untitled Task',
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(item);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all items (tasks)
app.get('/items', (req, res) => {
  res.json(items);
});

// Update item (task)
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const { title, description, status, priority, dueDate } = req.body;
  items[index] = {
    ...items[index],
    title: title || items[index].title,
    description: description || items[index].description,
    status: status || items[index].status,
    priority: priority || items[index].priority,
    dueDate: dueDate || items[index].dueDate,
    updatedAt: new Date().toISOString()
  };

  res.json(items[index]);
});

// Delete item (task)
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(index, 1);
  res.status(204).send();
});

// Filter tasks by status
app.get('/tasks/filter/status/:status', (req, res) => {
  const { status } = req.params;
  const filteredTasks = tasks.filter(t => t.status === status);
  res.json(filteredTasks);
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// Start server
const PORT = 3001;
let serverInstance = null;

const startServer = () => {
  try {
    serverInstance = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      // Add test data
      items.push({
        id: uuidv4(),
        title: "Test Task",
        description: "This is a test task",
        status: "pending",
        priority: "medium",
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log('Test task created');
    });

    serverInstance.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  if (serverInstance) {
    serverInstance.close();
  }
});


