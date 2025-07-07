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

/* scroll */

// Função que faz a rolagem suave até uma seção específica da página
// Função que faz a rolagem suave até uma seção específica da página
// Função que faz a rolagem suave até uma seção específica da página
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId); // Seleciona a seção pelo ID

  if (section) {
    let scrollOffset = 0;

    // Se a seção for "projects", ajusta o deslocamento para deixar espaço no topo
    if (sectionId === "#projects") {
      scrollOffset = section.offsetTop - 70;
    } else {
      // Centraliza a seção na tela (calculando altura da tela e da seção)
      scrollOffset = section.offsetTop - (window.innerHeight - section.clientHeight) / 2;
    }

    // Executa a rolagem suave até a posição calculada
    window.scrollTo({
      top: scrollOffset,
      behavior: "smooth"
    });
  }
}

// Espera o DOM carregar para adicionar os eventos aos links
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links do menu de navegação
  const navLinks = document.querySelectorAll("nav a");

  // Adiciona evento de clique para cada link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Evita comportamento padrão do link
      const sectionId = link.getAttribute("href"); // Pega o ID da seção
      scrollToSection(sectionId); // Chama a função de rolagem
    });
  });

  // Se você tiver links de rodapé diferentes, selecione aqui por outro seletor
  const footerLinks = document.querySelectorAll("footer a");

  // Adiciona evento de clique também aos links do rodapé
  footerLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      scrollToSection(sectionId);
    });
  });
});
