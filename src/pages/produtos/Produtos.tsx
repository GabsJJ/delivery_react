import ListaProdutos from "@/components/produtos/ListaProdutos";
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProdutosPage() {
	const navigate = useNavigate();
	return (
		<main className="mx-auto py-12 px-6 w-full">
			<div className="flex flex-col gap-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
					<Button
						onClick={() => navigate("/novoproduto")}
						className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-2 shadow-sm"
					>
						<PlusIcon size={20} weight="bold" />
						<p className="hidden md:flex">Novo Produto</p>
					</Button>
				</div>

				<div className="border-t border-gray-200 pt-4">
					<ListaProdutos />
				</div>
			</div>
		</main>
	)	
}
