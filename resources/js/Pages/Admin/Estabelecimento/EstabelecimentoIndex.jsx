import axios from "axios";
import { useEffect, useState } from "react";
import "../../../../sass/pages/Admin/Estabelecimento/EstabelecimentoIndex.scss"

export default function EstabelecimentoIndex () {
    const [estabelecimentos, setEstabelecimentos] = useState([]);

    useEffect(() => {
        // Fazer a requisição para a API
        axios.get('/admin/estabelecimento/list')

            .then(response => {
                console.log(response)
                setEstabelecimentos(response.data.data); // Acessando os dados diretamente
            })
            .catch(error => {
                console.error('Erro ao carregar os estabelecimentos:', error);
            });
    }, []);

    return (
        <div className="estabelecimento-index">
            <h1>Estabelecimentos</h1>
            <ul>
                {estabelecimentos.map((estabelecimento) => (
                    <li key={estabelecimento.id} className="estabelecimento-item">
                        {estabelecimento.nome} - {estabelecimento.cidade}
                        <a href={`admin/estabelecimento/${estabelecimento.id}`} className="detalhes-link">
                            Detalhes
                        </a>
                    </li>
                ))}
            </ul>
            <a href="admin/estabelecimento/create" className="btn-cadastrar">
                Cadastrar Estabelecimento
            </a>
        </div>
    );    
}