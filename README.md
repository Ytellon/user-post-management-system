# Sistema de Gestão de Usuários e Postagens com Angular

Este é um projeto Angular que implementa um sistema de gestão de usuários e postagens com uma interface de usuário amigável. O sistema inclui funcionalidades de CRUD para usuários e postagens, bem como recursos de pesquisa e paginação. Ele se integra à API pública GoREST para obter e manipular dados.

## Funcionalidades

### Usuários

- Listar, cadastrar, editar e deletar usuários.
- Paginação para a tela de listagem de usuários.
- Pesquisa por nome ou e-mail de usuários.

### Postagens

- Listar, cadastrar, editar e deletar postagens.
- Paginação para a tela de listagem de postagens.
- No formulário de cadastro de postagens, é possível pesquisar e selecionar o usuário através de um campo de autocomplete.
- Pesquisa por título da postagem ou nome do usuário.



## Documentação da API

A documentação da API utilizada no projeto está disponível em [Documentação da API GoREST](https://gorest.co.in/).

## Requisitos

Certifique-se de ter o Angular CLI instalado globalmente em sua máquina.



## Configuração

Clone este repositório em seu ambiente local.

```
git clone git@github.com:Ytellon/user-post-management-system.git
```

Navegue até o diretório do projeto.

```
cd user-post-management-system
```

Execute `npm install` para instalar as dependências.

Configure o token de API no arquivo de configuração adequado.

Execute `ng serve` para iniciar o servidor de desenvolvimento.

Abra seu navegador e acesse `http://localhost:4200/` para usar o aplicativo.



> `Aviso: O token no arquivo environment.ts provavelmente está expirado, precisa acessar a documentação da API e gerar um outro. `




## Como Contribuir

Se você deseja contribuir para este projeto, siga estas etapas:

1. Fork este repositório.
2. Crie uma branch com uma descrição significativa do que deseja implementar ou corrigir.
3. Faça as alterações desejadas e adicione testes, se aplicável.
4. Envie um pull request, explicando suas alterações e por que elas são necessárias.



## Autor

[@Ytellon]

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
