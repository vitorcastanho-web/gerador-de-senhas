// Elementos da interface
const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');
const qtdCaracteresEl = document.getElementById('qtd-caracteres');
const senhaGeradaEl = document.getElementById('senha-gerada');
const tempoDiasEl = document.getElementById('tempo-dias');
const barraForca = document.getElementById('barra-forca');

// Checkboxes
const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkMinusculas = document.getElementById('chk-minusculas');
const chkNumeros = document.getElementById('chk-numeros');
const chkSimbolos = document.getElementById('chk-simbolos');

// Dicionários de caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

let tamanhoSenha = 12;

// Eventos para alterar a quantidade de caracteres
btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        atualizarInterface();
    }
});

btnMais.addEventListener('click', () => {
    if (tamanhoSenha < 32) {
        tamanhoSenha++;
        atualizarInterface();
    }
});

// Eventos para gerar nova senha ao mudar opções
[chkMaiusculas, chkMinusculas, chkNumeros, chkSimbolos].forEach(checkbox => {
    checkbox.addEventListener('change', atualizarInterface);
});

// Função principal de geração e cálculo
function atualizarInterface() {
    qtdCaracteresEl.textContent = tamanhoSenha;
    
    let caracteresDisponiveis = "";
    let tiposSelecionados = 0;

    if (chkMaiusculas.checked) { caracteresDisponiveis += letrasMaiusculas; tiposSelecionados++; }
    if (chkMinusculas.checked) { caracteresDisponiveis += letrasMinusculas; tiposSelecionados++; }
    if (chkNumeros.checked) { caracteresDisponiveis += numeros; tiposSelecionados++; }
    if (chkSimbolos.checked) { caracteresDisponiveis += simbolos; tiposSelecionados++; }

    // Se nada estiver marcado, mostra aviso
    if (caracteresDisponiveis === "") {
        senhaGeradaEl.textContent = "Selecione uma opção";
        alterarForca(0, 0);
        return;
    }

    // Geração da senha aleatória
    let senha = "";
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresDisponiveis.length);
        senha += caracteresDisponiveis[indiceAleatorio];
    }
    senhaGeradaEl.textContent = senha;

    // Lógica para cálculo do tempo e força da barra
    calcularForcaETempo(tiposSelecionados, tamanhoSenha);
}

function calcularForcaETempo(tipos, tamanho) {
    // Cálculo meramente ilustrativo para simular o comportamento da tela
    let complexidade = tipos * tamanho;
    let dias = Math.floor(Math.pow(complexidade, 2.5));
    
    tempoDiasEl.textContent = dias;

    // Define a classe da barra baseado na complexidade
    barraForca.className = "barra"; // limpa
    if (complexidade < 15) {
        barraForca.classList.add('fraca');
    } else if (complexidade < 30) {
        barraForca.classList.add('media');
    } else {
        barraForca.classList.add('forte');
    }
}

function alterarForca(porcentagem, dias) {
    barraForca.className = "barra";
    tempoDiasEl.textContent = dias;
}

// Inicializa a primeira senha ao carregar
atualizarInterface();
