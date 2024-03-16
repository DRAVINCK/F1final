let saldo = 100;
let valorAposta;
let pilotoSelecionado;
let intervalos = {};
let corridaEmAndamento = false;
let vencedor = null;
console.log('JavaScript carregado!')

function init() {
  document.getElementById('saldo').innerText = `Saldo: R$${saldo}`;
}

function realizarAposta() {
  valorAposta = parseInt(document.getElementById('valorAposta').value);
  pilotoSelecionado = document.getElementById('pilotos').value;

  if (isNaN(valorAposta) || valorAposta < 5 || valorAposta > saldo) {
    alert('Por favor, insira um valor de aposta válido (mínimo R$5)!');
    return;
  }

  if (saldo < valorAposta) {
    alert('Saldo insuficiente!');
    return;
  }

  iniciarCorrida();
}

function iniciarCorrida() {
  const carros = document.querySelectorAll('.carro');
  corridaEmAndamento = true;
  vencedor = null;

  carros.forEach(carro => {
    let posicaoX = 0;
    intervalos[carro.id] = setInterval(() => {
      if (!corridaEmAndamento) {
        clearInterval(intervalos[carro.id]);
        return;
      }

      posicaoX += Math.random() * 30;
      carro.style.left = posicaoX + 'px';

      if (posicaoX >= 599) {
        corridaEmAndamento = false;
        if (vencedor === null) {
          vencedor = carro.id;
          if (carro.id === pilotoSelecionado) {
            saldo += valorAposta;
            document.getElementById('resultado').innerText = `Parabéns! Você ganhou R$${valorAposta * 2}! O carro vencedor foi o número ${vencedor}`;
          } else {
            saldo -= valorAposta;
            document.getElementById('resultado').innerText = `Ops! Você perdeu R$${valorAposta}! Melhor sorte na próxima. O carro vencedor foi o número ${vencedor}`;
          }
          document.getElementById('saldo').innerText = `Saldo: R$${saldo}`;
        }
      }
    }, 50);
  });
}