/* Resposnvidade do menu */

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
    const mobileMenu = document.querySelector(".menu");

    mobileMenuIcon.addEventListener("click", function(){
         mobileMenu.classList.toggle("mobile-menu-open") 
    })
})

/* slider dos depoimentos */

// Seleciona o botão de voltar (seta esquerda)
const prevButton = document.querySelector(".prev-depoimento");

// Seleciona o botão de avançar (seta direita)
const nextButton = document.querySelector(".next-depoimento");

// Seleciona todos os cards de depoimentos (os <div> dentro de .container-depoimentos)
const cards = document.querySelectorAll(".container-depoimentos > div");

// Variável que indica o índice atual do card visível (por onde começa a exibição)
let currentIndex = 0;

// Função que define quantos cards devem ser visíveis com base no tamanho da tela
function getVisibleCount() {
  const mobileScreenWidth = 1200;

  // Se a tela for menor ou igual a 1200px (mobile), mostra 1 card
  // Se for maior que 1200px (desktop), mostra 3 cards
  return window.innerWidth <= mobileScreenWidth ? 1 : 3;
}

// Função responsável por mostrar os cards corretos na tela
function showCards() {
  // Percorre todos os cards, recebendo o card atual e seu índice
  cards.forEach((card, index) => {
    // Verifica se o card está dentro do intervalo que deve ser mostrado
    if (index >= currentIndex && index < currentIndex + getVisibleCount()) {
      card.style.display = "block"; // exibe o card
    } else {
      card.style.display = "none"; // esconde o card
    }
  });
  const disabledPrevButton = currentIndex === 0;

  disabledPrevButton ? prevButton.classList.add("disabled") : prevButton.classList.remove("disabled");  

  const disabledNextButton = currentIndex + getVisibleCount() >= cards.length;
  disabledNextButton ? nextButton.classList.add("disabled") : nextButton.classList.remove("disabled"); 
}

// Função para voltar um card
function prevCard() {
  // Só volta se não estiver no início da lista
  if (currentIndex > 0) {
    currentIndex -= 1; // volta uma posição
    showCards();       // atualiza os cards na tela
  }
}

// Função para avançar um card
function nextCard() {
  // Só avança se ainda houver cards à frente
  if (currentIndex + getVisibleCount() < cards.length) {
    currentIndex += 1; // avança uma posição
    showCards();       // atualiza os cards na tela
  }
}

// Quando clicar na seta de voltar, chama a função prevCard
prevButton.addEventListener("click", prevCard);

// Quando clicar na seta de avançar, chama a função nextCard
nextButton.addEventListener("click", nextCard);

// Exibe os primeiros cards quando a página carregar
showCards();
window.addEventListener("resize", showCards);



/* Contato do site */
document.addEventListener("DOMContentLoaded", function(){
  const form = document.querySelector("form");
  const sucessMessage = document.getElementById("sucess_message");
  const errorMessage = document.getElementById("error_message");
  const loading = document.getElementById("loading")

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    form.style.display = "none";
    sucessMessage.style.display = "none";
    errorMessage.style.display = "none";
    loading.style.display = "block";


    const data = {
      to:"vinihgrelitemoura@gmail.com",
      from: "vinicinsantos43@gmail.com",
      subject: "Contato do site",
      text: "Contato do site",
      html: `<p>Nome: ${nome}</p><br/><p>Email: ${email}</p><br/><p>Assunto: ${assunto}</p><br/><p>Mensagem: ${mensagem}</p><br/>`

    }
      fetch("https://nodemailer-vinicius.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => {
        if(res.ok){
          loading.style.display = "none";
          sucessMessage.style.display = "block";
        } else{
          loading.style.display = "none";
          errorMessage.style.display = "block",
          console.error(`Erro na resposta da API: ${res.status} - ${res.statusText}`)
        }
      }).catch((error) => {
        console.error(error);
        loading.style.display = "none";
        errorMessage.style.display = "block";
      });
  });
});