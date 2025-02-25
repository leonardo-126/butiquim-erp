import React from "react";

const CriarEstabelecimentoButton = () => {
  const handleRedirecionar = () => {
    window.location.href = "/"; // Substitua pelo link da página desejada
  };

  return (
    <button
      onClick={handleRedirecionar}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Criar Estabelecimento
    </button>
  );
};

export default CriarEstabelecimentoButton;
