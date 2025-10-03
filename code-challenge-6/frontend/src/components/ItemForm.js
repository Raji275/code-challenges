import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';

const ItemForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: 'Please enter content',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    try {
      await onSubmit(content);
      setContent('');
      toast({
        title: 'Item created.',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error creating item.',
        status: 'error',
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={4} mb={8}>
        <FormControl>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter item content"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Item
        </Button>
      </HStack>
    </form>
  );
};

export default ItemForm;
