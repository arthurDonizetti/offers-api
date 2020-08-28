# **Offers API**

Essa API foi desenvolvida para o processo seletivo da vaga de Desenvolvedor(a) Web Back End da _edtech_ [Quero Educação](https://sobre.quero.com/)

> ## Link do projeto
O projeto foi disponibilizado no ambiente Heroku.

Segue link para consumo dos endpoints: https://interview-offers-api.herokuapp.com

> ## Tecnologias utilizadas
### Ferramentas
 - Typescript
 - Express
 - Jest
 - Sequelize
 - Postgre
 - JWT

### Padronizações
 - Eslint
 - Commit Msg Linter
 - Husky
 - Lint-staged

### Metodologias
 - Clean code
 - Clean Architecture
 - TDD

> ## Método de execução

No desenvolvimento desse projeto foram utilizadas tecnologias da plataforma [Node.Js](https://nodejs.org/en/).
Certifique-se então de instalá-lo pelo site oficial.

Instale também o gerenciador de pacotes da sua preferência.
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)

O escolhido na elaboração dessa API foi o npm.

Para execução deste projeto, execute o seguinte comando no seu terminal:

```
$ git clone https://github.com/arthurDonizetti/offers-api.git
$ cd offers-api
$ npm install
$ npm run dev
$ npm start
```

> ## Método de consumo

Para utilização dos endpoints, pode-se utilizar aplicativos como:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

Foram criados quatro endpoints para consumo:

## SignUp: 
```
https://interview-offers-api.herokuapp.com/api/signup
```
### Chamada:

```
{
    "name": string,
    "email": string,
    "password": string,
    "passwordConfirmation": string
}
```

Observação: Todos os campos são obrigatórios. E e-mail é um campo validado.

### Retorno:

Devolve os dados de um usuário cadastrado com valor de password hasheado

---

## Login: 
```
https://interview-offers-api.herokuapp.com/api/login
```
### Chamada:

```
{
    "email": string,
    "password": string,
}
```

Observação: Todos os campos são obrigatórios. E e-mail é um campo validado.

### Retorno:

Devolve o token gerado na autenticação de um usuário

---

## ListCourses: 
```
https://interview-offers-api.herokuapp.com/api/course/list
```
### Chamada:

```
{
    "university": string,
    "kind": string,
    "level": string,
    "shift": string
}
```

Observação: Os campos não são obrigatórios e são case insensitive, por se tratar de um fitro.

Campos _kind_, _level_ e _shift_ requerem valores específicos se utilizados.

```
_kind_ = [  'EaD', 'Presencial' ]

_level_ = [ 'Bacharelado', 'Licenciatura', 'Tecnólogo' ]

_shift_ = [ 'Manhã', 'Noite', 'Virtual' ]
```

### Retorno:

Retorna uma lista de cursos cadastrados e seus respectivos universidades e campus.

---

## ListOffers: 
```
https://interview-offers-api.herokuapp.com/api/course/offers
```
### Chamada:

```
{
    "university": string,
    "course": string,
    "city": string,
    "kind": string,
    "level": string,
    "shift": string,
    "price_with_discount_order_direction": string
}
```

Observação: Os campos não são obrigatórios e são case insensitive, por se tratar de um fitro.

Campos _kind_, _level_ e _shift_ seguem a mesma regra de valores do endpoint anterior.

O campo _price_with_discount_order_direction_ é um campo de ordenação. Ele também é limitado a receber apenas dois valores.

```
_price_with_discount_order_direction_ = [  'ASC', 'DESC' ]
```
### Retorno:

Retorna uma lista de ofertas de cursos cadastrados com seus respectivos universidades e campus.

---

> ## Melhorias futuras
Algumas implementações e melhorias não puderam sr adicionadas no momento, mas listo aqui as pendências e objetivos de melhoria para essa API:

1. Implantar caches nos endpoints de pesquisa;
2. Permitir a realização de _match_ dos filtros com valores sem necessidade de caracteres acentuados;
3. Refatorar a criação de modelos de associação do Sequelize de uma forma melhor;
4. Adicionar um LogControllerDecorator para gerenciamento de excessões lançadas;
5. Linkar os endpoints de pesquisa num _middleware_ de autenticação para validação do JWT;
6. Integração do Swagger para documentação desta API.