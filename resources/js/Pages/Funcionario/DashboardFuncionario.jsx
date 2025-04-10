import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DetailsFuncionario from './DetailsFuncionario';

export default function DashboardFuncionario({auth}) {
    const [section, setSection] = useState("home")
    const [estabelecimento, setEstabelcimento] = useState()

        
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
                    <button onClick={() => setSection("pedidos")} className="p-2 hover:bg-gray-700 rounded text-left w-full">🏢 Pedidos</button>
                    <button onClick={() => setSection("Funcionario")} className="p-2 hover:bg-gray-700 rounded text-left w-full">👨‍💼 Funcionários</button>
                    <button onClick={() => setSection("estabelecimentos")} className="p-2 hover:bg-gray-700 rounded text-left w-full">📜 Meus Estabelecimentos</button>
                </nav>
            </div>
    
    
            {/* 🔹 Conteúdo principal (deslocado para a direita) */}
            <div className="ml-64 p-6">
                <div className="sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-left">
                        {/* 🔹 Renderiza o conteúdo baseado na seção ativa */}
                        {section === "home" && <h2 className="text-gray-900 text-lg font-bold"><DetailsFuncionario/></h2>}
                        {section === "pedidos" && <h2 className="text-gray-900 text-lg font-bold">aaaaaaaaaa</h2>}
                        {section === "Funcionario" && <h2 className="text-gray-900 text-lg font-bold"></h2>}
                        {section === "estabelecimentos" && (
                            <>
                                <h2 className="text-gray-900 text-lg font-bold">Meus Estabelecimentos</h2>
                                
                            </>
                        )}
                    </div>
                </div>
    
            </div>
        </AuthenticatedLayout>
    )
}