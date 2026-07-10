
const botaoSim = document.getElementById("botaoSim");
const botaoNao = document.getElementById("botaoNao");
const areaBotoes = document.getElementById("areaBotoes");
const contadorTexto = document.getElementById("contador");

if (botaoSim && botaoNao && areaBotoes && contadorTexto) {

  const CLIQUES_NECESSARIOS = 100;

  const PROXIMA_PAGINA = "final.html";

  let cliques = 0;

  botaoSim.addEventListener("click", () => {
    if (cliques >= CLIQUES_NECESSARIOS) return;

    cliques += 1;
    contadorTexto.textContent = `${cliques}/${CLIQUES_NECESSARIOS}`;

    if (cliques >= CLIQUES_NECESSARIOS) {

      setTimeout(() => {
        window.location.href = PROXIMA_PAGINA;
      }, 500);
    }
  });

  const DISTANCIA_FUGA = 100;

  function moverBotaoNaoAleatoriamente() {
    const areaLargura = areaBotoes.clientWidth;
    const areaAltura = areaBotoes.clientHeight;
    const botaoLargura = botaoNao.offsetWidth;
    const botaoAltura = botaoNao.offsetHeight;

   
    const novoX = Math.random() * (areaLargura - botaoLargura);
    const novoY = Math.random() * (areaAltura - botaoAltura);

    botaoNao.style.left = `${novoX}px`;
    botaoNao.style.top = `${novoY}px`;
  }

  function distanciaEntrePontos(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }


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


  botaoNao.addEventListener("touchstart", (evento) => {
    evento.preventDefault();
    moverBotaoNaoAleatoriamente();
  });


  botaoNao.addEventListener("click", (evento) => {
    evento.preventDefault();
    moverBotaoNaoAleatoriamente();
  });


  window.addEventListener("resize", moverBotaoNaoAleatoriamente);
}
