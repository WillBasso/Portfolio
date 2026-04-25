const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".header-navbar ul li a");

const options = {
  threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    
    if (entry.isIntersecting) {

      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(`.header-navbar ul li a[href="#${currentId}"]`);
      
      if (activeLink) {
         activeLink.classList.add("active");
      }
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// 1. Seleciona todos os cartões que queremos proteger
const linksProtegidos = document.querySelectorAll('.protected-link');

// 2. Para cada cartão encontrado, adicionamos o evento de clique
linksProtegidos.forEach((cartao) => {
  cartao.addEventListener('click', () => {
    
    // Pegamos as informações escondidas no HTML
    const tipo = cartao.getAttribute('data-type');
    const informacaoEmbaralhada = cartao.getAttribute('data-info');

    // atob() é a função nativa do JS que desfaz o Base64
    const informacaoReal = atob(informacaoEmbaralhada);

    // Decidimos o que fazer dependendo do tipo de contato
    if (tipo === 'email') {
      // Redireciona para o programa de e-mail
      window.location.href = `mailto:${informacaoReal}`;
    } else if (tipo === 'whatsapp') {
      // Abre o link do WhatsApp em uma nova aba
      window.open(informacaoReal, '_blank');
    }
    
  });
});

// Extra: Como o cartão agora é uma <div> e não um link <a>, 
// o mouse não vira uma "mãozinha" automaticamente. 
// Você precisa colocar no seu CSS:
// .protected-link { cursor: pointer; }