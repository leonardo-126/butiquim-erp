import axios from "axios"
import { useEffect, useState } from "react"
import "../../../../sass/pages/Admin/Estabelecimento/IndexFuncionarios.scss"

export default function IndexFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([])

    useEffect(() => {
        //fazer requisicao
        axios.get('/admin/funcionarios/list')

        .then(response => {
            console.log(response)
            setFuncionarios(response.data.data)
        })
        .catch(error => {
            console.log('Erro ao carregar os funcionarios' , error);
        })
    },[])

    return (
        <section className="funcionarios">
            <h1>Funcionários</h1>
            <ul>
                {funcionarios.map(funcionario => (
                    <li key={funcionario.id}>
                        <div className="funcionarios-list">
                            <strong>{funcionario.user?.name}</strong> 
                            <strong>{funcionario.estabelecimento?.nome}</strong>
                        </div>
                        <a href="">Detalhes</a>
                    </li>
                ))}
            </ul>
            <a href="admin/estabelecimento/funcionarios/create" className="btn-cadastrar">Cadastrar Funcionarios</a>
        </section>
    )
}