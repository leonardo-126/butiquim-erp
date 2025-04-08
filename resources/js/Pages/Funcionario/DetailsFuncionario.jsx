import axios from "axios"
import { useEffect, useState } from "react"
import '../../../sass/pages/Funcionario/DetailsFuncionario.scss'

export default function DetailsFuncionario() {
    const [dados, setDados]= useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('funcionario/details');
                setDados(res.data);
            } catch (error) {
                console.error('Erro ao buscar dados do funcionário:', error);
            }
        };

        fetchData();
    }, []);

    //carregando
    if (!dados) return <p>Carregando detalhes...</p>;

    const { estabelecimento, funcionario, user } = dados;

    return (
        <section className="detalhes-container">
            <h2>Detalhes do Usuarios</h2>
            <div className="detalhes-bloco">
                <h3>Estabelecimento</h3>
                <ul>
                <li><strong>Nome:</strong> {estabelecimento.nome}</li>
                <li><strong>Telefone:</strong> {estabelecimento.telefone}</li>
                <li><strong>Estado:</strong> {estabelecimento.estado}</li>
                <li><strong>Cidade:</strong> {estabelecimento.cidade}</li>
                <li><strong>Rua:</strong> {estabelecimento.rua}</li>
                </ul>
            </div>

            <div className="detalhes-bloco">
                <h3>Funcionário</h3>
                <ul>
                <li><strong>ID Funcionário:</strong> {funcionario.id}</li>
                <li><strong>Nome:</strong> {user.name}</li>
                <li><strong>Venda Diária:</strong> {funcionario.valor_venda_diaria || "R$ 0,00"}</li>
                <li><strong>Desde:</strong> {new Date(funcionario.created_at).toLocaleString()}</li>
                </ul>
            </div>
        </section>
    )
}