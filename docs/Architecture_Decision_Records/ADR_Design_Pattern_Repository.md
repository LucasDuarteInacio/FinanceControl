# Padrão Repository

# Status

**Aceita**

# Contexto

Para facilitar o gerenciamento de bancos o sistema utilizará o padrão repository para cuidar da camada de acesso a dados do sistema

# Decisão

Todas as entidades terão uma classe de repositório que será responsável por realizar todas as operações de banco de dados independente do opção de banco de dados escolhida.

# Consequências

Uma alteração do banco de dados utilizado não impactara no software que não sofrera alteração em uma possível mudança de banco de dados.




