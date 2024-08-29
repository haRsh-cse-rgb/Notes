import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Box,
} from '@chakra-ui/react';

const NoteViewModal = ({ isOpen, onClose, note }) => {
  if (!note) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{note.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text whiteSpace="pre-wrap">{note.content}</Text>
          </Box>
        </ModalBody>
        
      </ModalContent>
    </Modal>
  );
};

export default NoteViewModal;
