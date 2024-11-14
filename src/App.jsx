import * as React from 'react';
import './App.css';
import { useState } from 'react';

import Topo from './components/Topo/index';
import Cirurgias from './components/Cirurgias';
import Concluidas from './components/Concluidas';
import Admin from './admin';
import ModalIndice from './components/ModalIndice';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function App() {

  const [page, setPage] = useState(true);
  const [pageAdmin, setPageAdmin] = useState(false);

  const handlePage = () => {
    setPage(!page);
    setOpen(false)
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setAdmin = () => {
    setPageAdmin(!pageAdmin);
    setOpen(false)
  }

  return (
    <>
      <Topo handlePage={handlePage} handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          < ModalIndice />
        </Box>
      </Modal>
      
      {page ? (
        pageAdmin ? (
          < Admin setAdmin={setAdmin}/>
        ) : (
          <Cirurgias setAdmin={setAdmin} handleClose={handleClose}/>
        )
      ) : (
        <Concluidas />
      )}
    </>
  )
}

export default App
