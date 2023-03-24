# React

## Projeto Original:
[trilha-react-desafio-4](https://github.com/digitalinnovationone/trilha-react-desafio-4)

## Desafio

Consite em aplicar as técnicas usadas na aula de validação de campos de formulário, ficou como desafio:

Enquantos os campos do formulário forem inválidos de alguma forma deixar o botão **Entrar desabilitado**.

## Demo: desafio concluído

![Untitled_ Mar 23, 2023 9_49 PM](https://user-images.githubusercontent.com/50967217/227398553-545bf32a-df54-4804-9aee-0391e7bde8de.gif)

## Solução

 > Como fazer o botão ENTRAR do formulário ser clicavel quando os campos forem preenchidos corretamente?
 
Analizando o código:

```js
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button title="Entrar" />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;

```
  
Essa função é responsavel por controlar o estado do formulario, o `isValid` é uma propriedade que indica se o formulário é válido ou não de acordo com o esquema de validação definido.

```js
const Login = () => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });
```
Sabendo disso, o instrutor sugere que no `Button` sejá passado o `disabled` para desabilita-lo enquento o estado do formulario for invalido. Como fazer isso?

Pela lógica se fizer desta forma `<Button title="Entrar" disabled={!isValid} />` era para funcionar as não funciona, `disabled` apresenta o seguinte erro:

```
Type '{ title: string; disabled: boolean; }' is not assignable to type 'IntrinsicAttributes & IButtonProps'.
  Property 'disabled' does not exist on type 'IntrinsicAttributes & IButtonProps'.ts(2322)
```

Erro apresentado durante o desenvolviento e o intrutor mostra uma solução para resolver, é criado uma interface `IButtonProps` para armazenar os atibutos não reconhecidos. Desta forma é só seguir a sugestão do err, na interface basta adicionar o `disabled`.

```js
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
}

```

Observe que a propriedade disabled foi adicionada à interface IButtonProps com o operador de interrogação ?, o que significa que é opcional.

Resolveu o problema? Não!

Mesmo assim, não funciona, não acontece nada, isso por que não sabia que precisava passar o `disabled` para dentro do componente.

```js
import { ButtonContainer } from "./styles";
import { IButtonProps } from "./types";

const Button = ({ title,onClick, disabled }: IButtonProps) => {
  return <ButtonContainer className={className} onClick={onClick}  disabled={disabled}>{title}</ButtonContainer>;
};

export default Button;
``` 
Só assim o botão **ENTRAR** funcionária, portanto resolvi dificultar as coisas, "se ja ta ruim, por que não piorar mais um pouco?" tentei passar um estilo.

Estilo do componete antes da mudança:

```js
import styled from 'styled-components';


export const ButtonContainer = styled.button`
    width: 100%;
    height: 42px;
    background-color: #81259D;
    color: #FFF;

    border: 1px solid #81259D;
    border-radius: 21px;

    &:hover {
        opacity: 0.6;
        cursor:pointer;
    }
`;
```
Depois com as alterações.

```js
export const ButtonContainer = styled.button`
    width: 100%;
    height: 42px;
    background-color: ${props => props.disabled ? '#ccc' : '#81259D'};
    color: #FFF;

    border: 1px solid #81259D;
    border-radius: 21px;

    &:hover {
        opacity: 0.6;
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
    }
    &.btn-invalid {
    background-color: #dc3545;
    cursor: default;
  }
`;
```
No arquivo principal tambem foi preciso criar a classe para mudar o estilo do butão `className={isValid ? '' : 'btn-invalid'}`.

Mas o atributo `className` tambem apresenta o erro já citado, para resolver basta criar o atributo na interface `` 

```js
export interface IButtonProps {
    title: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}
```

Isso tudo só foi possivel com o auxilio do chatGPT. 

