import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexMesas () {
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        axios
            .get("/admin/estabelecimento/mesas/list")
            .then((response) => {
                setMesas(response.data);
            })
            .catch((error) => console.error("Erro ao carregar mesas:", error));
    }, []);

    const downloadQrCode = (mesaId) => {
        window.location.href = `/admin/estabelecimento/mesas/${mesaId}/download`;
    };
    return (
        <section>
            <h1>Lista de Mesas</h1>
            <ul>
                {mesas.map(mesa => (
                <li key={mesa.id}>
                    Mesa {mesa.numero}
                    {/* Link para baixar o QR Code da mesa */}
                    <a href={`/baixar-qrcode/${mesa.id}`} download={`QR_Code_Mesa_${mesa.numero}.svg`}>
                    Baixar QR Code
                    </a>
                </li>
                ))}
            </ul>
        </section>
    )
}