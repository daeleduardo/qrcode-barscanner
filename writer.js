function createQrCode() {
    const elementQrCode = document.getElementById("qrcode");
    elementQrCode.innerHTML = "";
    const inputText = document.getElementById("qr-input-text").value;
    if(inputText == ""){
        alert("Informe um texto");
    }

    const qrcode = new QRCode(elementQrCode, {
        text: inputText,
        width: boxQrCodeScreen,
        height: boxQrCodeScreen,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    if (!qrcode == 'undefined') {
        setMsg("QR Code gerado com sucesso.");
    }

}

function createBarCode() {


    const inputText = document.getElementById("bar-input-text").value;
    if(inputText == ""){
        alert("Informe um texto");
    }    

    JsBarcode('#barcode', inputText,
        {
            format: "CODE128",
            lineColor: "#000000",
            width: 2,
            height: 100,
            displayValue: true,
            flat: true,
            text: "label opcional",
            valid: function (valido) {
                if (valido) {
                    setMsg("Código de barras gerado com sucesso.");
                } else {
                    setMsg("Valor invalido");

                }
            }
        }

    );

}