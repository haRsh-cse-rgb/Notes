import React, { useState, useRef } from 'react';
import {
  ChakraProvider, Box, Heading, Button, SimpleGrid, Text, Stack, useDisclosure,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
} from '@chakra-ui/react';
import NoteModal from './NoteModal';
import NoteViewModal from './NoteViewModal';

const App = () => {
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentNote, setCurrentNote] = useState(null);
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleSaveNote = (note) => {
    if (currentNote) {
      setNotes(notes.map(n => (n.id === currentNote.id ? note : n)));
      setCurrentNote(null);
    } else {
      setNotes([...notes, { ...note, id: Date.now() }]);
    }
    onClose();
  };

  const handleDeleteNote = () => {
    setNotes(notes.filter(note => note.id !== noteToDelete.id));
    onAlertClose();
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    onOpen();
  };

  const handleAddNote = () => {
    setCurrentNote(null); 
    onOpen();
  };

  const handleViewNote = (note) => {
    setCurrentNote(note);
    onViewOpen();
  };

  const confirmDeleteNote = (note) => {
    setNoteToDelete(note);
    onAlertOpen();
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={4} textAlign={'center'}>My Notes</Heading>
        <Button colorScheme="teal" onClick={handleAddNote}>
          Add New Note
        </Button>
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={5}>
          {notes.map(note => (
            <Box key={note.id} p={5} shadow="md" borderWidth="1px" onClick={() => handleViewNote(note)} cursor="pointer">
              <Heading fontSize="xl">{note.title}</Heading>
              <Text mt={4} color="gray.500">
                {note.content.substring(0, 100)}...
              </Text>
              <Stack direction="row" mt={4}>
                <Button colorScheme="blue" onClick={(e) => { e.stopPropagation(); handleEditNote(note); }}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={(e) => { e.stopPropagation(); confirmDeleteNote(note); }}>
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <NoteModal isOpen={isOpen} onClose={onClose} onSave={handleSaveNote} note={currentNote} />
      <NoteViewModal isOpen={isViewOpen} onClose={onViewClose} note={currentNote} />

      
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteNote} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
};

export default App;

