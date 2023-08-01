import { render, screen } from '@testing-library/react';
import Menu from './index';

// GET: retorna elemento que já foi renderizado, caso não encontre é dado como falha.
// Bom para validar se o elemento foi carregado em tela

test('Deve renderizar um link para a página inicial', () => {
  render(<Menu />);
  const linkPaginaInicial = screen.getByText('Inicial');
  expect(linkPaginaInicial).toBeInTheDocument();
});

// GET ALL: retorna um ARRAY de elementos que já foram renderizados, caso não encontre é dado como falha.
// Bom para validar se os elementos foram carregados em tela

test('Deve renderizar uma lista de links', () => {
  render(<Menu />);
  const listaDeLinks = screen.getAllByRole('link');
  expect(listaDeLinks).toHaveLength(4);
});

// QUERY: retorna o elemento caso encontrado ou não o encontrando retorna null
// Bom para validar se o elemento foi ou NÃO foi carregado em tela

test('Não deve renderizar link para Extrato', () => {
  render(<Menu />);
  const linkExtrato = screen.queryByText('Extrato');
  expect(linkExtrato).not.toBeInTheDocument();
});

// FIND: retorna uma promise
// Bom para testar função assíncronas, ou seja validar elementos que não foram carregados na tela

// ----------------------------------------------------------------
// Leonardo Brizolla - 28/07/2023 20:40

// TESTANDO: componentes de interface, exemplo: CLASSES CSS + SNAPSHOT
// Sempre recomendado utilizar o teste de snapshot com outro expect
// Um teste sozinho de snapshot não é suficiente

test('Deve renderizar uma lista de links com a classe link', () => {
  render(<Menu />);
  const links = screen.getAllByRole('link');
  links.forEach((link) => expect(link).toHaveClass('link'));
  expect(links).toMatchSnapshot();
});
