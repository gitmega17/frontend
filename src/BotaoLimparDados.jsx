import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const BotaoLimparDados = () => {
  const [exibirModal, setExibirModal] = useState(false);
  const [exibirMensagem, setExibirMensagem] = useState(false);

  const handleLimparDados = () => {
    setExibirModal(true);
  };

  const handleConfirmarLimparDados = async () => {
    try {
      const response = await fetch('http://localhost:3000/limpar-dados', {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir os dados.');
      }
      setExibirModal(false);
      setExibirMensagem(true);
      setTimeout(() => {
        setExibirMensagem(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Erro ao limpar os dados:', error);
    }
  };

  const handleCloseModal = () => {
    setExibirModal(false);
  };

  const handleCloseMensagem = () => {
    setExibirMensagem(false);
  };

  return (
    <>
      {/* Botão principal estilizado com MUI */}
      <Button variant="contained" size="large" color="error" onClick={handleLimparDados}>
        Limpar Dados
      </Button>

      {/* Modal (Dialog) do MUI */}
      <Dialog
        open={exibirModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir todos os dados?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmarLimparDados} color="success" variant="contained">
            Sim
          </Button>
          <Button onClick={handleCloseModal} color="error" variant="contained" autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mensagem de sucesso (Snackbar com Alert) */}
      <Snackbar
        open={exibirMensagem}
        autoHideDuration={3000}
        onClose={handleCloseMensagem}
      >
        <MuiAlert onClose={handleCloseMensagem} severity="success" sx={{ width: '100%' }}>
          Dados excluídos com sucesso.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default BotaoLimparDados;
