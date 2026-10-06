const fs = require("fs");
const path = require("path");

const { estoque } = JSON.parse(
    fs.readFileSync(path.join(__dirname, "estoque.json"), "utf8")
);

const movimentacoesData = JSON.parse(fs.readFileSync(path.join(__dirname, "movimentacoes.json"), "utf8"));
const movimentacoes = movimentacoesData.movimentacoes;

let proximoId = 1;
if (movimentacoes.length > 0 ) {
    proximoId = Math.max (...movimentacoes.map(movimentacao => movimentacao.id) ) +1 ;
}

function salvarEstoque(estoque) {
    fs.writeFileSync(path.join(__dirname, "estoque.json"), JSON.stringify({ estoque }, null, 2), "utf8");
}

function salvarMovimentacoes(movimentacoes) {
    fs.writeFileSync(path.join(__dirname, "movimentacoes.json"), JSON.stringify({ movimentacoes }, null, 2), "utf8");
}

function listarEstoque(estoque) {
    for (const produto of estoque) {
        console.log(`Código: ${produto.codigoProduto}, Descrição: ${produto.descricaoProduto}, Quantidade: ${produto.estoque}`);
    }
}

function darEntradaProduto(estoque, codigo, quantidade) {
    const produto = estoque.find(item => item.codigoProduto === codigo);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    produto.estoque += quantidade;

    const movimentacao = {
        id: proximoId++,
        tipo: "ENTRADA",
        codigoProduto: produto.codigoProduto,
        descricaoProduto: produto.descricaoProduto,
        quantidadeMovimentada: quantidade,
        estoqueFinal: produto.estoque
    };

    movimentacoes.push(movimentacao);

    salvarEstoque(estoque);
    salvarMovimentacoes(movimentacoes);

    console.log("\n=== MOVIMENTAÇÃO REALIZADA ===");
    console.log(`ID da movimentação: ${movimentacao.id}`);
    console.log(`Tipo: ${movimentacao.tipo}`);
    console.log(`Produto: ${movimentacao.descricaoProduto}`);
    console.log(`Quantidade adicionada: ${quantidade}`);
    console.log(`Estoque final: ${movimentacao.estoqueFinal}`);
}

function darSaidaProduto(estoque, codigo, quantidade) {
    const produto = estoque.find(item => item.codigoProduto === codigo);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    if (produto.estoque < quantidade) {
        console.log("Quantidade insuficiente em estoque.");
        return;
    }

    produto.estoque -= quantidade;

    const movimentacao = {
        id: proximoId++,
        tipo: "SAÍDA",
        codigoProduto: produto.codigoProduto,
        descricaoProduto: produto.descricaoProduto,
        quantidadeMovimentada: quantidade,
        estoqueFinal: produto.estoque
    };

    movimentacoes.push(movimentacao);

    salvarEstoque(estoque);
    salvarMovimentacoes(movimentacoes);

    console.log("\n=== MOVIMENTAÇÃO REALIZADA ===");
    console.log(`ID da movimentação: ${movimentacao.id}`);
    console.log(`Tipo: ${movimentacao.tipo}`);
    console.log(`Produto: ${movimentacao.descricaoProduto}`);
    console.log(`Quantidade retirada: ${quantidade}`);
    console.log(`Estoque final: ${movimentacao.estoqueFinal}`);
}

async function opcoesEstoque() {
    const readline = require("readline/promises");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    let opcao = "";

    while (opcao !== "0") {
        console.log("Escolha a opção desejada: \n");
        console.log("1 - LISTAR ESTOQUE");
        console.log("2 - DAR ENTRADA DE PRODUTO");
        console.log("3 - DAR SAÍDA DE PRODUTO");
        console.log("4 - SAIR");

        opcao = (await rl.question("Escolha uma opção: ")).trim();

        switch (opcao) {
            case "1":
                console.log("Listando estoque...\n");
                listarEstoque(estoque);
                break;

            case "2": {
                const codigoDigitado = await rl.question("Digite o código do produto: ");
                const codigo = Number(codigoDigitado);
                const produto = estoque.find(item => item.codigoProduto === codigo);

                if (!produto) {
                    console.log("Produto não encontrado.");
                    break;
                }

                console.log(`Produto encontrado: ${produto.descricaoProduto}, Quantidade em estoque: ${produto.estoque}`);

                const resposta = (await rl.question("Esse é o produto correto? (s/n): ")).trim().toLowerCase();
                if (resposta !== "s") {
                    console.log("Operação cancelada.");
                    break;
                }

                const quantidadeDigitada = await rl.question("Digite a quantidade a ser adicionada: ");
                const quantidade = parseInt(quantidadeDigitada, 10);
                darEntradaProduto(estoque, codigo, quantidade);
                break;
            }

            case "3": {
                const codigoDigitado = await rl.question("Digite o código do produto: ");
                const codigo = Number(codigoDigitado);
                const produto = estoque.find(item => item.codigoProduto === codigo);

                if (!produto) {
                    console.log("Produto não encontrado.");
                    break;
                }

                console.log(`Produto encontrado: ${produto.descricaoProduto}, Quantidade em estoque: ${produto.estoque}`);

                const resposta = (await rl.question("Esse é o produto correto? (s/n): ")).trim().toLowerCase();
                if (resposta !== "s") {
                    console.log("Operação cancelada.");
                    break;
                }

                const quantidadeDigitada = await rl.question("Digite a quantidade a ser retirada: ");
                const quantidade = parseInt(quantidadeDigitada, 10);
                darSaidaProduto(estoque, codigo, quantidade);
                break;
            }

            case "4":
                console.log("Saindo do programa...");
                opcao = "0";
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    }

    rl.close();
}

opcoesEstoque();
    