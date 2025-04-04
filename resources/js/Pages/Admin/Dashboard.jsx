import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Register from '../Auth/Register';
import RegisterMesa from '../../Components/RegisterMesas';
import image from '../../../../storage/app/public/qrcodes/mesa_11.svg';
import { useState } from 'react';
import EstabelecimentoIndex from './Estabelecimento/EstabelecimentoIndex';
import RegisterEstabelecimento from './Estabelecimento/RegisterEstabelecimento';
import IndexFuncionarios from './Estabelecimento/IndexFuncionarios';

export default function Dashboard({ auth }) {
    const [section, setSection] = useState("home")
    
    const handleClickEstabelecimento = () => {
        window.location.href = 'admin/estabelecimento/create'
    }
    const handleClickFuncionario = () => {
        window.location.href = 'admin/estabelecimento/funcionarios/create'
    }
    const handleClickEstabelecimentoIndex = () => {
        window.location.href = 'admin/estabelecimento'
    }
    const handleClickEstabelecimentoMesaIndex = () => {
        window.location.href = 'admin/mesa/create'
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
        <Head title="Admin Dashboard" />

        {/* 🔹 Sidebar fixa */}
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col">
        <div className="p-4 text-xl font-bold">Dashboard</div>
            <nav className="flex flex-col space-y-2 p-4 items-start">
                <button onClick={() => setSection("home")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏠 Início</button>
                <button onClick={() => setSection("createEstabelecimento")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏢 Criar Estabelecimento</button>
                <button onClick={() => setSection("Funcionario")} className="p-2 hover:bg-gray-700 rounded text-left w-full">👨‍💼 Funcionários</button>
                <button onClick={() => setSection("estabelecimentos")} className="p-2 hover:bg-gray-700 rounded text-left w-full">📜 Meus Estabelecimentos</button>
            </nav>
        </div>


        {/* 🔹 Conteúdo principal (deslocado para a direita) */}
        <div className="ml-64 p-6">
            <div className="sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-left">
                    {/* 🔹 Renderiza o conteúdo baseado na seção ativa */}
                    {section === "home" && <h2 className="text-gray-900 text-lg font-bold">Boas Vindas!</h2>}
                    {section === "createFuncionario" && <h2 className="text-gray-900 text-lg font-bold"></h2>}
                    {section === "Funcionario" && <h2 className="text-gray-900 text-lg font-bold"><IndexFuncionarios /></h2>}
                    {section === "estabelecimentos" && (
                        <>
                            <h2 className="text-gray-900 text-lg font-bold">Meus Estabelecimentos</h2>
                            <EstabelecimentoIndex />
                        </>
                    )}
                </div>
            </div>

        </div>
    </AuthenticatedLayout>
    );
}
