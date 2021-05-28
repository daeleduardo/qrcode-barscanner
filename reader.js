
document.getElementById(elementReaderId).setAttribute("style", `width:${boxCameraScreen}px`);
const html5QrCode = new Html5Qrcode(elementReaderId);

/*
    Configura para que quando a página for carregada, que liste as cameras para o usuário selecionar.
    As cameras são listadas em um array de objetos no seguinte formato: {id:string,label:string}
    Pode ser que seja solicitada a permissão de acesso a câmera.

    Cria-se também o array que irá armazenar os QR Codes informados.
*/
docReady(() => {
    setMsg("Carregando, aguarde.....");
    localStorage.clear();
    startQrCodeFileScan();
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            let optionsCamera = document.getElementById("cameras");
            for (let device of devices) {

                let newOption = document.createElement('option');
                newOption.value = device.id;
                newOption.innerText = device.label;
                optionsCamera.appendChild(newOption);
            }
        }
    }).catch(err => {
        alert(`Erro verificar as cameras disponíveis:\n${err}`);
    }).finally(() => setMsg("Selecione se deseja ler o QR Code ou Código de barras por arquivo ou pela câmera"));
});


function startQrCodeCameraScan() {

    //Captura de frames por segundo para verificar o QR Code
    const fps = 10;
    //Obtem o Id da camera selecionada
    const cameraSelect = document.getElementById("cameras");
    if (cameraSelect.selectedIndex == 0) {
        alert("Por favor selecione uma camera!");
        return;
    }
    const cameraId = cameraSelect.options[cameraSelect.selectedIndex].value;

    //inicia a camera
    html5QrCode.start(
        cameraId,
        {
            fps: fps,
            qrbox: boxQrCodeScreen
        },
        qrCodeMessage => {
            addQrCode(qrCodeMessage);
        },
        errorMessage => {
            setMsg(`Nenhum QR Code detectado....`);
        })
        .catch(err => {
            alert(`Erro ao ligar a camera:\n${err}`);
        });
}

function stopQrCodeCameraScan() {
    //Desliga a camera.

    if (document.getElementById("qr-canvas") != null && html5QrCode._isScanning) {
        setMsg(`Camera sendo errada....`);
        html5QrCode.stop().then(ignore => {
            if (ignore) {
                document.getElementById("qr-reader").innerHTML = "";
                setMsg("");
            }

        }).catch(err => {
            console.log(document.getElementById("qr-canvas"));
            alert(`Erro ao desligar camera:\n${err}`);
        });

    }

}

//Realiza o scaneamento do QR Code por arquivo
function startQrCodeFileScan() {

    const fileinput = document.getElementById('qr-input-file');

    fileinput.addEventListener('change', e => {

        /*Por definição da lib, o método de captura por arquivo não pode ser usado se o por câmera estiver ativado.*/
        this.stopQrCodeCameraScan();

        //se não tiver um arquivo carregado, ignora.
        if (e.target.files.length == 0) {
            return;
        }

        const imageFile = e.target.files[0];

        // Scan QR Code
        html5QrCode.scanFile(imageFile, true)
            .then(qrCodeMessage => addQrCode(qrCodeMessage))
            .catch(err => {
                alert(`Erro ao ler arquivo:\n${err}`);
            });
    });

}//

function addQrCode(item) {

    if (!confirm(`O endereço está correto?\n${item}`)) {
        return false;
    }

    if (localStorage.getItem('codes') == null) {
        localStorage.setItem('codes', JSON.stringify([]));
    }

    let arr = JSON.parse(localStorage.getItem('codes'));
    arr.push(item);

    localStorage.setItem('codes', JSON.stringify(arr));
    setMsg("QR Code Scaneado com sucesso.");

    document.getElementById("list").innerHTML += `      
    <tr>
        <td>${item}</td>
    </tr>`;

    return true;
}


