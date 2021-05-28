
/*
    Existem dois quadrados, o que irá exibir a imagem da camera e o que irá detectar o QR Code.
    Por padrão o tamanho do quadro a camera será a metade da altura da resolução da tela.
    Por padrão o tamanho da área para deteção será metade da área do quadro da camera.
*/

var boxCameraScreen = Math.ceil((((screen.width > screen.height) ? screen.width : screen.height) * 0.5));
var boxQrCodeScreen = Math.ceil((boxCameraScreen / 2));
var elementReaderId = "qr-reader";


/*
    Verifica se o DOM está disponível, para aplicar o script de inicialização.
    Se sim, adiciona o script de inicialização no próximo milisegundo.
    Se não, adiciona para ser executado com quando o conteúdo do DOM estiver carregado.
*/
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


function setMsg(txt) {
    const spn = document.getElementById("msgs");
    spn.innerText = txt;
}

