# HeroDex Manager 🌟

Uma aplicação frontend Angular para gerenciar um universo de super-heróis e seus superpoderes. A aplicação permite listar, cadastrar, editar e remover super-heróis, além de gerenciar seus superpoderes.

## 📋 Sobre o Projeto

HeroDex Manager é a interface frontend que complementa uma API criada para o gerenciamento de super-heróis. Com uma interface amigável e responsiva, oferece uma maneira eficaz de manter o controle sobre os heróis e seus poderes.

### ✨ Funcionalidades

- 🦸‍♂️ **Gerenciamento de Super-Heróis**
  - Listar, cadastrar, editar e remover super-heróis
  - Visualizar detalhes dos super-heróis
  
- ⚡ **Gerenciamento de Superpoderes**
  - Adicionar novos poderes aos heróis

## 🏗️ Estrutura do Projeto

- **Componentes**
  - _Home_: Página inicial com estatísticas de heróis e poderes
  - _Hero List_: Exibe todos os super-heróis registrados
  - _Hero Form_: Formulário para criação e edição de heróis
  - _Hero Details_: Detalhes de um super-herói específico

- **Serviços**
  - _SuperHeroesService_: Comunicação com API para operações de heróis

- **Rotas**
  - `/home`: Página inicial
  - `/heroes`: Lista de heróis
  - `/heroes/new`: Cadastro de novo herói
  - `/heroes/:id`: Edição de herói
  - `/heroes/:id/details`: Detalhes de um herói

## 🛠️ Tecnologias Utilizadas

- **Framework**: Angular 20
- **Estilos**: Tailwind CSS
- **Notificações**: ngx-toastr, sweetalert2
- **ícones**: Lucide Angular

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/)
- [Angular CLI](https://cli.angular.io/)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/super-heroes-app.git
   cd super-heroes-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   ng serve
   ```

4. **Acesse a aplicação**
   - Navegue para `http://localhost:4200/`

## 🌐 Configuração

O endpoint da API é configurado no arquivo `environment.ts`:
```typescript
export const environment = {
  production: false,
  API_URL: 'https://localhost:7209/api',
};
```

## 🎨 Estilos

Os estilos da aplicação são geridos via Tailwind CSS, garantindo uma abordagem moderna e responsiva.

---

## Decisões de Projeto

A aplicação foi construída com Angular para garantir modularidade, escalabilidade e uma boa estrutura de rotas. Utilizei Tailwind CSS pela produtividade e facilidade em criar interfaces responsivas. Os componentes foram organizados por função para facilitar manutenção e reuso. A comunicação com a API é feita via serviços, centralizando as chamadas HTTP. Bibliotecas como ngx-toastr e sweetalert2 foram escolhidas para melhorar a experiência do usuário com feedbacks visuais claros.
