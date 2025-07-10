import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategoria() {
	return (
		<div className="flex justify-center w-full my-4">
			<div className="container flex flex-col mx-2">
				<div
					className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8"
				>
          <CardCategoria categoria={null} />
          <CardCategoria categoria={null} /> 
          <CardCategoria categoria={null} />
          <CardCategoria categoria={null} />
          <CardCategoria categoria={null} />
          <CardCategoria categoria={null} />
				</div>
			</div>
		</div>
	);
}

export default ListaCategoria;
