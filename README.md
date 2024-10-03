##Documentação Básica##


[Estrutura do Projeto]

/src
  /controllers          # Controladores para gerenciar a lógica das rotas
  /middlewares          # Middlewares para autenticação e outras funções
  /services             # Lógica de negócios, comunicação com o Prisma
  /routes               # Definições de rotas da API
  /models               # Configurações do Prisma Client
  /utils                # Funções utilitárias (hashing, tokenização)
app.js                  # Ponto de entrada do aplicativo
package.json            # Configurações e dependências do projeto


Descrição das Funcionalidades
Autenticação (Auth)

Token: Gera e verifica tokens JWT.
Middleware: Verifica se o usuário está autenticado.
Usuários (User)

Registro: Permite que novos usuários se registrem e geram um JWT.
Login: Autentica usuários e retorna um token.
Notas (Note)

CRUD: Permite criar, listar, atualizar e deletar notas.
Remover Grupo: Remove a associação de uma nota a um grupo.
Grupos (Group)

CRUD: Permite criar, listar e deletar grupos.

Em alguns lugares, você está tratando erros com um console.error, mas não está retornando informações detalhadas no erro (como no removeGroupFromNote). Para melhorar a experiência do desenvolvedor, você pode adicionar mais contexto ao erro.
Exemplo: console.error('Failed to remove group from note:', error);
Validação de Entrada:

Você não está realizando validação de entrada para as requisições. Considere usar bibliotecas como Joi ou Yup para validar as informações recebidas no corpo das requisições, especialmente para dados sensíveis como senhas e e-mails.
Uso de parseInt:

Quando você usa parseInt, pode ser útil verificar se o valor fornecido é realmente um número válido. Por exemplo, você pode fazer uma verificação antes de chamar parseInt para evitar erros.
Segurança:

No hash.js, o número de iterações do salt é fixo em 10. Considere configurar isso como uma variável de ambiente para permitir ajustes futuros.
Autenticação:

No middleware auth, você poderia adicionar um verificador para garantir que o token JWT não esteja expirado antes de usá-lo. Isso ajudaria a evitar erros em chamadas subsequentes.
Documentação Adicional:

Considere usar ferramentas como Swagger ou Postman para gerar documentação da API. Isso torna mais fácil para outros desenvolvedores entenderem como interagir com sua API.
Testes:

Não há testes automatizados no seu projeto. Considere adicionar testes unitários e de integração usando bibliotecas como Jest ou Mocha. Isso ajudará a garantir que seu código funcione conforme esperado.




Exemplos de Testes com Postman ou REST Client
Aqui estão exemplos de testes que você pode usar no Postman ou no REST Client do VSCode.

1. Registrar Usuário
http
Copiar código
POST http://localhost:3000/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
2. Login de Usuário
http
Copiar código
POST http://localhost:3000/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
3. Criar Nota
http
Copiar código
POST http://localhost:3000/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nota Exemplo",
  "body": "Conteúdo da nota",
  "groupId": 1
}
4. Listar Notas
http
Copiar código
GET http://localhost:3000/notes?search=Exemplo
Authorization: Bearer <token>
5. Atualizar Nota
http
Copiar código
PUT http://localhost:3000/notes/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nota Atualizada",
  "body": "Novo conteúdo da nota",
  "groupId": 1
}
6. Deletar Nota
http
Copiar código
DELETE http://localhost:3000/notes/1
Authorization: Bearer <token>
7. Remover Grupo de uma Nota
http
Copiar código
PATCH http://localhost:3000/notes/1/remove-group
Authorization: Bearer <token>
8. Criar Grupo
http
Copiar código
POST http://localhost:3000/groups
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Grupo Exemplo"
}
9. Listar Grupos
http
Copiar código
GET http://localhost:3000/groups?search=Exemplo
Authorization: Bearer <token>
10. Deletar Grupo
http
Copiar código
DELETE http://localhost:3000/groups/1
Authorization: Bearer <token>
Observações
Substitua <token> pelo token JWT que você obtém após o login.
Certifique-se de que o servidor está em execução (node app.js) antes de fazer as requisições.
Para testar a autenticação, primeiro você precisa registrar um usuário e, em seguida, fazer o login para obter o token.