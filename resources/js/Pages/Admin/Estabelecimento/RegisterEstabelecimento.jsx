import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from 'react';

export default function RegisterEstabelecimento ({auth}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: auth.user.id || '',
        nome: '',
        telefone: '',
        estado: '',
        cidade: '',
        numero: '',

    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('estabelecimento.store'));
    };
    return (
        <AuthenticatedLayout
        user={auth.user}
        >
            <GuestLayout>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="nome" value="Nome" />

                        <TextInput
                            id="nome"
                            name="nome"
                            value={data.nome}
                            className="mt-1 block w-full"
                            autoComplete="nome"
                            isFocused={true}
                            onChange={(e) => setData('nome', e.target.value)}
                            required
                        />

                        <InputError message={errors.nome} className="mt-2" />
                    </div>

                    <div className='mt-4'>
                        <InputLabel htmlFor="telefone" value="Telefone" />

                        <TextInput
                            id="telefone"
                            name="telefone"
                            value={data.telefone}
                            className="mt-1 block w-full"
                            autoComplete="telefone"
                            isFocused={true}
                            onChange={(e) => setData('telefone', e.target.value)}
                            required
                        />

                        <InputError message={errors.telefone} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="estado" value="Estado" />

                        <TextInput
                            id="estado"
                            name="estado"
                            value={data.estado}
                            className="mt-1 block w-full"
                            autoComplete="estado"
                            onChange={(e) => setData('estado', e.target.value)}
                            required
                        />

                        <InputError message={errors.estado} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="cidade" value="Cidade" />

                        <TextInput
                            id="cidade"
                            name="cidade"
                            value={data.cidade}
                            className="mt-1 block w-full"
                            autoComplete="cidade"
                            onChange={(e) => setData('cidade', e.target.value)}
                            required
                        />

                        <InputError message={errors.cidade} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="numero" value="Numero" />

                        <TextInput
                            id="numero"
                            name="numero"
                            value={data.numero}
                            className="mt-1 block w-full"
                            autoComplete="numero"
                            onChange={(e) => setData('numero', e.target.value)}
                            required
                        />

                        <InputError message={errors.numero} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Registrar
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </AuthenticatedLayout>
    )
}