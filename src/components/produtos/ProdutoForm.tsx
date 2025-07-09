// src/components/produtos/ProdutoForm.tsx

import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Interfaces e Componente Auxiliar (sem mudanças) ---
interface Categoria { id: number; nome: string; descricao: string; }
interface Produto { id?: number; nome: string; descricao: string; preco: number; foto: string; calorias: number; categoria: Categoria | null; nutriscore: number; energia: number; acucares: number; gordurasSaturadas: number; sodio: number; frutas: number; fibras: number; proteinas: number; }
interface FormFieldProps { label: string; name: string; type?: 'text' | 'number'; value: string | number; onChange: (e: ChangeEvent<HTMLInputElement>) => void; placeholder: string; required?: boolean; }

const FormField = ({ label, name, type = 'text', value, onChange, placeholder, required = true }: FormFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      // Cor do anel de foco atualizada
      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e54300]"
      step={type === 'number' ? '0.01' : undefined}
    />
  </div>
);

// --- Componente Principal do Formulário ---
export default function ProdutoForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // ... (toda a lógica de useState, useEffect, handleChange, etc. continua a mesma)
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produto, setProduto] = useState<Produto>({ nome: '', descricao: '', preco: 0, foto: '', calorias: 0, categoria: null, nutriscore: 0, energia: 0, acucares: 0, gordurasSaturadas: 0, sodio: 0, frutas: 0, fibras: 0, proteinas: 0 });
  useEffect(() => { async function fetchData() { try { await buscar('/categorias', setCategorias); } catch (error: any) { toast.error('Erro ao buscar categorias.'); } if (id) { try { await buscar(`/produtos/${id}`, (dados: Produto) => setProduto(dados)); } catch(error: any) { toast.error('Erro ao buscar dados do produto.'); } } } fetchData(); }, [id]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; const numericFields = [ 'preco', 'calorias', 'nutriscore', 'energia', 'acucares', 'gordurasSaturadas', 'sodio', 'frutas', 'fibras', 'proteinas' ]; setProduto(prev => ({ ...prev, [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value, })); };
  const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => { const categoriaId = parseInt(e.target.value, 10); const categoriaSelecionada = categorias.find(c => c.id === categoriaId) || null; setProduto(prev => ({ ...prev, categoria: categoriaSelecionada })); };
  async function handleSubmit(e: FormEvent) { e.preventDefault(); if (!produto.categoria) { toast.error('Por favor, selecione uma categoria.'); return; } const dadosParaApi = { ...produto }; delete dadosParaApi.id; try { if (isEditing && produto.id) { await atualizar(`/produtos/${produto.id}`, dadosParaApi, () => {}); toast.success('Produto atualizado com sucesso!'); } else { await cadastrar(`/produtos`, dadosParaApi, () => {}); toast.success('Produto cadastrado com sucesso!'); } navigate('/produtos'); } catch (error: any) { toast.error(`Erro ao salvar produto.`); } }
  const isEditing = !!id;


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-[#e54300] mb-8">
          {isEditing ? 'Editar Produto' : 'Cadastrar Produto'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <FormField label="Nome do Produto" name="nome" value={produto.nome} onChange={handleChange} placeholder="Ex: Hambúrguer de Picanha" />
            <FormField label="Descrição" name="descricao" value={produto.descricao} onChange={handleChange} placeholder="Pão, hambúrguer 200g, queijo..." />
            <FormField label="URL da Foto" name="foto" value={produto.foto} onChange={handleChange} placeholder="https://exemplo.com/foto.png" />

            <div>
              <label htmlFor="categoria" className="block text-sm font-bold text-gray-700 mb-2">Categoria</label>
              <select
                id="categoria"
                name="categoria"
                // Cor do anel de foco atualizada
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e54300]"
                value={produto.categoria?.id || ""}
                onChange={handleCategoriaChange}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>

            <FormField label="Preço (R$)" name="preco" type="number" value={produto.preco} onChange={handleChange} placeholder="Ex: 29.90" />
          </div>

          {/* Coluna 2 - Informações Nutricionais */}
          <div className="space-y-4">
            <FormField label="Calorias (kcal)" name="calorias" type="number" value={produto.calorias} onChange={handleChange} placeholder="Ex: 550" required={false} />
            <FormField label="Nutri-Score" name="nutriscore" type="number" value={produto.nutriscore} onChange={handleChange} placeholder="Ex: 4" required={false} />
            <FormField label="Energia (kJ)" name="energia" type="number" value={produto.energia} onChange={handleChange} placeholder="Ex: 2300" required={false} />
            <FormField label="Açúcares (g)" name="acucares" type="number" value={produto.acucares} onChange={handleChange} placeholder="Ex: 5.5" required={false} />
            <FormField label="Gorduras Saturadas (g)" name="gordurasSaturadas" type="number" value={produto.gordurasSaturadas} onChange={handleChange} placeholder="Ex: 12" required={false} />
            <FormField label="Sódio (mg)" name="sodio" type="number" value={produto.sodio} onChange={handleChange} placeholder="Ex: 1.5" required={false} />
            <FormField label="Frutas (%)" name="frutas" type="number" value={produto.frutas} onChange={handleChange} placeholder="Ex: 0" required={false} />
            <FormField label="Fibras (g)" name="fibras" type="number" value={produto.fibras} onChange={handleChange} placeholder="Ex: 3.2" required={false} />
            <FormField label="Proteínas (g)" name="proteinas" type="number" value={produto.proteinas} onChange={handleChange} placeholder="Ex: 25" required={false} />
          </div>
        </div>

        <button
          type="submit"
          // Cores do botão principal atualizadas
          className="w-full mt-8 bg-[#e54300] hover:bg-[#bf3700] text-white font-bold py-3 rounded-md transition-all duration-300"
        >
          {isEditing ? 'Atualizar Produto' : 'Criar Produto'}
        </button>
      </form>
    </div>
  );
}