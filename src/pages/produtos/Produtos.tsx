// src/pages/Produtos.tsx

import CardProduto from "@/components/produtos/CardProduto";
import { AuthContext } from "@/contexts/AuthContext";
import type Produto from "@/models/Produto";
import { buscar, deletar } from "@/service/Service";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Verifique o caminho se necessário
import Swal from "sweetalert2";

export default function ProdutosPage() {
	const navigate = useNavigate();

	const [produtos, setProdutos] = useState<Produto[]>([]);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	// ... (lógica de fetchProdutos e useEffect continua a mesma)
	async function fetchProdutos() {
		try {
			await buscar("/produtos", setProdutos, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
			toast.error("Erro ao buscar produtos.");
		}
	}

	useEffect(() => {
		fetchProdutos();
	}, []);

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado para acessar essa página.");
			navigate("/login");
		}
	}, [token]);

	// Função para deletar um produto com SweetAlert2 e novas cores
	async function handleDelete(id: number) {
		Swal.fire({
			title: "Você tem certeza?",
			text: "Esta ação não poderá ser desfeita!",
			icon: "warning",
			showCancelButton: true,
			// Cores dos botões do alerta atualizadas
			confirmButtonColor: "#e54300",
			cancelButtonColor: "#6e7881",
			confirmButtonText: "Sim, apagar!",
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deletar(`/produtos/${id}`, {
						headers: { Authorization: token },
					});
					toast.success("Produto apagado com sucesso!");
					fetchProdutos();
				} catch (error: any) {
					toast.error("Erro ao apagar o produto.");
				}
			}
		});
	}

	return (
		<div className="container mx-auto py-12 px-4">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800">Nossos Produtos</h1>
				<Link
					to="/novoproduto"
					// Cores do botão de cadastro atualizadas
					className="bg-[#e54300] hover:bg-[#bf3700] text-white font-bold py-2 px-4 rounded-md transition-colors"
				>
					Cadastrar Novo Produto
				</Link>
			</div>

			{produtos.length === 0 ? (
				<p className="text-center text-gray-500 mt-16">
					Nenhum produto encontrado...
				</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{produtos.map((produto) => (
						<CardProduto
							key={produto.id}
							produto={produto}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
}
