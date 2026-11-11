import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';
import CartaoPokemon from '../components/CartaoPokemon';
import { useApp } from '../contexts/AppContext';

export default function ListaScreen({ navigation }) {
  const { pokemons, status, carregar, favoritos, alternarFavorito } = useApp();
  const [busca, setBusca] = useState('');

  const filtrados = pokemons.filter((p) =>
    p.nome.includes(busca.toLowerCase().trim())
  );

  return (
    <View style={estilos.tela}>
      <Searchbar
        placeholder="Buscar Pokémon..."
        value={busca}
        onChangeText={setBusca}
        autoCapitalize="none"
        style={estilos.busca}
      />

      {status === 'carregando' && pokemons.length === 0 && (
        <ActivityIndicator size="large" color="#facc15" style={{ marginTop: 40 }} />
      )}

      {status === 'erro' && pokemons.length === 0 && (
        <View style={estilos.centro}>
          <Text style={estilos.erro}>
            Não foi possível carregar os dados. Verifique sua internet.
          </Text>
          <Button mode="contained" onPress={carregar}>
            Tentar de novo
          </Button>
        </View>
      )}

      {pokemons.length > 0 && (
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={estilos.linha}
          refreshing={status === 'carregando'}
          onRefresh={carregar}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhum Pokémon encontrado.</Text>}
          renderItem={({ item }) => (
            <CartaoPokemon
              pokemon={item}
              favorito={favoritos.includes(item.id)}
              onPress={() => navigation.navigate('Detalhes', { pokemon: item })}
              onFavoritar={() => alternarFavorito(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  busca: {
    backgroundColor: '#1f2937',
    marginBottom: 12,
  },
  linha: {
    justifyContent: 'space-between',
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
  vazio: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 40,
  },
});