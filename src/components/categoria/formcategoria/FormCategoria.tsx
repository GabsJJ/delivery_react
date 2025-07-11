import {
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { atualizar, buscar, cadastrar } from "@/services/Service";

function FormCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
    produtos: [],
  });

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id);
    } else {
      setCategoria({
        id: undefined,
        nome: "",
        descricao: "",
      });
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/categoria", categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("O Tema foi atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o tema!", "erro");
          console.error(error);
        }
      }
    } else {
      try {
        await cadastrar("/categoria", categoria, setCategoria, {
          headers: { Authorization: token },
        });

        ToastAlerta("O Tema foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o tema!", "erro");
          console.error(error);
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.nome}
            onChange={atualizarEstado}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            placeholder="Descreva a categoria"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.descricao}
            onChange={atualizarEstado}
            required
          />
        </div>
        <button
          className="rounded text-white bg-orange-500 hover:bg-orange-700 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
