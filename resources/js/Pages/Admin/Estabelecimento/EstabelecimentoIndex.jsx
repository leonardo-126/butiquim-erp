import axios from "axios";
import { useEffect, useState } from "react";

export default function EstabelecimentoIndex () {
    const [estabelecimentos, setEstabelecimentos] = useState([]);

    useEffect(() => {
        // Fazer a requisição para a API
        axios.get('/admin/estabelecimento/list')  // CORRIGIDO

            .then(response => {
                console.log(response)
                setEstabelecimentos(response.data.data); // Acessando os dados diretamente
            })
            .catch(error => {
                console.error('Erro ao carregar os estabelecimentos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Estabelecimentos</h1>
            <ul>
                {estabelecimentos.map(estabelecimento => (
                    <li key={estabelecimento.id}>
                        {estabelecimento.nome} - {estabelecimento.cidade}
                    </li>
                ))}
            </ul>
        </div>
    );
}