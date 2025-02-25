import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/lib/axios';

export default function Cardapio () {
    const { mesaId } = useParams();
    const [cardapio, setCardapio] = useState([]);
    const [mesa, setMesa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/mesa/${mesaId}/cardapio`)
            .then(response => {
                setCardapio(response.data.cardapio);
                setMesa(response.data.mesa);
                setLoading(false);
            })
            .catch(error => console.error('Erro ao carregar o cardápio:', error));
    }, [mesaId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Cardápio da Mesa {mesa.numero}</h1>
            <ul>
                
            </ul>
        </div>
    );
};
