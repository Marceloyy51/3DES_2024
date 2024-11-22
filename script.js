const startButton = document.getElementById("start-button");
const modal = document.getElementById("modal");
const validateModal = document.getElementById("validate-modal");
const endModal = document.getElementById("end-modal");
const closeModal = document.getElementById("close-modal");
const avatarImage = document.getElementById("avatar-image");
const avatarName = document.getElementById("avatar-name");
const validateButton = document.getElementById("validate-button");
const correctButton = document.getElementById("correct-button");
const wrongButton = document.getElementById("wrong-button");
const restartButton = document.getElementById("restart-button");
const alunosElement = document.getElementById("alunos");
const sorteadosElement = document.getElementById("sorteados");
const errosElement = document.getElementById("erros");
const acertosElement = document.getElementById("acertos");

let totalAlunos = 10;
let totalSorteados = 0;
let totalErros = 0;
let totalAcertos = 0;

let avatars = []; // Array para armazenar os avatares carregados do JSON
let currentAvatar = null;

// Função para buscar os dados do JSON
async function carregarAvatares() {
    try {
        const response = await fetch("imagens.json");
        if (!response.ok) {
            throw new Error("Erro ao carregar o arquivo JSON");
        }
        avatars = await response.json();
        totalAlunos = avatars.length; // Ajusta o total de alunos com base no número de avatares
        atualizarValores();
    } catch (error) {
        console.error("Erro ao carregar os avatares:", error);
    }
}

// Sorteia um avatar sem repetir
function sortearAvatar() {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    const avatar = avatars.splice(randomIndex, 1)[0]; // Remove o avatar sorteado da lista
    return avatar;
}

// Atualiza os valores no cabeçalho
function atualizarValores() {
    alunosElement.textContent = totalAlunos;
    sorteadosElement.textContent = totalSorteados;
    errosElement.textContent = totalErros;
    acertosElement.textContent = totalAcertos;
}

// Exibe o modal principal
startButton.addEventListener("click", () => {
    if (avatars.length === 0) {
        alert("Todos os nomes foram sorteados.");
        return;
    }
    currentAvatar = sortearAvatar();
    avatarImage.src = currentAvatar.image;
    avatarName.textContent = "Quem sou eu??";
    modal.style.display = "flex";
});

// Fecha o modal principal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Exibe o modal de validação
validateButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.getElementById("validate-name").textContent = currentAvatar.name;
    validateModal.style.display = "flex";
});

// Botão de acertar
correctButton.addEventListener("click", () => {
    totalAcertos++;
    totalAlunos--;
    totalSorteados++;
    validateModal.style.display = "none";
    verificarFimDeJogo();
});

// Botão de errar
wrongButton.addEventListener("click", () => {
    totalErros++;
    totalAlunos--;
    totalSorteados++;
    validateModal.style.display = "none";
    verificarFimDeJogo();
});

// Verifica se o jogo terminou
function verificarFimDeJogo() {
    if (totalAlunos === 0) {
        const endMessage = `
            <p style="font-weight: bold; font-size: 3rem; color: blue;">Jogo Finalizado!</p>
            <p>
                Acertos: <strong style="color: green;font-size: 2rem;">${totalAcertos}</strong> 
                <br>
                Erros: <strong style="color: red; font-size: 2rem;">${totalErros}</strong>
            </p>
        `;
        document.getElementById("end-message").innerHTML = endMessage;
        endModal.style.display = "flex";
    } else {
        atualizarValores();
    }
}

// Reinicia o jogo
restartButton.addEventListener("click", () => {
    carregarAvatares(); // Recarrega os avatares do JSON
    totalSorteados = 0;
    totalErros = 0;
    totalAcertos = 0;
    endModal.style.display = "none";
    atualizarValores();
});

// Carrega os avatares ao iniciar a página
carregarAvatares();
