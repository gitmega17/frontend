import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Button,
    Snackbar,
    Paper,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import jsPDF from 'jspdf';
import './Relatorio.css'; // Importando o CSS

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Relatorio = () => {
    const [MotorID, setMotorID] = useState('');
    const [parametro, setParametro] = useState('');
    const [relatorio, setRelatorio] = useState('');
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const gerarRelatorio = async () => {
        setError('');
        if (!MotorID || !parametro) {
            setError('Por favor, preencha todos os campos.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/gerar_relatorio`, {  // Usando a variável de ambiente
                MotorID: MotorID,
                parametro,
            });

            if (response.data && response.data.relatorio) {
                setRelatorio(response.data.relatorio);
            } else {
                throw new Error('Erro ao gerar o relatório');
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            setError('Erro ao gerar o relatório. Por favor, tente novamente mais tarde.');
            setSnackbarOpen(true);
        }
    };


    const gerarPDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 12;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const lineHeight = 6;
        let yOffset = margin;
    
        const logoWidth = 80;
        const logoHeight = 60;
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage('/imagens/techforge_banner.png', 'PNG', logoX, yOffset, logoWidth, logoHeight);
    
        yOffset += logoHeight + lineHeight;
    
        doc.setFontSize(18);
        const title = "Relatório de Monitoramento";
        const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
        doc.text(title, titleX, yOffset);
    
        yOffset += lineHeight * 2;
    
        const dataEmissao = new Date().toLocaleDateString();
        const info = `Data de Emissão: ${dataEmissao}`; // Alterado para mostrar apenas a data
        const infoX = (pageWidth - doc.getTextWidth(info)) / 2;
        doc.setFontSize(12);
        doc.text(info, infoX, yOffset);
    
        yOffset += lineHeight * 2;
    
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(relatorio, pageWidth - margin * 2);
    
        for (let i = 0; i < splitText.length; i++) {
            if (yOffset + lineHeight > pageHeight - margin) {
                doc.addPage();
                yOffset = margin;
            }
            
            doc.text(splitText[i], margin, yOffset);
            yOffset += lineHeight;
    
            if (splitText[i].includes("Relatório do Motor Motor01 para o parâmetro Corrente:")) {
                doc.addPage();
                yOffset = margin;
            }
        }
    
        doc.save(`relatorio.pdf`); // Removido o número do relatório do nome do arquivo
    };
    

    

    return (
        <div>
            <header className='head-menu'>
                <Link to="/SelectMotor">
                    <IconButton aria-label="home" size="large" color="primary"
                    ><ArrowBackIcon fontSize="50" />
                    </IconButton>
                </Link>

                <Link to="/">
                    <IconButton aria-label="config" size="large" color="primary"
                    ><SettingsIcon fontSize="50" />
                    </IconButton>
                </Link>

            </header>
        <Container className="displayRelatorio">
            {/* Container à esquerda, contendo os selects e botões */}
            <div className="leftContainer">
                <Typography variant="h4">Gerar Relatório</Typography>

                <FormControl fullWidth>
                    <Select
                        value={MotorID}
                        onChange={(e) => setMotorID(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Motor ID' }}
                        className="select"
                    >
                        <MenuItem value="" disabled>
                            Selecione o Motor ID
                        </MenuItem>
                        <MenuItem value="Motor01">Motor 1</MenuItem>
                        <MenuItem value="Motor02">Motor 2</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <Select
                        value={parametro}
                        onChange={(e) => setParametro(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Parâmetro' }}
                        className="select"
                    >
                        <MenuItem value="" disabled>
                            Selecione o parâmetro
                        </MenuItem>
                        <MenuItem value="Temperatura">Temperatura</MenuItem>
                        <MenuItem value="Frequencia">Frequência</MenuItem>
                        <MenuItem value="Corrente">Corrente</MenuItem>
                        <MenuItem value="Vibracao">Vibração</MenuItem>
                        <MenuItem value="Pressao">Pressão</MenuItem>
                        <MenuItem value="completo">Completo</MenuItem>
                    </Select>
                </FormControl>

                <Button className="button" onClick={gerarRelatorio}>
                    Gerar Relatório
                </Button>
                <Button className="button" onClick={gerarPDF} disabled={!relatorio}>
                    Download PDF
                </Button>
            </div>

            {/* Container à direita, exibindo o relatório */}
            <div className="rightContainer">
                {relatorio ? (
                    <Paper elevation={3} className="relatorioContainer">
                        <Typography variant="h6">Relatório:</Typography>
                        <pre>{relatorio}</pre>
                    </Paper>
                ) : (
                    <Typography variant="body1">Nenhum relatório gerado ainda.</Typography>
                )}
            </div>

            {/* Snackbar para exibir mensagens de erro */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
        </div>

    );
};

export default Relatorio;
