// === Fake Malicious Mining Banner Demo ===
setTimeout(function() {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = 'black';
    banner.style.color = '#0f0';
    banner.style.fontFamily = 'monospace';
    banner.style.fontSize = '14px';
    banner.style.padding = '10px';
    banner.style.zIndex = '999999';
    banner.style.textAlign = 'center';
    banner.style.boxShadow = '0 2px 10px red';
    banner.innerHTML = `
        <b>[ WARNING ]</b> This page is now mining cryptocurrency using your CPU. 
        Wallet: <span id="wallet">48j2skd...a93jf39x</span> | 
        Hashrate: <span id="hashrate">0 H/s</span> | 
        Shares: <span id="shares">0</span>
    `;
    document.body.appendChild(banner);

    // Fake mining stats (non-intrusive, no real load)
    let hashrate = 0;
    let shares = 0;

    setInterval(() => {
        hashrate = Math.floor(Math.random() * 1000) + 500; // 500 - 1500 H/s
        shares += Math.floor(Math.random() * 3);
        document.getElementById('hashrate').textContent = hashrate + ' H/s';
        document.getElementById('shares').textContent = shares;
    }, 1500);
}, 5000);
