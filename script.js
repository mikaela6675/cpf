// Função para gerar um CPF válido
function gerarCPF() {
    // Gera 9 dígitos aleatórios
    const numeros = [];
    for (let i = 0; i < 9; i++) {
        numeros.push(Math.floor(Math.random() * 10));
    }

    // Calcula o primeiro dígito verificador
    const digito1 = calcularDigito(numeros, 10);
    numeros.push(digito1);

    // Calcula o segundo dígito verificador
    const digito2 = calcularDigito(numeros, 11);
    numeros.push(digito2);

    // Formata o CPF
    return formatarCPF(numeros.join(''));
}

// Função para calcular dígito verificador
function calcularDigito(digitos, pesoInicial) {
    let soma = 0;
    for (let i = 0; i < digitos.length; i++) {
        soma += digitos[i] * (pesoInicial - i);
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

// Função para formatar CPF (XXX.XXX.XXX-XX)
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para validar CPF (usada para verificar se o gerado é válido)
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Valida primeiro dígito
    const digitos = cpf.substring(0, 9).split('').map(Number);
    const digito1 = calcularDigito(digitos, 10);
    if (digito1 !== parseInt(cpf[9])) return false;

    // Valida segundo dígito
    digitos.push(digito1);
    const digito2 = calcularDigito(digitos, 11);
    if (digito2 !== parseInt(cpf[10])) return false;

    return true;
}

// Elementos do DOM
const cpfSpan = document.getElementById('cpf');
const gerarBtn = document.getElementById('gerarBtn');
const copiarBtn = document.getElementById('copiarBtn');

// Evento de gerar CPF
gerarBtn.addEventListener('click', () => {
    const novoCPF = gerarCPF();
    cpfSpan.textContent = novoCPF;

    // Debug: verifica se o CPF gerado é válido
    console.log('CPF válido?', validarCPF(novoCPF));
});

// Evento de copiar CPF
copiarBtn.addEventListener('click', () => {
    const cpf = cpfSpan.textContent;

    navigator.clipboard.writeText(cpf).then(() => {
        alert('CPF copiado para a área de transferência!');
    }).catch(err => {
        alert('Erro ao copiar CPF.');
        console.error('Erro ao copiar: ', err);
    });
});