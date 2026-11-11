# Pokédex - Atividades Individuais 04 e 05

App mobile feito com React Native + Expo que consome a PokéAPI e exibe uma
lista de Pokémon com foto, nome e número.

## Funcionalidades

- Lista de 50 Pokémon vindos da API
- Busca por nome
- Navegação entre telas (Lista, Detalhes e Favoritos) com React Navigation
- Tela de detalhes com tipos, altura, peso e habilidades (segunda chamada à API)
- Interface estilizada com React Native Paper
- Favoritos salvos no aparelho com AsyncStorage (continuam ao fechar o app)
- Indicador de carregamento
- Tratamento de erro com botão para tentar de novo
- Puxar para atualizar

## API utilizada

PokéAPI: https://pokeapi.co/

## Como rodar

1. Instale o Node.js e o app Expo Go no celular
2. Clone o repositório e entre na pasta
3. Rode `npm install`
4. Rode `npx expo start` e escaneie o QR code com o Expo Go

## Estrutura

- `App.js`: tema do Paper e navegação entre as telas
- `contexts/AppContext.js`: chamada à API e favoritos (AsyncStorage)
- `screens/ListaScreen.js`: lista com busca
- `screens/DetalhesScreen.js`: detalhes do Pokémon
- `screens/FavoritosScreen.js`: Pokémon favoritados
- `components/CartaoPokemon.js`: cartão de cada Pokémon
- `utils.js`: funções auxiliares

## Tecnologias

React Native, Expo, React Navigation, React Native Paper, AsyncStorage, JavaScript

## Autor

Kauã Felipe Lopes Seabra