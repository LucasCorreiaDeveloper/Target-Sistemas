# Desafio de Programação em JavaScript (Node.js)

Três pequenos programas que resolvem problemas comuns de rotina comercial: **cálculo de comissão**, **controle de estoque** e **cálculo de juros por atraso**. Todos rodam no terminal e não precisam de bibliotecas externas.

## Tecnologias

- JavaScript (Node.js 18 ou superior)
- Módulos nativos do Node: `fs`, `path` e `readline`
- Dados em arquivos JSON

## Estrutura do projeto

```
desafio/
├── 1-comissao.js    # Programa 1: comissão dos vendedores
├── 2-estoque.js     # Programa 2: movimentação de estoque
├── 3-juros.js       # Programa 3: cálculo de juros
├── vendas.json      # Dados de vendas (entrada do programa 1)
├── estoque.json     # Estoque dos produtos (lido e atualizado pelo programa 2)
└── README.md
```

O arquivo `movimentacoes.json` é criado automaticamente na primeira movimentação de estoque.

## Como executar

1. Instale o [Node.js](https://nodejs.org) (versão 18 ou superior).
2. Baixe ou clone este repositório e abra a pasta no terminal.
3. Execute o programa desejado:

```bash
node 1-comissao.js
node 2-estoque.js
node 3-juros.js
```

---

## Programa 1: Comissão de vendedores

Lê o arquivo `vendas.json` e calcula a comissão de cada vendedor, aplicando a regra a **cada venda**:

| Valor da venda | Comissão |
|---|---|
| Abaixo de R$ 100,00 | Sem comissão |
| De R$ 100,00 até R$ 499,99 | 1% |
| A partir de R$ 500,00 | 5% |

**Como funciona:** o programa percorre todas as vendas, calcula a comissão de cada uma (arredondada para centavos) e soma o total vendido e a comissão por vendedor.

**Exemplo de saída:**

```
=== COMISSÃO POR VENDEDOR ===

João Silva
  Total vendido: R$ 10.754,70
  Comissão:      R$ 495,69

Maria Souza
  Total vendido: R$ 9.874,30
  Comissão:      R$ 465,96

Carlos Oliveira
  Total vendido: R$ 7.928,35
  Comissão:      R$ 379,38

Ana Lima
  Total vendido: R$ 8.763,95
  Comissão:      R$ 404,99
```

---

## Programa 2: Movimentação de estoque

Permite lançar **entradas** e **saídas** de mercadoria no depósito, usando como base os produtos do arquivo `estoque.json`.

**Cada movimentação possui:**

- Um **identificador único** (número sequencial, que continua de onde parou mesmo após fechar o programa)
- Uma **descrição** que identifica o tipo da movimentação (ex.: "Compra de fornecedor", "Venda balcão")
- Data e hora, produto, tipo (entrada ou saída), quantidade e **estoque final**

**Validações:**

- Não permite saída maior que o saldo disponível
- Não aceita quantidade zero, negativa ou decimal
- Exige descrição preenchida
- Avisa se o código do produto não existe

**Como usar:** o programa mostra a lista de produtos, e você informa o código, o tipo (1 = entrada, 2 = saída), a quantidade e a descrição. Para sair, digite `s` no campo do código.

**Exemplo de uso:**

```
Código do produto (ou "s" para sair): 101
Tipo [1] Entrada  [2] Saída: 1
Quantidade: 50
Descrição da movimentação: Compra de fornecedor

Movimentação #1 registrada (ENTRADA - Compra de fornecedor).
Estoque final de "Caneta Azul": 200
```

**Persistência:** o estoque atualizado é salvo em `estoque.json` e o histórico em `movimentacoes.json`.

---

## Programa 3: Cálculo de juros

A partir de um **valor** e de uma **data de vencimento**, calcula os juros até a data de hoje, considerando **2,5% ao dia** (juros simples).

**Fórmula:**

```
juros = valor × 0,025 × dias em atraso
```

**Observações:**

- Se a data de vencimento ainda não passou, os juros são zero.
- A data deve ser informada no formato `dd/mm/aaaa`.

**Exemplo** (valor de R$ 1.000,00 vencido há 5 dias):

```
Valor (ex: 1500.00): 1000
Data de vencimento (dd/mm/aaaa): 01/10/2026

Dias em atraso: 5
Juros (2,5% ao dia): R$ 125,00
Valor atualizado:    R$ 1.125,00
```

---

## Decisões de projeto

- **Arredondamento:** valores monetários são arredondados para 2 casas decimais para evitar imprecisão de números decimais em ponto flutuante.
- **Juros simples:** adotado por ser a interpretação mais direta do enunciado ("2,5% ao dia"). Para juros compostos, a fórmula seria `valor × (1,025^dias − 1)`.
- **Sem dependências:** apenas módulos nativos do Node.js, para o projeto rodar com um simples `node arquivo.js`.

## Autor

**Lucas da Silva Correia**
