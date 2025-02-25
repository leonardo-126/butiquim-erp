import { useEffect, useState } from "react";

export default function DowloandQrCode() {
    const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Simula a requisição para o backend para gerar o QR code
    fetch("/gerar-qrcode")  // Rota para o backend que gera o QR Code
      .then((response) => response.json())
      .then((data) => {
        setQrCodeUrl(data.qr_code_url);
      });
  }, []);
    return (
        <div>
        {qrCodeUrl && (
            <a href={qrCodeUrl} download="mesa_qrcode.png">
            Baixar QR Code
            </a>
        )}
        </div>
    )
}