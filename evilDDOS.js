setTimeout(function() {
    // Get current site's hostname
    let parts = window.location.hostname.split('.');
    let target = parts.slice(-2).join('.'); // Keep only last 2 parts (domain + TLD)

    // Create scary botnet banner
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = 'black';
    banner.style.color = 'red';
    banner.style.fontFamily = 'monospace';
    banner.style.fontSize = '14px';
    banner.style.padding = '10px';
    banner.style.zIndex = '999999';
    banner.style.textAlign = 'center';
    banner.style.boxShadow = '0 2px 10px red';
    banner.innerHTML = `
        <b>[ WARNING ]</b> This browser has been recruited into a DDoS botnet.<br>
        Target: <span id="target">${target}</span> | 
        Attack Packets Sent: <span id="packets">0</span>
    `;
    document.body.appendChild(banner);

    // Fake DDoS packet counter (visual only)
    let packets = 0;

    setInterval(() => {
        packets += Math.floor(Math.random() * 500) + 100; // 100 - 600 packets
        document.getElementById('packets').textContent = packets;
    }, 1500);
}, 5000);
