// ============================================================
// AetherSwap — Frontend Logic
// ============================================================

// ---------- Config ----------
const TOKENS = [
    { symbol: 'ETH',   name: 'Ethereum',      chain: 'Ethereum',  address: '0x0000000000000000000000000000000000000000', decimals: 18, price: 3284.52, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png' },
    { symbol: 'USDT',  name: 'Tether USD',    chain: 'Ethereum',  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6,  price: 1.00,   icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png' },
    { symbol: 'USDC',  name: 'USD Coin',      chain: 'Ethereum',  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6,  price: 0.9998, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png' },
    { symbol: 'WBTC',  name: 'Wrapped Bitcoin', chain: 'Ethereum', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', decimals: 8,  price: 67240.10, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png' },
    { symbol: 'LINK',  name: 'Chainlink',     chain: 'Ethereum',  address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', decimals: 18, price: 17.42,  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png' },
    { symbol: 'UNI',   name: 'Uniswap',       chain: 'Ethereum',  address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', decimals: 18, price: 10.85,  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png' },
    { symbol: 'AAVE',  name: 'Aave',          chain: 'Ethereum',  address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', decimals: 18, price: 94.20,   icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png' },
    { symbol: 'PEPE',  name: 'Pepe',          chain: 'Ethereum',  address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', decimals: 18, price: 0.0000112, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6982508145454Ce325dDbE47a25d4ec3d2311933/logo.png' },
    { symbol: 'ARB',   name: 'Arbitrum',      chain: 'Arbitrum',  address: '0x912CE59144191C1204E64559FE8253a0e49E6548', decimals: 18, price: 0.8412,  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png' },
    { symbol: 'OP',    name: 'Optimism',      chain: 'Optimism',  address: '0x4200000000000000000000000000000000000042', decimals: 18, price: 1.72,   icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png' },
    { symbol: 'MATIC', name: 'Polygon',       chain: 'Polygon',   address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', decimals: 18, price: 0.5841, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png' },
    { symbol: 'SOL',   name: 'Solana',        chain: 'Solana',    address: 'So11111111111111111111111111111111111111112', decimals: 9, price: 172.34, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png' },
    { symbol: 'AVAX',  name: 'Avalanche',     chain: 'Avalanche', address: '0x2b89bfF8bAB60f00BE6Cdddb4926752147F0da66', decimals: 18, price: 27.91,  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchex/info/logo.png' },
    { symbol: 'BNB',   name: 'BNB',           chain: 'BNB Chain', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', decimals: 18, price: 584.22, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png' },
    { symbol: 'DAI',   name: 'Dai Stablecoin', chain: 'Ethereum', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, price: 1.0002, icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png' },
];

const GAS_ESTIMATES = {
    'Ethereum': 4.82,
    'Arbitrum': 0.11,
    'Optimism': 0.08,
    'Polygon': 0.02,
    'Solana': 0.01,
    'Avalanche': 0.05,
    'BNB Chain': 0.03,
};

const SVG_ICONS = {
    check: '<svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    bolt: '<svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    lock: '<svg style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    refresh: '<svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    alertCircle: '<svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    wallet: '<svg style="width:20px;height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
    search: '<svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
};

// ---------- State ----------
const state = {
    connected: false,
    address: null,
    fromToken: TOKENS[0],
    toToken: TOKENS[1],
    fromAmount: '',
    slippage: 0.5,
    lastQuote: null,
    swapping: false,
};

// ---------- DOM Helpers ----------
const $ = (id) => document.getElementById(id);
const formatUsd = (n) => {
    if (n >= 1) return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (n >= 0.01) return `$${n.toFixed(4)}`;
    if (n >= 0.0001) return `$${n.toFixed(6)}`;
    return `$${n.toExponential(2)}`;
};
const formatNum = (n, decimals = 6) => {
    if (!n || isNaN(n)) return '0.0';
    if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(Math.min(4, decimals));
    return n.toFixed(decimals);
};
const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

// ============================================================
// WALLET CONNECTION
// ============================================================
async function connectWallet() {
    const btn = $('connectBtn');

    btn.innerHTML = `${SVG_ICONS.wallet} <span style="margin-left:8px;">Connecting...</span>`;
    btn.disabled = true;

    // Simulate wallet connection delay
    await new Promise(r => setTimeout(r, 1200));

    state.connected = true;
    state.address = '0x7F3a' + Math.random().toString(16).slice(2, 8) + 'aB4c' + Math.random().toString(16).slice(2, 8) + 'dE9f';

    btn.innerHTML = `<span class="wallet-dot"></span> ${shortAddress(state.address)}`;
    btn.disabled = false;
    btn.title = state.address;

    // Update swap button
    updateSwapButton();

    // Simulate balances
    updateBalances();

    // Toast
    showToast('Wallet connected', 'success');
}

function disconnectWallet() {
    state.connected = false;
    state.address = null;
    $('connectBtn').innerHTML = `<span class="wallet-dot"></span> Connect Wallet`;
    updateSwapButton();
    updateBalances();
}

// ============================================================
// SWAP LOGIC
// ============================================================
function calculateQuote() {
    const amount = parseFloat(state.fromAmount);

    if (!amount || isNaN(amount) || amount <= 0) {
        $('swapRoute').style.display = 'none';
        $('toAmount').value = '';
        $('toUsd').textContent = '~$0.00';
        $('fromUsd').textContent = '~$0.00';
        updateSwapButton();
        return;
    }

    const from = state.fromToken;
    const to = state.toToken;

    // Simulate rate with slight variance
    const rateVariance = 1 + (Math.random() - 0.5) * 0.002;
    const rate = (from.price / to.price) * rateVariance;
    const outputAmount = amount * rate;

    // Calculate price impact based on trade size relative to pool depth
    const notionalUsd = amount * from.price;
    const poolDepth = 5_000_000; // $5M simulated pool
    const impact = Math.min(15, (notionalUsd / poolDepth) * 100 * 0.5 + Math.random() * 0.05);

    // Gas estimate
    const gasCost = GAS_ESTIMATES[from.chain] || 0.5;

    // Route path
    let routePath;
    if (from.chain === to.chain) {
        routePath = `${from.symbol} → USDC → ${to.symbol}`;
    } else {
        routePath = `${from.symbol} → bridge(${from.chain}→${to.chain}) → ${to.symbol}`;
    }

    // Update UI
    $('toAmount').value = formatNum(outputAmount, 8);
    $('toUsd').textContent = `~${formatUsd(outputAmount * to.price)}`;
    $('fromUsd').textContent = `~${formatUsd(amount * from.price)}`;
    $('rateDisplay').textContent = `1 ${from.symbol} = ${formatNum(rate, 6)} ${to.symbol}`;
    $('networkFee').textContent = `~$${gasCost.toFixed(2)}`;
    $('routePath').textContent = routePath;

    // Price impact color
    const impactEl = $('priceImpact');
    impactEl.textContent = `${impact.toFixed(2)}%`;
    if (impact < 0.5) {
        impactEl.className = 'impact-good';
    } else if (impact < 3) {
        impactEl.className = 'impact-warn';
    } else {
        impactEl.className = 'impact-bad';
    }

    $('swapRoute').style.display = 'flex';

    state.lastQuote = { outputAmount, rate, impact, gasCost };
    updateSwapButton();
}

async function handleSwap() {
    if (!state.connected) {
        connectWallet();
        return;
    }

    if (state.swapping || !state.lastQuote) return;

    state.swapping = true;
    const swapBtn = $('swapBtn');

    // Confirm state
    swapBtn.disabled = true;
    swapBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;">
        <svg style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Confirming...
    </span>`;

    // Inject spin animation if not present
    if (!document.getElementById('spinKeyframe')) {
        const style = document.createElement('style');
        style.id = 'spinKeyframe';
        style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    // Simulate transaction
    await new Promise(r => setTimeout(r, 2000));

    swapBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--success);">${SVG_ICONS.check} Swapped!</span>`;

    showToast(`Swapped ${formatNum(parseFloat(state.fromAmount))} ${state.fromToken.symbol} → ${formatNum(state.lastQuote.outputAmount)} ${state.toToken.symbol}`, 'success');

    await new Promise(r => setTimeout(r, 1600));

    // Reset
    state.swapping = false;
    state.fromAmount = '';
    $('fromAmount').value = '';
    $('toAmount').value = '';
    $('swapRoute').style.display = 'none';
    updateSwapButton();
    updateBalances();
}

function updateSwapButton() {
    const swapBtn = $('swapBtn');
    if (swapBtn.disabled) return;

    if (!state.connected) {
        swapBtn.textContent = 'Connect Wallet';
        swapBtn.disabled = false;
        return;
    }

    const amount = parseFloat(state.fromAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
        swapBtn.textContent = 'Enter Amount';
        swapBtn.disabled = true;
        return;
    }

    if (state.lastQuote && state.lastQuote.impact > 5) {
        swapBtn.textContent = 'Swap Anyway (High Impact)';
        swapBtn.disabled = false;
        return;
    }

    swapBtn.textContent = 'Swap';
    swapBtn.disabled = false;
}

function updateBalances() {
    if (!state.connected) {
        $('fromBalance').textContent = '—';
        $('toBalance').textContent = '—';
        return;
    }

    const fromBal = state.fromToken.price > 1000 ? (Math.random() * 3 + 0.5) : (Math.random() * 5000 + 100);
    const toBal = state.toToken.price > 1000 ? (Math.random() * 2 + 0.1) : (Math.random() * 50000 + 500);

    $('fromBalance').textContent = formatNum(fromBal, 4);
    $('toBalance').textContent = formatNum(toBal, 4);
}

// ============================================================
// TOKEN SELECT MODAL
// ============================================================
let modalMode = 'from'; // or 'to'

function openTokenModal(mode) {
    modalMode = mode;
    $('modalOverlay').classList.add('open');
    $('tokenSearch').value = '';
    renderTokenList('');
    setTimeout(() => $('tokenSearch').focus(), 100);
}

function closeTokenModal() {
    $('modalOverlay').classList.remove('open');
}

function renderTokenList(filter) {
    const list = $('tokenList');
    const lower = filter.toLowerCase();

    const filtered = TOKENS.filter(t =>
        !lower ||
        t.symbol.toLowerCase().includes(lower) ||
        t.name.toLowerCase().includes(lower) ||
        t.chain.toLowerCase().includes(lower)
    );

    list.innerHTML = filtered.map((t, i) => `
        <div class="token-item" data-index="${TOKENS.indexOf(t)}">
            <img class="token-item-icon" src="${t.icon}" alt="${t.symbol}" onerror="this.style.visibility='hidden'">
            <div class="token-item-info">
                <div class="token-item-sym">${t.symbol}</div>
                <div class="token-item-name">${t.name}</div>
            </div>
            <span class="token-item-chain">${t.chain}</span>
        </div>
    `).join('');

    // Bind clicks
    list.querySelectorAll('.token-item').forEach(item => {
        item.addEventListener('click', () => {
            const token = TOKENS[parseInt(item.dataset.index)];

            if (modalMode === 'from') {
                if (token.symbol === state.toToken.symbol) {
                    // Swap them
                    state.toToken = state.fromToken;
                }
                state.fromToken = token;
                $('fromTokenSymbol').textContent = token.symbol;
                $('fromTokenIcon').src = token.icon;
                $('fromTokenIcon').alt = token.symbol;
            } else {
                if (token.symbol === state.fromToken.symbol) {
                    state.fromToken = state.toToken;
                    $('fromTokenSymbol').textContent = state.fromToken.symbol;
                    $('fromTokenIcon').src = state.fromToken.icon;
                    $('fromTokenIcon').alt = state.fromToken.symbol;
                }
                state.toToken = token;
                $('toTokenSymbol').textContent = token.symbol;
                $('toTokenIcon').src = token.icon;
                $('toTokenIcon').alt = token.symbol;
            }

            closeTokenModal();
            calculateQuote();
            updateBalances();
        });
    });
}

// ============================================================
// FLIP TOKENS
// ============================================================
function flipTokens() {
    const temp = state.fromToken;
    state.fromToken = state.toToken;
    state.toToken = temp;

    // Update UI
    $('fromTokenSymbol').textContent = state.fromToken.symbol;
    $('fromTokenIcon').src = state.fromToken.icon;
    $('fromTokenIcon').alt = state.fromToken.symbol;
    $('toTokenSymbol').textContent = state.toToken.symbol;
    $('toTokenIcon').src = state.toToken.icon;
    $('toTokenIcon').alt = state.toToken.symbol;

    // Move the amount to the other side
    const currentTo = $('toAmount').value;
    if (currentTo && currentTo !== '0.0') {
        state.fromAmount = currentTo;
        $('fromAmount').value = currentTo;
    } else {
        state.fromAmount = '';
        $('fromAmount').value = '';
    }

    calculateQuote();
    updateBalances();
}

// ============================================================
// SLIPPAGE SETTINGS
// ============================================================
function toggleSlippagePopover(e) {
    e.stopPropagation();
    const popover = $('slippagePopover');
    popover.style.display = popover.style.display === 'block' ? 'none' : 'block';
}

function setSlippage(value) {
    state.slippage = value;
    document.querySelectorAll('.slip-opt').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.slip) === value);
    });
}

// ============================================================
// COUNTERS
// ============================================================
function animateCounter(el, target, prefix = '', suffix = '', duration = 2000) {
    const start = performance.now();
    const startValue = 0;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        let current;
        if (target >= 1_000_000) {
            current = Math.floor(startValue + (target - startValue) * eased);
            el.textContent = `${prefix}${current.toLocaleString('en-US')}${suffix}`;
        } else if (target >= 1000) {
            current = startValue + (target - startValue) * eased;
            el.textContent = `${prefix}${current.toLocaleString('en-US', { maximumFractionDigits: 0 })}${suffix}`;
        } else {
            current = startValue + (target - startValue) * eased;
            el.textContent = `${prefix}${current.toFixed(0)}${suffix}`;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, prefix, suffix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

// Hero trust numbers — count up on load
function initHeroCounters() {
    const tvl = 847_000_000;
    const volume = 234_000_000;
    const trades = 4_821_947;

    animateCounter($('trustTvl'), tvl / 1_000_000, '$', 'M', 1800);
    animateCounter($('trustVolume'), volume / 1_000_000, '$', 'M', 1800);
    animateCounter($('trustTrades'), trades, '', '', 2200);
}

// ============================================================
// REVEAL ON SCROLL
// ============================================================
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(r => observer.observe(r));
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================
function initParticles() {
    const canvas = $('particles');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let width, height;
    const PARTICLE_COUNT = 40;
    const CONNECTION_DIST = 120;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.4 + 0.1,
        };
    }

    function update() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(update);
    }

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }

    update();
}

// ============================================================
// NAV
// ============================================================
function initNav() {
    const hamburger = $('hamburger');
    const navLinks = $('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Nav scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 20) {
            nav.style.background = 'rgba(10, 14, 23, 0.92)';
        } else {
            nav.style.background = 'rgba(10, 14, 23, 0.7)';
        }
    }, { passive: true });
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existing = document.querySelectorAll('.toast');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success'
        ? SVG_ICONS.check
        : type === 'error'
        ? SVG_ICONS.alertCircle
        : SVG_ICONS.bolt;

    toast.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:8px;">
            ${icon}
            <span>${message}</span>
        </span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: var(--bg-card-hover, #141c2e);
        border: 1px solid var(--border-hover, rgba(255,255,255,0.12));
        color: var(--text, #e2e8f0);
        padding: 14px 24px;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 12px 48px rgba(0,0,0,0.5);
        backdrop-filter: blur(20px);
        opacity: 0;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        pointer-events: none;
        white-space: nowrap;
    `;

    if (type === 'success') {
        toast.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        toast.querySelector('svg').style.color = '#10b981';
    } else if (type === 'error') {
        toast.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        toast.querySelector('svg').style.color = '#ef4444';
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Nav
    initNav();

    // Wallet
    $('connectBtn').addEventListener('click', () => {
        if (state.connected) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    });

    // Long-press / double-click to disconnect
    let lastClick = 0;
    $('connectBtn').addEventListener('dblclick', () => {
        if (state.connected) disconnectWallet();
    });

    // Swap input
    $('fromAmount').addEventListener('input', (e) => {
        // Sanitize — only numbers and decimal point
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        state.fromAmount = e.target.value;
        calculateQuote();
    });

    // Swap button
    $('swapBtn').addEventListener('click', handleSwap);

    // Flip
    $('flipBtn').addEventListener('click', flipTokens);

    // Token select
    $('fromTokenBtn').addEventListener('click', () => openTokenModal('from'));
    $('toTokenBtn').addEventListener('click', () => openTokenModal('to'));

    // Modal
    $('modalOverlay').addEventListener('click', (e) => {
        if (e.target === $('modalOverlay')) closeTokenModal();
    });
    $('modalClose').addEventListener('click', closeTokenModal);

    // Token search
    $('tokenSearch').addEventListener('input', (e) => {
        renderTokenList(e.target.value);
    });

    // Keyboard — escape closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTokenModal();
            $('slippagePopover').style.display = 'none';
        }
    });

    // Slippage
    $('slippageBtn').addEventListener('click', toggleSlippagePopover);
    document.querySelectorAll('.slip-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            setSlippage(parseFloat(btn.dataset.slip));
        });
    });

    // Close slippage popover on outside click
    document.addEventListener('click', (e) => {
        const popover = $('slippagePopover');
        const settings = document.querySelector('.swap-settings');
        if (!settings.contains(e.target)) {
            popover.style.display = 'none';
        }
    });

    // Counters & reveals
    initCounters();
    initHeroCounters();
    initReveal();

    // Particles
    initParticles();

    // Simulate real-time volume updates on hero
    setInterval(() => {
        const volumeEl = $('trustVolume');
        if (volumeEl) {
            const current = parseFloat(volumeEl.textContent.replace(/[$M]/g, '')) || 234;
            const next = current + Math.random() * 0.1;
            volumeEl.textContent = `$${next.toFixed(0)}M`;
        }
    }, 5000);

    console.log('%c⚡ AetherSwap initialized', 'color:#6366f1;font-weight:bold;font-size:14px;');
    console.log('%cSVG icon system active — zero emoji dependencies', 'color:#22d3ee;font-size:12px;');
});