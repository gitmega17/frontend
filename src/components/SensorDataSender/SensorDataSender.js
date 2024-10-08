import React, { useEffect } from 'react';

const SensorDataSender = ({ onDataSent }) => {
    const intervalTime = 30000; // Define o intervalo de 30 segundos

    const sendSensorData = async (motorId, temperatura, frequencia, corrente, vibracao, pressao) => {
        const dadosSensor = {
            MotorID: motorId,
            Temperatura: temperatura,
            Frequencia: frequencia,
            Corrente: corrente,
            Vibracao: vibracao,
            Pressao: pressao
        };

        try {
            const response = await fetch('http://localhost:3000/inserir-dados-sensor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosSensor)
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados do motor: ' + response.statusText);
            }

            console.log(`Dados do motor ${motorId} enviados com sucesso.`);
            onDataSent(); // Chamar callback para atualizar os dados
        } catch (error) {
            console.error(`Erro ao enviar dados do motor ${motorId}:`, error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Simula dados aleatórios para os motores
            sendSensorData(1, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10);
            sendSensorData(2, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10);
        }, intervalTime); // Usa o intervalo definido no próprio componente

        // Limpar o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, []); // Dependência vazia para executar uma vez na montagem

    return null;
};

export default SensorDataSender;
