import { Head } from "@inertiajs/react";
import RegisterMesa from "../../../Components/RegisterMesas";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../../sass/pages/Admin/Estabelecimento/estabelecimentoDetails.scss"

export default function EstabelecimentoDetails({estabelecimento}) {
    const [mesas, setMesas] = useState([])
    useEffect(() => {
        axios.get('mesas/list')
        .then(response => {
            setMesas(response.data.data)
        })
        .catch(error => {
            console.log('Erro ao carregar os mesas' , error);
        })
    },[])

    const handleDownload = (qrCodeUrl) => {
        const link = document.createElement("a");
        link.href = qrCodeUrl;
        link.download = "qrcode.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDelete = (mesaId) => { //o problema esta aqui 
        if (window.confirm(`Tem certeza que deseja excluir a mesa ${mesaId}?`)) {
            axios.post(`/admin/estabelecimento/mesa/${mesaId}`)
                .then(() => {
                    setMesas(mesas.filter(mesa => mesa.id !== mesaId));
                })
                .catch(error => {
                    console.log('Erro ao deletar a mesa', error);
                });
        }
    };
    return (
        <section className="estabelecimento-details">
            <div>
                <Head title={`Detalhes - ${estabelecimento.nome}`} />
                <h1>{estabelecimento.nome}</h1>
                <p><strong>Cidade:</strong> {estabelecimento.cidade}</p>
                <p><strong>Endereço:</strong> {estabelecimento.estado}</p>
                <p><strong>Telefone:</strong> {estabelecimento.telefone}</p>
                <a href="/admin/estabelecimento">Voltar</a>
            </div>

            <div>
                <RegisterMesa estabelecimentoId={estabelecimento.id} />
            </div>

            <div className="mesas-container">
                {mesas.map(qr => (
                    <div key={qr.id} className="mesa-card">
                        <h2>Mesa {qr.numero}</h2>
                        <img src={qr.qr_code_url} alt={`QR Code ${qr.numero}`} />
                        <div className="btn-container">
                            <button className="download-btn" onClick={() => handleDownload(qr.qr_code_url)}>Baixar</button>
                            <button className="delete-btn" onClick={() => handleDelete(qr.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}