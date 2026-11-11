import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pegarId, urlImagem } from '../utils';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';
const CHAVE_FAVORITOS = '@pokedex:favoritos';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando, ok ou erro
  const [favoritos, setFavoritos] = useState([]);

  const carregar = useCallback(async () => {
    setStatus('carregando');
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) {
        throw new Error('Erro ' + resposta.status);
      }
      const dados = await resposta.json();
      const lista = dados.results.map((item) => {
        const id = pegarId(item.url);
        return { id, nome: item.name, imagem: urlImagem(id) };
      });
      setPokemons(lista);
      setStatus('ok');
    } catch (e) {
      setStatus('erro');
    }
  }, []);

  useEffect(() => {
    carregar();
    // lê os favoritos salvos no aparelho
    AsyncStorage.getItem(CHAVE_FAVORITOS)
      .then((valor) => {
        if (valor) {
          setFavoritos(JSON.parse(valor));
        }
      })
      .catch(() => {});
  }, [carregar]);

  function alternarFavorito(id) {
    const novos = favoritos.includes(id)
      ? favoritos.filter((f) => f !== id)
      : [...favoritos, id];
    setFavoritos(novos);
    // salva no aparelho
    AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novos)).catch(() => {});
  }

  return (
    <AppContext.Provider
      value={{ pokemons, status, carregar, favoritos, alternarFavorito }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}