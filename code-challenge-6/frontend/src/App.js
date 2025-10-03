import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  IconButton,
  Spinner
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { api } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTasks();
      setTasks(data);
      setIsServerError(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setIsServerError(true);
      toast({
        title: 'Server Error',
        description: 'Could not connect to server. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    try {
      if (editingTask) {
        console.log('Calling updateTask API');
        await api.updateTask(editingTask.id, formData);
      } else {
        console.log('Calling createTask API');
        await api.createTask(formData);
      }
      toast({
        title: `Task ${editingTask ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 2000,
      });
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: ''
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      toast({
        title: 'Task deleted',
        status: 'success',
        duration: 2000,
      });
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error deleting task',
        description: error.message,
        status: 'error',
        duration: 2000,
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate?.split('T')[0] || ''
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'green',
      medium: 'yellow',
      high: 'red'
    };
    return colors[priority] || 'gray';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      'in-progress': 'blue',
      completed: 'green'
    };
    return colors[status] || 'gray';
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading>Task Management System</Heading>
        
        {isServerError && (
          <Box p={4} bg="red.100" color="red.700" borderRadius="md" w="100%">
            Server connection error. Please refresh the page or try again later.
          </Box>
        )}

        <Box w="100%" p={6} borderWidth="1px" borderRadius="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter task description"
                />
              </FormControl>

              <HStack w="100%">
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </FormControl>
              </HStack>

              <Button type="submit" colorScheme="blue" w="100%">
                {editingTask ? 'Update Task' : 'Create Task'}
              </Button>
            </VStack>
          </form>
        </Box>

        <Box w="100%" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th>Due Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map(task => (
                <Tr key={task.id}>
                  <Td>{task.title}</Td>
                  <Td>{task.description}</Td>
                  <Td>
                    <Badge colorScheme={task.status === 'completed' ? 'green' : 'orange'}>
                      {task.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={task.priority === 'high' ? 'red' : 'yellow'}>
                      {task.priority}
                    </Badge>
                  </Td>
                  <Td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => handleEdit(task)}
                        colorScheme="blue"
                        size="sm"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(task.id)}
                        colorScheme="red"
                        size="sm"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {isLoading && <Spinner size="xl" />}
      </VStack>
    </Container>
  );
}

export default App;
