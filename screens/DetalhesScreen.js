import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, List, Text } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
import { capitalizar, urlArte } from '../utils';

export default function DetalhesScreen({ route }) {
  const { pokemon } = route.params;
  const { favoritos, alternarFavorito } = useApp();
  const favorito = favoritos.includes(pokemon.id);

  const [detalhe, setDetalhe] = useState(null);
  const [status, setStatus] = useState('carregando'); // carregando, ok ou erro

  const carregar = useCallback(async () => {
    setStatus('carregando');
    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
      if (!resposta.ok) {
        throw new Error('Erro ' + resposta.status);
      }
      const json = await resposta.json();
      setDetalhe({
        tipos: json.types.map((t) => t.type.name),
        altura: json.height / 10,
        peso: json.weight / 10,
        habilidades: json.abilities.map((a) => a.ability.name),
      });
      setStatus('ok');
    } catch (e) {
      setStatus('erro');
    }
  }, [pokemon.id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Card style={estilos.card}>
        <Image source={{ uri: urlArte(pokemon.id) }} style={estilos.imagem} />
        <Card.Title
          title={capitalizar(pokemon.nome)}
          subtitle={`#${pokemon.id}`}
          titleVariant="headlineSmall"
        />
        <Card.Content>
          {status === 'carregando' && <ActivityIndicator color="#facc15" />}

          {status === 'erro' && (
            <View style={estilos.centro}>
              <Text style={estilos.erro}>Não foi possível carregar os detalhes.</Text>
              <Button mode="contained" onPress={carregar}>
                Tentar de novo
              </Button>
            </View>
          )}

          {status === 'ok' && detalhe && (
            <View>
              <View style={estilos.tipos}>
                {detalhe.tipos.map((tipo) => (
                  <Chip key={tipo}>{capitalizar(tipo)}</Chip>
                ))}
              </View>
              <List.Item
                title="Altura"
                description={`${detalhe.altura.toLocaleString('pt-BR')} m`}
                left={(props) => <List.Icon {...props} icon="human-male-height" />}
              />
              <List.Item
                title="Peso"
                description={`${detalhe.peso.toLocaleString('pt-BR')} kg`}
                left={(props) => <List.Icon {...props} icon="weight-kilogram" />}
              />
              <List.Item
                title="Habilidades"
                description={detalhe.habilidades.map(capitalizar).join(', ')}
                left={(props) => <List.Icon {...props} icon="flash" />}
              />
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            mode={favorito ? 'outlined' : 'contained'}
            icon={favorito ? 'heart-off' : 'heart'}
            onPress={() => alternarFavorito(pokemon.id)}
          >
            {favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#111827',
  },
  conteudo: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1f2937',
  },
  imagem: {
    width: '100%',
    height: 240,
    resizeMode: 'contain',
    marginTop: 12,
  },
  tipos: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  centro: {
    alignItems: 'center',
  },
  erro: {
    color: '#ffffff',
    marginBottom: 12,
  },
});