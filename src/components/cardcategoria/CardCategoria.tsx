import type Categoria from "@/models/Categoria";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { TrashSimple } from "@phosphor-icons/react/dist/icons/TrashSimple";
import { PencilSimple } from "@phosphor-icons/react/dist/icons/PencilSimple";

interface CardCategoriaProps {
	categoria: Categoria;
}

export default function CardCategoria({ categoria }: CardCategoriaProps) {
	return (
		<Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="flex">
				<CardTitle>{categoria.nome}</CardTitle>
			</CardHeader>

			<CardContent>
				<CardDescription className="flex text-left gap-2">
					<span className="font-bold">Descrição: </span>
					{categoria.descricao}
				</CardDescription>
			</CardContent>

			<CardFooter className="flex justify-end gap-2">
				<Button className="bg-green-600 hover:bg-green-700 text-white">
					<PencilSimple size={24} color="#fafafa" />
					Editar
				</Button>
				<Button className="bg-red-500 hover:bg-red-700 text-white">
					<TrashSimple size={24} color="#fafafa" />
					Excluir
				</Button>
			</CardFooter>
		</Card>
	);
}
