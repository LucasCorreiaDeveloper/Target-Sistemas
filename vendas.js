const fs = require("fs");  /*Require comando usado para definir aquilo que queremos buscar, no caso a ferramenta "fs" que permite abrir e ler arquivos no computador   */
const path = require("path");  /* Mostra o endereço do arquivo para o programa encontrar   */ 

const { vendas } = JSON.parse(
fs.readFileSync(path.join(__dirname, "vendas.json"), "utf8"),
);

const brl = (n) =>
n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const arredondar = (n) => Math.round(n * 100) / 100;

// Regra de comissão de uma venda
function calcularComissao(valor) {
  if (valor < 100) return 0; // abaixo de 100: sem comissão
  if (valor < 500) return valor * 0.01; // de 100 até 499,99: 1%
  return valor * 0.05; // a partir de 500: 5%
}

// Agrupa por vendedor
const resultado = {};
for (const { vendedor, valor } of vendas) {
if (!resultado[vendedor]) {
    resultado[vendedor] = { totalVendido: 0, comissao: 0 };
}
resultado[vendedor].totalVendido += valor;
resultado[vendedor].comissao += arredondar(calcularComissao(valor));
}

console.log("=== COMISSÃO POR VENDEDOR ===\n");
for (const [vendedor, dados] of Object.entries(resultado)) {
console.log(vendedor);
console.log(`  Total vendido: ${brl(arredondar(dados.totalVendido))}`);
console.log(`  Comissão:      ${brl(arredondar(dados.comissao))}\n`);
}
