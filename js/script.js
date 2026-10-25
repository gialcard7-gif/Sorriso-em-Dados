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

// ----- Validação do formulário de contato -----

function mostrarErro(campo, mensagem) {
  document.querySelector('#erro-' + campo.id).textContent = mensagem;
  campo.classList.add('campo--erro');
  campo.setAttribute('aria-invalid', 'true');
}

function limparErro(campo) {
  document.querySelector('#erro-' + campo.id).textContent = '';
  campo.classList.remove('campo--erro');
  campo.removeAttribute('aria-invalid');
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// Devolve true se o campo está certo e false se tem erro
function validarCampo(campo) {
  const valor = campo.value.trim();
  let mensagem = '';

  if (campo.id === 'nome' && valor.length < 3) {
    mensagem = 'Informe seu nome completo (mínimo de 3 letras).';
  } else if (campo.id === 'email' && !emailValido(valor)) {
    mensagem = valor === '' ? 'Informe seu e-mail.' : 'Digite um e-mail válido, como voce@exemplo.com.';
  } else if (campo.id === 'mensagem' && valor.length < 10) {
    mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  } else if (campo.id === 'lgpd' && !campo.checked) {
    mensagem = 'Você precisa concordar para enviar a mensagem.';
  }

  if (mensagem !== '') {
    mostrarErro(campo, mensagem);
    return false;
  }
  limparErro(campo);
  return true;
}

function configurarFormulario() {
  const form = document.querySelector('#form-contato');
  if (!form) return;   // nas outras páginas não existe formulário

  const campos = form.querySelectorAll('#nome, #email, #mensagem, #lgpd');
  const sucesso = document.querySelector('#sucesso-contato');

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();   // impede o envio automático
    sucesso.textContent = '';

    let tudoCerto = true;
    campos.forEach(function (campo) {
      if (!validarCampo(campo)) {
        tudoCerto = false;
      }
    });

    if (tudoCerto) {
      form.reset();
      sucesso.textContent = 'Mensagem enviada com sucesso! (simulação: nada é enviado de verdade nesta sprint)';
    }
  });

  // Valida cada campo quando o usuário sai dele
  campos.forEach(function (campo) {
    campo.addEventListener('change', function () {
      validarCampo(campo);
    });
  });
}

configurarMenu();
configurarFormulario();