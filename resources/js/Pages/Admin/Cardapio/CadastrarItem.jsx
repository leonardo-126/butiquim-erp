import { useForm } from '@inertiajs/react';
import '../../../../sass/pages/Admin/Cardapio/CadastrarItem.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CadastrarItem() {
    const { data, setData, post, processing, errors, reset } = useForm({
        estabelecimento_id: '',
        nome: '',
        descricao: '',
        preco: '',
        path: null,
      });

      const [estabelecimentos, setEstabelecimentos] = useState([])

      useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/estabelecimento/list');
                setEstabelecimentos(res.data.data);
            } catch (error) {
                console.error('Erro ao buscar dados do funcionário:', error);
            }
        };

          fetchData();
      }, []);
    
      const [preview, setPreview] = useState(null);
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'path') {
          const file = files[0];
          setData('path', file);
          setPreview(URL.createObjectURL(file)); // Preview da imagem
        } else {
          setData(name, value);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('admin.estabelecimento.cardapio.store'), {
            
          onSuccess: () => {
            reset();
            setPreview(null);
          },
        });
      };
    
    return (
        <div className="form-container">
        <h2>Cadastrar Produto</h2>
  
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              value={data.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="error-message">{errors.nome}</div>}
          </div>
  
          <div>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              name="descricao"
              value={data.descricao}
              onChange={handleChange}
              rows="4"
            />
            {errors.descricao && <div className="error-message">{errors.descricao}</div>}
          </div>
  
          <div>
            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              step="0.01"
              name="preco"
              value={data.preco}
              onChange={handleChange}
            />
            {errors.preco && <div className="error-message">{errors.preco}</div>}
          </div>
          <div>
            <label htmlFor="estabelecimento_id">Estabelecimento: </label>
            <select name="estabelecimento_id" value={data.estabelecimento_id} onChange={handleChange}>
              <option value="">Selecione um estabelecimento</option>
              {estabelecimentos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="path">Imagem do Produto</label>
            <input type="file" name="path" accept="image/*" onChange={handleChange} />
            {errors.path && <div className="error-message">{errors.path}</div>}
          </div>
  
          {preview && (
            <div style={{ textAlign: 'center' }}>
              <p>Pré-visualização:</p>
              <img
                src={preview}
                alt="Pré-visualização"
                style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '10px' }}
              />
            </div>
          )}
  
          <button type="submit" disabled={processing}>
            {processing ? 'Salvando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    )
}