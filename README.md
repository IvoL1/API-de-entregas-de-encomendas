app ->
server ->
middleware -->
errors ->
controllers ->
routes -->
Insomnia (validação de dados do body) ->
Bcrypt -> criar hash da senha antes de salvar no banco
auth -> validar dados do usuario na hora de logar/sessão (criar schema de logar) e criar o token (jwt)
verifyUserAuth -> verificar se o user tem permissão de acesso
