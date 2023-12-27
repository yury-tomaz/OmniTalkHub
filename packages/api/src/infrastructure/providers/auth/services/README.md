# Provedor de autenticação Keycloak (OpenID Connect)

O provedor de autenticação Keycloak é um provedor de autenticação que utiliza o protocolo OpenID Connect para autenticar usuários.

## Configuração

Para configurar o provedor de autenticação Keycloak, é necessário definir as seguintes variáveis de ambiente:

- `KEYCLOAK_URL`: URL do servidor Keycloak.
- `KEYCLOAK_REALM`: Realm do administrador do Keycloak.
- `KEYCLOAK_CLIENT_ID`: Client ID do administrador do Keycloak.
- `KEYCLOAK_CLIENT_SECRET`: Client secret do administrador do Keycloak.
