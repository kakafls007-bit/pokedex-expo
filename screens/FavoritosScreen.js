import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CartaoPokemon from '../components/CartaoPokemon';
import { useApp } from '../contexts/AppContext';

export default function FavoritosScreen({ navigation }) {
  const { pokemons, favoritos, alternarFavorito } = useApp();
  const lista = pokemons.filter((p) => favoritos.includes(p.id));

  return (
    <View style={estilos.tela}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={estilos.linha}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Você ainda não favoritou nenhum Pokémon. Toque no coração na lista.
          </Text>
        }
        renderItem={({ item }) => (
          <CartaoPokemon
            pokemon={item}
            favorito
            onPress={() => navigation.navigate('Detalhes', { pokemon: item })}
            onFavoritar={() => alternarFavorito(item.id)}
          />
        )}
      />
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
  linha: {
    justifyContent: 'space-between',
  },
  vazio: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 40,
  },
});