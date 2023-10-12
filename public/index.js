document.addEventListener('DOMContentLoaded', function() {
    const depositButton = document.getElementById('depositButton');
    const buyerAddress = document.getElementById('buyerAddress');
    const amount = document.getElementById('amount');
    const sellerAddress = "0xEA5Fed1D0141F14DE11249577921b08783d6A360";
    const currency = "USDT";
    const infoText = document.getElementById('infoText');
    const qrImage = document.getElementById('qrImage');
    const qrText = document.getElementById('qrText');
    const qrLink = document.getElementById('qrLink');

    // Initially hide qrText
    qrText.style.display = 'none';

    depositButton.addEventListener('click', function() {
        if (!buyerAddress.value || !amount.value) {
            alert('Both fields must be completed.');
            return;
        }

        if (isNaN(amount.value)) {
            alert('Amount must be a number.');
            return;
        }

        const url = `/binance/getBinancePaymentLink?buyerAddress=${buyerAddress.value}&sellerAddress=${sellerAddress}&amount=${amount.value}&currency=${currency}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                qrImage.src = data.data.qrcodeLink;
                qrLink.href = data.data.checkoutUrl;
                qrText.style.display = 'block';
            } else {
                qrText.innerHTML = 'An error has occurred. Please try again later.';
                qrText.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            qrText.innerHTML = 'An error has occurred. Please try again later.';
            qrText.style.display = 'block';
        });
    });
});
