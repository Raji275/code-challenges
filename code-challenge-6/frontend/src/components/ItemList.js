import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Input,
  Button,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const ItemList = ({ items, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const toast = useToast();

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditContent(item.content);
  };

  const handleUpdate = async (id) => {
    try {
      await onUpdate(id, editContent);
      setEditId(null);
      setEditContent('');
      toast({
        title: 'Item updated.',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error updating item.',
        status: 'error',
        duration: 2000,
      });
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditContent('');
  };

  return (
    <List spacing={3} width="100%">
      {items.map((item) => (
        <ListItem key={item.id}>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <HStack spacing={4}>
              {editId === item.id ? (
                <>
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <IconButton
                    icon={<CheckIcon />}
                    onClick={() => handleUpdate(item.id)}
                    colorScheme="green"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={handleCancel}
                    colorScheme="red"
                  />
                </>
              ) : (
                <>
                  <Box flex="1">{item.content}</Box>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEdit(item)}
                    colorScheme="blue"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(item.id)}
                    colorScheme="red"
                  />
                </>
              )}
            </HStack>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
