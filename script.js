/* =========================================================
   SCRIPT DA PÁGINA DO JOGO (jogo.html)
   Controla:
   1) O contador de cliques do botão "SIM"
   2) O comportamento do botão "NÃO", que foge do mouse
   3) O redirecionamento automático para a terceira página
   ========================================================= */

// Só executa este script se os elementos do jogo existirem na página
// (assim o mesmo arquivo script.js pode ser usado em todas as páginas,
// sem gerar erro no console em index.html ou final.html)
const botaoSim = document.getElementById("botaoSim");
const botaoNao = document.getElementById("botaoNao");
const areaBotoes = document.getElementById("areaBotoes");
const contadorTexto = document.getElementById("contador");

if (botaoSim && botaoNao && areaBotoes && contadorTexto) {

  // ALTERE A QUANTIDADE DE CLIQUES NECESSÁRIA AQUI
  const CLIQUES_NECESSARIOS = 100;

  // ALTERE O NOME DO ARQUIVO DA PRÓXIMA PÁGINA AQUI
  const PROXIMA_PAGINA = "final.html";

  let cliques = 0;

  /* ---------------------------------------------------
     LÓGICA DO BOTÃO "SIM"
     --------------------------------------------------- */
  botaoSim.addEventListener("click", () => {
    if (cliques >= CLIQUES_NECESSARIOS) return;

    cliques += 1;
    contadorTexto.textContent = `${cliques}/${CLIQUES_NECESSARIOS}`;

    if (cliques >= CLIQUES_NECESSARIOS) {
      // Pequena pausa antes de redirecionar, só para dar tempo
      // da pessoa ver o contador chegando em 100/100
      // ALTERE O TEMPO DE ESPERA ANTES DE MUDAR DE PÁGINA AQUI (em milissegundos)
      setTimeout(() => {
        window.location.href = PROXIMA_PAGINA;
      }, 500);
    }
  });

  /* ---------------------------------------------------
     LÓGICA DO BOTÃO "NÃO" (foge do cursor)
     --------------------------------------------------- */

  // Distância mínima (em pixels) entre o mouse e o botão
  // para o botão fugir. Quanto maior o número, mais "medroso" ele é.
  // ALTERE A DISTÂNCIA DE FUGA DO BOTÃO "NÃO" AQUI
  const DISTANCIA_FUGA = 90;

  function moverBotaoNaoAleatoriamente() {
    const areaLargura = areaBotoes.clientWidth;
    const areaAltura = areaBotoes.clientHeight;
    const botaoLargura = botaoNao.offsetWidth;
    const botaoAltura = botaoNao.offsetHeight;

    // Calcula uma posição aleatória que mantém o botão
    // inteiramente dentro da área permitida
    const novoX = Math.random() * (areaLargura - botaoLargura);
    const novoY = Math.random() * (areaAltura - botaoAltura);

    botaoNao.style.left = `${novoX}px`;
    botaoNao.style.top = `${novoY}px`;
  }

  function distanciaEntrePontos(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  // Posição inicial do botão "Não" dentro da área
  window.addEventListener("load", moverBotaoNaoAleatoriamente);

  // Detecta o movimento do mouse dentro da área dos botões
  areaBotoes.addEventListener("mousemove", (evento) => {
    const retanguloBotao = botaoNao.getBoundingClientRect();
    const centroBotaoX = retanguloBotao.left + retanguloBotao.width / 2;
    const centroBotaoY = retanguloBotao.top + retanguloBotao.height / 2;

    const distancia = distanciaEntrePontos(
      evento.clientX,
      evento.clientY,
      centroBotaoX,
      centroBotaoY
    );

    if (distancia < DISTANCIA_FUGA) {
      moverBotaoNaoAleatoriamente();
    }
  });

  // Em celulares não existe "hover", então o botão também foge
  // assim que é tocado, para nunca poder ser clicado de verdade
  botaoNao.addEventListener("touchstart", (evento) => {
    evento.preventDefault();
    moverBotaoNaoAleatoriamente();
  });

  // Garantia extra: mesmo que o botão seja clicado por algum
  // motivo (ex: navegação por teclado), nada acontece
  botaoNao.addEventListener("click", (evento) => {
    evento.preventDefault();
    moverBotaoNaoAleatoriamente();
  });

  // Reposiciona o botão corretamente se a pessoa redimensionar a janela
  window.addEventListener("resize", moverBotaoNaoAleatoriamente);
}
