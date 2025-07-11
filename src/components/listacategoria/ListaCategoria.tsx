import { useNavigate } from "react-router-dom";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useContext, useEffect, useState } from "react";
import type Categoria from "@/models/Categoria";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { buscar } from "@/services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function ListaCategoria() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	/*async function buscarCategorias() {
		try {
			setIsLoading(true);

			await buscar("/categoria", setCategorias, {
				headers: { Authorization: token },
			});
		} catch (error) {
			if (typeof error === 'string' && error.toString().includes("401")) {
				toast.error("Erro ao buscar categorias.");	
			}
		} finally {
			setIsLoading(false);
		}
	}*/

	useEffect(() => {
		if (token === "") {
			navigate("/login");
		toast.info("Você precisa estar logado para acessar essa página.");
		}
	}, [navigate, token]);

	useEffect(() => {
		async function buscarCategoriasLocal() {
			try {
				await buscar("/categoria", setCategorias, {
					headers: { Authorization: token },
				});
			} catch (error) {
				if (typeof error === 'string' && error.toString().includes("401")) {
					toast.error("Erro ao buscar categorias.");	
				}
			} finally {
				setIsLoading(false)
			}
		};
		buscarCategoriasLocal();
	}, [handleLogout, token]);

	return (
		<div className="flex justify-center items-center w-full my-4">
			<div className="container flex flex-col mx-2 justify-center items-center">
				{isLoading && (
					<RotatingLines
						strokeColor="white"
						strokeWidth="5"
						animationDuration="0.75"
						width="25"
						visible
					/>
				)}

				{!isLoading && categorias.length === 0 && (
					<span className="text-center text-gray-500 mt-16">
						Nenhuma categoria foi encontrada!
					</span>
				)}

				<div
					className="grid grid-cols-1 md:grid-cols-2 
								lg:grid-cols-3 gap-8"
				>
					{categorias.map((categoria) => (
						<CardCategoria key={categoria.id} categoria={categoria} />
					))}
				</div>
			</div>
		</div>
	);
}

export default ListaCategoria;
