/**
 * Desafio: escrever uma função que valide se uma palavra é valida em um tabuleiro de Parole.
 * A função irá receber dois argumentos:
 * - Um array bi-dimensional (NxN) com letras de A a Z representando o tabuleiro
 * - Uma palavra que deve ser validada
 *
 * Palavras válidas são formadas por ligações adjacentes das letras (horizontas, vertical, diagonal) sem reutilizar as posições usadas anteriormente.
 *
 * Exemplo de um valor de entrada:
 * [ ["I","L","A","W"],
 *   ["B","N","G","E"],
 *   ["I","U","A","O"],
 *   ["A","S","R","L"] ]
 *
 * Neste caso, podemos considerar:
 * - "BINGO", "ILNBIA", "LINGO" são palavras válidas.
 * - "BUNGIE", "SINUS", "BINS" são palavras inválidas.
 *
 * Não é necessário verificar se a palavra é real ou não, apenas se ela é valida no tabuleiro.
 *
 * Voce pode testar o seu codigo rodando o comando `npm test` no terminal
 * e tambem pode alterar o arquivo `index.test.js` se desejar.
 * Apos enviado, seu codigo sera validado com outros cenarios de teste tambem.
 *
 * @param tabuleiro array bidimensional representando o tabuleiro
 * @param palavra palavra que deve ser validada no tabuleiro
 * @returns `true` ou `false`, informando se a palavra é valida para o tabuleiro
 */
function parole(tabuleiro, palavra) {
  const N = tabuleiro.length;

  function searchWord(x, y, word) {
    if (word === '') {
      return true;
    }

    if (x < 0 || y < 0 || x >= N || y >= N || tabuleiro[x][y] !== word[0]) {
      return false;
    }

    const letter = tabuleiro[x][y];
    tabuleiro[x][y] = '#'; // marca a letra para não usar novamente

    const found =
      searchWord(x - 1, y, word.substring(1)) ||
      searchWord(x + 1, y, word.substring(1)) ||
      searchWord(x, y - 1, word.substring(1)) ||
      searchWord(x, y + 1, word.substring(1)) ||
      searchWord(x - 1, y - 1, word.substring(1)) ||
      searchWord(x - 1, y + 1, word.substring(1)) ||
      searchWord(x + 1, y - 1, word.substring(1)) ||
      searchWord(x + 1, y + 1, word.substring(1));

    tabuleiro[x][y] = letter; // desfaz a marcação

    return found;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (searchWord(i, j, palavra)) {
        return true;
      }
    }
  }

  return false;
}
