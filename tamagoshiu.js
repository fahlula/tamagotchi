
const readline = require('readline'); // pegar a informação do usuario no terminal

// Emojis disponíveis para troca de roupa
const EMOJIS = ["🐶", "🐱", "🐰", "🐹", "🐸", "🐻", "🐼", "🦊", "🐵", "🐨"];

// Classe que define o comportamento do bichinho virtual
class Tamagotchi {
  constructor(name) {
    this.name = name;        // Nome do bichinho
    this.fome = 0;           // Nível inicial de fome (0)
    this.felicidade = 100;   // Nível inicial de felicidade (100)
    this.emoji = EMOJIS[0];  // Emoji inicial
    this.vivo = true;        // Estado de vida
  }

  // Exibe o status atual do bichinho
  status() {
    console.log(`\n${this.emoji}  ${this.name}`);
    console.log(`Fome: ${this.fome}`);
    console.log(`Felicidade: ${this.felicidade}`);
  }

  // Método para alimentar o bichinho
  alimentar() {
    this.fome = Math.max(0, this.fome - 20); // Reduz fome (mínimo 0)
    console.log(`${this.name} foi alimentado! 🍎`);
  }

  // Método para dar carinho
  carinho() {
    this.felicidade = Math.min(100, this.felicidade + 15); // Aumenta felicidade (máximo 100)
    console.log(`${this.name} recebeu carinho! ❤️`);
  }

  // Método para passear
  passear() {
    this.felicidade = Math.min(100, this.felicidade + 10); // Aumenta felicidade (máximo 100)
    console.log(`${this.name} foi passear! 🌳`);
  }

  // Método para trocar de roupa (mudar emoji)
  trocarRoupa() {
    const novoEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    this.emoji = novoEmoji;
    console.log(`${this.name} trocou de roupa! Agora é ${this.emoji}`);
  }

  // Método chamado periodicamente para aumentar fome e diminuir felicidade
  tick() {
    this.fome = Math.min(100, this.fome + 10);
    this.felicidade = Math.max(0, this.felicidade - 5);

    // Verifica se morreu por fome ou tristeza
    if (this.fome >= 100 || this.felicidade <= 0) {
      this.vivo = false;
      console.log(`\n💀 ${this.name} morreu...`);
      process.exit(); // Encerra o programa
    }
  }
}

// Cria a interface de leitura no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função que mostra o menu e processa a escolha do usuário
function promptOptions(pet) {
  pet.status();
  console.log(`
O que você quer fazer?
1 - Alimentar
2 - Dar carinho
3 - Passear
4 - Trocar roupa
q - Sair
`);

  rl.question('Escolha uma opção: ', (answer) => {
    if (!pet.vivo) {
      rl.close();
      return;
    }

    // Executa a ação escolhida
    switch (answer) {
      case '1':
        pet.alimentar();
        break;
      case '2':
        pet.carinho();
        break;
      case '3':
        pet.passear();
        break;
      case '4':
        pet.trocarRoupa();
        break;
      case 'q':
        console.log("Até logo!");
        rl.close();
        process.exit();
      default:
        console.log("Opção inválida.");
    }

    // Chama novamente o menu
    promptOptions(pet);
  });
}

// Inicializa o programa perguntando o nome do bichinho
rl.question("Qual o nome do seu bichinho virtual? ", (name) => {
  const pet = new Tamagotchi(name);

  // A cada 10 segundos, aumenta fome e reduz felicidade
  setInterval(() => {
    if (pet.vivo) {
      pet.tick();
    }
  }, 10000);

  // Mostra o menu inicial
  promptOptions(pet);
});