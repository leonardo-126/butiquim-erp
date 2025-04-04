import axios from "axios";
import "../../sass/components/RegisterMesa.scss"

export default function RegisterMesa({estabelecimentoId }) {
    const criarMesa = async () => {
        try {
            const response = await axios.post('mesa/create', { //considerar sua rota
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
        <button onClick={criarMesa} className="btn">
            Criar Mesa
        </button>
    )
}