function configurarMenu() {
  const botao = document.querySelector('.menu__botao');
  const menu = document.querySelector('#menu-principal');
  if (!botao || !menu) return;

  function alternarMenu() {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto);
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    botao.textContent = aberto ? '✕' : '☰';
  }

  botao.addEventListener('click', alternarMenu);
}

configurarMenu();