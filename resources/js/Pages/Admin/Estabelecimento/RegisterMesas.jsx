import axios from "axios";

export default function RegisterMesa({estabelecimentoId }) {
    const criarMesa = async () => {
        try {
            const response = await axios.post('admin/estabelecimento/mesa/create', {
                estabelecimento_id: estabelecimentoId,
            });

            alert(response.data.message || 'Mesa criada com sucesso!');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || 'Erro ao criar a mesa.');
            } else {
                alert('Erro ao criar a mesa. Por favor, tente novamente.');
            }
        }
    };
    return (
        <button onClick={criarMesa} className="btn btn-primary">
            Criar Mesa
        </button>
    )
}