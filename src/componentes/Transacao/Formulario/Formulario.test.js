import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from './index';

describe('Deve renderizar um campo de input', () => {
  test('no documento', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toBeInTheDocument();
  });

  test('com o type number', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toHaveAttribute('type', 'number');
  });

  test('que pode ser preenchido', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    userEvent.type(campoTexto, '50');
    expect(campoTexto).toHaveValue(50);
  });

  test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
    const realizarTransacao = jest.fn();

    render(<Formulario realizarTransacao={realizarTransacao} />);
    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(realizarTransacao).toHaveBeenCalledTimes(1);
  });

  test('Deve selecionar uma opção de transação', () => {
    render(<Formulario />);

    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, ['Depósito']);

    const optionDefault = screen.getByRole('option', {
      name: 'Selecione um tipo de transação',
    }).selected;
    const optionDeposito = screen.getByRole('option', {
      name: 'Depósito',
    }).selected;
    const optionTransferencia = screen.getByRole('option', {
      name: 'Transferência',
    }).selected;

    expect(optionDefault).toBe(false);
    expect(optionDeposito).toBe(true);
    expect(optionTransferencia).toBe(false);
  });
});
