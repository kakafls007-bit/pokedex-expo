import { Image, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { capitalizar } from '../utils';

export default function CartaoPokemon({ pokemon, favorito, onPress, onFavoritar }) {
  return (
    <Card style={estilos.card} onPress={onPress}>
      <View style={estilos.coracao}>
        <IconButton
          icon={favorito ? 'heart' : 'heart-outline'}
          iconColor={favorito ? '#ef4444' : '#9ca3af'}
          size={22}
          onPress={onFavoritar}
        />
      </View>
      <Card.Content style={estilos.centro}>
        <Image source={{ uri: pokemon.imagem }} style={estilos.imagem} />
        <Text variant="titleMedium" style={estilos.nome}>
          {capitalizar(pokemon.nome)}
        </Text>
        <Text variant="bodySmall" style={estilos.numero}>
          #{pokemon.id}
        </Text>
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#1f2937',
    marginBottom: 12,
  },
  coracao: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  centro: {
    alignItems: 'center',
    paddingTop: 12,
  },
  imagem: {
    width: 96,
    height: 96,
  },
  nome: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  numero: {
    color: '#9ca3af',
  },
});