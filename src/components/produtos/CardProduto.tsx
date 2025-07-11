import type Produto from "@/models/Produto";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProdutoProps {
	produto: Produto;
	onDelete: (id: number) => void;
}

// --- Componente Principal do Card ---
export default function CardProduto({ produto, onDelete }: CardProdutoProps) {
	return (
		<div className="bg-white border border-gray-200 text-gray-800 rounded-2xl shadow-lg p-3 w-full flex flex-col transition-transform transform hover:scale-105 duration-300">
			{/* Imagem do Produto */}
			<img
				src={produto.foto}
				alt={produto.nome}
				className="w-full h-48 object-cover rounded-lg mb-4"
				onError={(e) => {
					e.currentTarget.src = "https://i.imgur.com/gUhA04p.png";
				}}
			/>

			{/* Corpo do Card com informações */}
			<div className="flex-grow">
				<h2 className="text-xl font-bold truncate">{produto.nome}</h2>
				<p className="text-sm text-gray-600 mt-1 h-10 overflow-hidden">
					{produto.descricao}
				</p>

				{/* Preço com a nova cor principal */}
				<p className="text-[#e54300] font-bold text-2xl mt-2">
					{produto.preco.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}
				</p>
			</div>

			{/* Ações do Card (Editar e Deletar) */}
			<div className="flex justify-end items-center mt-4 gap-4 border-t border-gray-200 pt-4">
				{/* Ícone de editar com a nova cor */}
				<Link
					to={`/editarproduto/${produto.id}`}
					className="text-[#e54300] hover:text-[#bf3700] transition-colors"
					title="Editar Produto"
				>
					<FaEdit size={20} />
				</Link>

				{/* Mantive o ícone de deletar em vermelho, pois é uma cor padrão para ações destrutivas */}
				<button
					onClick={() => produto.id !== undefined && onDelete(produto.id)}
					className="text-red-500 hover:text-red-700 transition-colors"
					title="Deletar Produto"
				>
					<FaTrash size={20} />
				</button>
			</div>
		</div>
	);
}
