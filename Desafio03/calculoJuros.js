const readline = require("readline/promises");

async function calcularJuros() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const valorDigitado = await rl.question("Digite o valor da conta: ");
    const dataDigitada = await rl.question(
        "Digite a data de vencimento (AAAA-MM-DD): "
    );

    const valor = Number(valorDigitado);
    const dataVencimento = new Date(dataDigitada);
    const hoje = new Date();

    const diferenca = hoje - dataVencimento;

    const diasDeAtraso = Math.floor(
        diferenca / (1000 * 60 * 60 * 24)
    );

    if (diasDeAtraso <= 0) {
        console.log("\nA conta não está atrasada.");
    } else {
        const juros = valor * 0.025 * diasDeAtraso;
        const valorTotal = valor + juros;

        console.log("\n=== CÁLCULO DE JUROS ===");
        console.log(`Valor original: R$ ${valor.toFixed(2)}`);
        console.log(`Dias de atraso: ${diasDeAtraso}`);
        console.log(`Juros: R$ ${juros.toFixed(2)}`);
        console.log(`Valor atualizado: R$ ${valorTotal.toFixed(2)}`);
    }

    rl.close();
}

calcularJuros();

