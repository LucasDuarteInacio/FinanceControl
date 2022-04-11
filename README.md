<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Projeto desenvolvido para a materia de Plataforma Node.JS do curso de Pós-Graduação Arquitetura de Software Distribuído</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição
Serviço de gerenciamento de investimentos.

## Instalação

```bash
# Instalando dependencias do projeto
$ npm install

# Conectando prisma ao projeto
$ npx prisma generate
```

## Rodando o APP

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Funções

- Conta
  - Criar contas
  - Editar contas
  - Deletar contas
  - Listar contas
  - Buscar conta por id

- Ativo
  - Criar ativos
  - Listar ativos
  - Editar ativos*
  - Deletar ativos*

- Operações
  - Realizar operações
  - Editar operações*
  - Deletar operações*
  - Listar operações*
- Dashboard
  - Graficos*
    - Ativo*
    - Setor*
    - Subsetor*
    - Classe*
    - Corretora*
  - Evolução patrimonial*

<!--## Author

 [Kamil Myśliwiec](https://kamilmysliwiec.com) -->


