import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { cadastrarUsuario } from "@/service/Service";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type Usuario from "@/models/Usuario";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [usuario, setUsuario] = useState<Omit<Usuario, "id">>({
    nome: "",
    usuario: "",
    senha: "",
    dataNascimento: "",
    foto: "",
    telefone: "",
    tipo: 0,
  });

  // Atualiza estado do usuário de forma segura
  const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let valorCorrigido: string | number = value;

    if (name === "dataNascimento") {
      valorCorrigido = value.split("T")[0].replace(/\//g, "-");
    } else if (name === "tipo") {
      const numeroTipo = parseInt(value);
      valorCorrigido = isNaN(numeroTipo) ? 0 : numeroTipo;
    }

    setUsuario((prev) => ({
      ...prev,
      [name]: valorCorrigido,
    }));
  };

  const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmaSenha(e.target.value);
  };

  const cadastrarNovoUsuario = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senhaValida = usuario.senha.length >= 8;
    const senhasConferem = usuario.senha === confirmaSenha;

    if (senhaValida && senhasConferem) {
      setIsLoading(true);
      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, () => {});
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      } catch (error) {
        alert("Erro ao cadastrar o usuário. Verifique os dados.");
        console.error("Erro de cadastro:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert(
        "Senha precisa ter no mínimo 8 caracteres e coincidir com a confirmação."
      );
      setUsuario((prev) => ({ ...prev, senha: "" }));
      setConfirmaSenha("");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen place-items-center">
      <div className="hidden lg:block fundoCadastro" />
      <Card className="w-[90%] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Cadastrar</CardTitle>
        </CardHeader>

        <form
          onSubmit={cadastrarNovoUsuario}
          className="flex flex-col gap-4 px-6 pb-6"
        >
          {[
            { id: "nome", label: "Nome", value: usuario.nome },
            { id: "usuario", label: "Usuário", value: usuario.usuario },
            { id: "foto", label: "Foto", value: usuario.foto },
            { id: "telefone", label: "Telefone", value: usuario.telefone },
            {
              id: "dataNascimento",
              label: "Data de Nascimento",
              value: usuario.dataNascimento,
              type: "date",
            },
            {
              id: "senha",
              label: "Senha",
              value: usuario.senha,
              type: "password",
            },
          ].map(({ id, label, value, type = "text" }) => (
            <div key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                name={id}
                type={type}
                placeholder={label}
                value={value}
                onChange={atualizarEstado}
              />
            </div>
          ))}

          <div>
            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Confirmar Senha"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Input
              id="tipo"
              name="tipo"
              type="number"
              placeholder="0 para padrão"
              value={usuario.tipo === 0 ? "" : usuario.tipo}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <Button
              type="reset"
              variant="destructive"
              className="w-1/2"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-1/2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Cadastro;
