import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { AppProvider } from './contexts/AppContext';
import ListaScreen from './screens/ListaScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import { capitalizar } from './utils';

const Stack = createNativeStackNavigator();

const temaPaper = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#facc15',
    onPrimary: '#111827',
    background: '#111827',
    surface: '#1f2937',
  },
};

const temaNavegacao = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#facc15',
    background: '#111827',
    card: '#111827',
  },
};

export default function App() {
  return (
    <PaperProvider theme={temaPaper}>
      <AppProvider>
        <NavigationContainer theme={temaNavegacao}>
          <Stack.Navigator
            initialRouteName="Lista"
            screenOptions={{ headerTintColor: '#ffffff' }}
          >
            <Stack.Screen
              name="Lista"
              component={ListaScreen}
              options={({ navigation }) => ({
                title: 'Pokédex',
                headerRight: () => (
                  <IconButton
                    icon="heart"
                    iconColor="#ef4444"
                    onPress={() => navigation.navigate('Favoritos')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Detalhes"
              component={DetalhesScreen}
              options={({ route }) => ({ title: capitalizar(route.params.pokemon.nome) })}
            />
            <Stack.Screen
              name="Favoritos"
              component={FavoritosScreen}
              options={{ title: 'Favoritos' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}