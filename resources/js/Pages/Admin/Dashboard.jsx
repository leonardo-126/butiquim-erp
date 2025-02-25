import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Register from '../Auth/Register';
import RegisterMesa from './Estabelecimento/RegisterMesas';
import image from '../../../../storage/app/public/qrcodes/mesa_11.svg';

export default function Dashboard({ auth }) {
    
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
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Meus estabeleciomentos</div>
                        <button className="p-6 text-gray-900" onClick={handleClickEstabelecimento}>Criar estabelecimento</button>
                        <button className="p-6 text-gray-900" onClick={handleClickFuncionario}>Criar funcionarioss</button>
                        <button className="p-6 text-gray-900" onClick={handleClickEstabelecimentoIndex}>Meus estabelecimentos</button>
                        <RegisterMesaecho "# butiquim-erp" >> README.md estabelecimentoId={1}/>
                        <img src={image} alt="aaaaaaaaaaa" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
