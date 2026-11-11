// A API devolve a URL de cada Pokémon. O número dele é o último pedaço dela.
export function pegarId(url) {
  const partes = url.split('/').filter(Boolean);
  return partes[partes.length - 1];
}

export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const BASE_IMAGENS = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function urlImagem(id) {
  return `${BASE_IMAGENS}/${id}.png`;
}

export function urlArte(id) {
  return `${BASE_IMAGENS}/other/official-artwork/${id}.png`;
}