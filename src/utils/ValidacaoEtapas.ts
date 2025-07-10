import type { DeepRequired } from "react-hook-form";
import * as yup from "yup";

// Constante de idade mínima
const minAge = 13;

// Etapa 1
export const step1Schema = yup.object({
  nome: yup
    .string()
    .required("Nome completo é obrigatório")
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .default(""),

  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .test("idade-minima", `É necessário ter no mínimo ${minAge} anos.`, function (value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      if (isNaN(birthDate.getTime()) || birthDate > today) return false;

      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

      return age >= minAge;
    })
    .default(new Date()),
});

// Etapa 2
export const step2Schema = yup.object({
  usuario: yup
    .string()
    .required("Email é obrigatório")
    .email("Formato de email inválido")
    .default(""),

  telefone: yup
    .string()
    .notRequired()
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Formato de telefone inválido")
    .default(""),
});

// Etapa 3
export const step3Schema = yup.object({
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "A senha precisa conter maiúscula, minúscula, número e símbolo"
    )
    .default(""),

  confirmaSenha: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .default(""),
});

// Etapa 4
export const step4Schema = yup.object({
  foto: yup
    .string()
    .url("A URL da foto é inválida")
    .notRequired()
    .default(""),

  tipo: yup
    .number()
    .default(0),

  aceitaTermos: yup
    .boolean()
    .oneOf([true], "Você deve aceitar os termos para continuar")
    .default(false),
});

// Schema completo com tipagem explícita
export const fullCadastroSchema = yup.object({
  nome: step1Schema.fields.nome as yup.StringSchema<string>,
  dataNascimento: step1Schema.fields.dataNascimento as yup.DateSchema<Date>,
  usuario: step2Schema.fields.usuario as yup.StringSchema<string>,
  telefone: step2Schema.fields.telefone as yup.StringSchema<string>,
  senha: step3Schema.fields.senha as yup.StringSchema<string>,
  confirmaSenha: step3Schema.fields.confirmaSenha as yup.StringSchema<string>,
  foto: step4Schema.fields.foto as yup.StringSchema<string>,
  tipo: step4Schema.fields.tipo as yup.NumberSchema<number>,
  aceitaTermos: step4Schema.fields.aceitaTermos as yup.BooleanSchema<boolean>,
});

// Tipagem do formulário
export type FormDataType = DeepRequired<yup.InferType<typeof fullCadastroSchema>>;

// Export agrupado por etapas
export const schemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
};