import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

// A API devolve a URL de cada Pokémon. O número dele é o último pedaço dela.
function pegarId(url) {
  const partes = url.split('/').filter(Boolean);
  return partes[partes.length - 1];
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch(API_URL);
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}`);
      }
      const dados = await resposta.json();

      const lista = dados.results.map((item) => {
        const id = pegarId(item.url);
        return {
          id,
          nome: item.name,
          imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });

      setPokemons(lista);
    } catch (e) {
      setErro('Não foi possível carregar os dados. Verifique sua internet.');
    } finally {
      setCarregando(false);
    }
  }, []);

  // Roda uma vez, quando o app abre
  useEffect(() => {
    carregar();
  }, [carregar]);

  const filtrados = pokemons.filter((p) =>
    p.nome.includes(busca.toLowerCase().trim())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.titulo}>Pokédex</Text>

      <TextInput
        style={styles.busca}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#9ca3af"
        value={busca}
        onChangeText={setBusca}
        autoCapitalize="none"
      />

      {carregando && pokemons.length === 0 ? (
        <ActivityIndicator size="large" color="#facc15" style={{ marginTop: 40 }} />
      ) : erro ? (
        <View style={styles.centro}>
          <Text style={styles.erro}>{erro}</Text>
          <TouchableOpacity style={styles.botao} onPress={carregar}>
            <Text style={styles.botaoTexto}>Tentar de novo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.linha}
          refreshing={carregando}
          onRefresh={carregar}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum Pokémon encontrado.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <Text style={styles.nome}>{capitalizar(item.nome)}</Text>
              <Text style={styles.numero}>#{item.id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  busca: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  linha: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  imagem: {
    width: 96,
    height: 96,
  },
  nome: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  numero: {
    color: '#9ca3af',
    fontSize: 13,
  },
  centro: {
    alignItems: 'center',
    marginTop: 40,
  },
  erro: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#facc15',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#111827',
    fontWeight: 'bold',
  },
  vazio: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 40,
  },
});