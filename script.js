'use strict';

/* ============================================================
   KEROSWAP — DEX Aggregator
   Part 1: Config, State, Utilities, Token Data
   ============================================================ */

// --------------------------------------------------
// CONFIG
// --------------------------------------------------
const CONFIG = {
    appName: 'KeroSwap',
    rpcUrls: {
        1: 'https://eth.llamarpc.com',
        56: 'https://bsc-dataseed.binance.org',
        137: 'https://polygon-rpc.com',
        42161: 'https://arb1.arbitrum.io/rpc',
        10: 'https://mainnet.optimism.io',
        8453: 'https://mainnet.base.org',
        250: 'https://rpc.ftm.tools',
        43114: 'https://api.avax.network/ext/bc/C/rpc'
    },
    chainNames: {
        1: 'Ethereum',
        56: 'BNB Chain',
        137: 'Polygon',
        42161: 'Arbitrum',
        10: 'Optimism',
        8453: 'Base',
        250: 'Fantom',
        43114: 'Avalanche'
    },
    explorerUrls: {
        1: 'https://etherscan.io',
        56: 'https://bscscan.com',
        137: 'https://polygonscan.com',
        42161: 'https://arbiscan.io',
        10: 'https://optimistic.etherscan.io',
        8453: 'https://basescan.org',
        250: 'https://ftmscan.com',
        43114: 'https://snowtrace.io'
    },
    nativeSymbols: { 1: 'ETH', 56: 'BNB', 137: 'MATIC', 42161: 'ETH', 10: 'ETH', 8453: 'ETH', 250: 'FTM', 43114: 'AVAX' },
    defaultSlippage: 0.5,
    quoteRefreshMs: 15000
};

// --------------------------------------------------
// TOKEN DATA
// --------------------------------------------------
const TOKENS = [
    { symbol: 'ETH',    name: 'Ethereum',          chainId: 1,     address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png', price: 3450.00, isNative: true },
    { symbol: 'WETH',   name: 'Wrapped Ether',     chainId: 1,     address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png', price: 3449.50 },
    { symbol: 'USDT',   name: 'Tether USD',        chainId: 1,     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6,  logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png', price: 1.000 },
    { symbol: 'USDC',   name: 'USD Coin',          chainId: 1,     address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6,  logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png', price: 0.9998 },
    { symbol: 'DAI',    name: 'Dai Stablecoin',    chainId: 1,     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png', price: 1.000 },
    { symbol: 'WBTC',   name: 'Wrapped Bitcoin',   chainId: 1,     address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', decimals: 8,  logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png', price: 67200.00 },
    { symbol: 'LINK',   name: 'Chainlink',         chainId: 1,     address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png', price: 14.82 },
    { symbol: 'UNI',    name: 'Uniswap',           chainId: 1,     address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png', price: 9.45 },
    { symbol: 'AAVE',   name: 'Aave',              chainId: 1,     address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png', price: 92.30 },
    { symbol: 'PEPE',   name: 'Pepe',              chainId: 1,     address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6982508145454Ce325dDbE47a25d4ec3d2311933/logo.png', price: 0.0000122 },
    { symbol: 'ARB',    name: 'Arbitrum',          chainId: 42161, address: '0x912CE59144191C1204E64559FE8253a0e49E6548', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png', price: 1.12 },
    { symbol: 'OP',     name: 'Optimism',          chainId: 10,    address: '0x4200000000000000000000000000000000000042', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x4200000000000000000000000000000000000042/logo.png', price: 2.38 },
    { symbol: 'MATIC',  name: 'Polygon',           chainId: 137,   address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png', price: 0.72, isNative: true },
    { symbol: 'AVAX',   name: 'Avalanche',         chainId: 43114, address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanche/info/logo.png', price: 36.40, isNative: true },
    { symbol: 'BNB',    name: 'BNB',               chainId: 56,    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18, logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png', price: 598.00, isNative: true },
    { symbol: 'SOL',    name: 'Solana',            chainId: 0,     address: 'native', decimals: 9,  logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png', price: 172.50, isNative: true },
];

// Simulated liquidity sources for route display
const LIQUIDITY_SOURCES = ['Uniswap V3', 'Uniswap V2', 'Curve', 'Balancer', 'SushiSwap', 'PancakeSwap', '1inch', 'Camelot', 'Maverick'];

// --------------------------------------------------
// STATE
// --------------------------------------------------
const state = {
    wallet: {
        address: null,
        chainId: null,
        provider: null,
        connected: false
    },
    swap: {
        fromToken: TOKENS[0],    // ETH
        toToken: TOKENS[2],      // USDT
        fromAmount: '',
        toAmount: '',
        slippage: CONFIG.defaultSlippage,
        route: null,
        quoting: false
    },
    ui: {
        tokenModalOpen: false,
        modalTarget: null, // 'from' or 'to'
        navOpen: false
    }
};

// --------------------------------------------------
// UTILITIES
// --------------------------------------------------
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

function shortAddress(addr) {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatNumber(num, decimals = 2) {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(2);
    if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(decimals);
}

function formatUsd(usd) {
    if (usd >= 1e12) return '$' + (usd / 1e12).toFixed(2) + 'T';
    if (usd >= 1e9) return '$' + (usd / 1e9).toFixed(2) + 'B';
    if (usd >= 1e6) return '$' + (usd / 1e6).toFixed(2) + 'M';
    if (usd >= 1e3) return '$' + (usd / 1e3).toFixed(1) + 'K';
    return '$' + usd.toFixed(2);
}

function formatTokenAmount(amount, decimals = 6) {
    if (!amount || isNaN(parseFloat(amount))) return '0.0';
    const num = parseFloat(amount);
    if (num === 0) return '0.0';
    if (num < 0.0001) return num.toFixed(8);
    if (num < 1) return num.toFixed(6);
    if (num < 1000) return num.toFixed(4);
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function sanitizeInput(value) {
    // Only allow digits and one decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    return cleaned;
}

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

// --------------------------------------------------
// TOAST
// --------------------------------------------------
let toastTimer = null;

function showToast(msg, type = 'success') {
    const toast = $('toast');
    const toastMsg = $('toastMsg');
    const toastIcon = toast.querySelector('.toast-icon use');

    if (type === 'error') {
        toastIcon.setAttribute('href', '#icon-close');
        toast.classList.add('toast-error');
    } else {
        toastIcon.setAttribute('href', '#icon-check');
        toast.classList.remove('toast-error');
    }

    toastMsg.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// --------------------------------------------------
// WALLET CONNECTION
// --------------------------------------------------
async function connectWallet() {
    if (state.wallet.connected) {
        disconnectWallet();
        return;
    }

    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                showToast('No accounts found', 'error');
                return;
            }

            const chainIdHex = await window.ethereum.request({
                method: 'eth_chainId'
            });

            state.wallet.address = accounts[0];
            state.wallet.chainId = parseInt(chainIdHex, 16);
            state.wallet.provider = window.ethereum;
            state.wallet.connected = true;

            updateWalletUI();
            await loadBalances();

            // Listeners
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            showToast('Wallet connected');
        } catch (err) {
            if (err.code === 4001) {
                showToast('Connection rejected', 'error');
            } else {
                showToast('Failed to connect wallet', 'error');
            }
        }
    } else {
        // No injected provider — simulate demo wallet
        simulateWallet();
    }
}

function disconnectWallet() {
    state.wallet.address = null;
    state.wallet.chainId = null;
    state.wallet.provider = null;
    state.wallet.connected = false;

    if (window.ethereum && window.ethereum.removeAllListeners) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
    }

    updateWalletUI();
    $('fromBalance').textContent = '—';
    $('toBalance').textContent = '—';
    $('swapBtn').textContent = 'Connect Wallet';
    showToast('Wallet disconnected');
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else {
        state.wallet.address = accounts[0];
        updateWalletUI();
        loadBalances();
    }
}

function handleChainChanged(chainIdHex) {
    state.wallet.chainId = parseInt(chainIdHex, 16);
    updateWalletUI();
    loadBalances();
    const name = CONFIG.chainNames[state.wallet.chainId] || 'Unknown';
    showToast(`Switched to ${name}`);
}

function simulateWallet() {
    // Demo mode — no real wallet, simulated address
    state.wallet.address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    state.wallet.chainId = 1;
    state.wallet.provider = null;
    state.wallet.connected = true;
    state.wallet.simulated = true;

    updateWalletUI();
    loadBalances();
    showToast('Demo wallet connected — simulated mode');
}

function updateWalletUI() {
    const btn = $('connectBtn');
    const swapBtn = $('swapBtn');

    if (state.wallet.connected) {
        btn.innerHTML = `
            <span class="wallet-dot wallet-dot-green"></span>
            ${shortAddress(state.wallet.address)}
        `;
        btn.classList.add('btn-connected');

        const chainName = CONFIG.chainNames[state.wallet.chainId] || 'Wrong Network';
        btn.title = chainName;

        updateSwapButtonState();
    } else {
        btn.innerHTML = `
            <span class="wallet-dot"></span>
            Connect Wallet
        `;
        btn.classList.remove('btn-connected');
        swapBtn.textContent = 'Connect Wallet';
        swapBtn.disabled = false;
    }
}

// --------------------------------------------------
// CHAIN MANAGEMENT
// --------------------------------------------------
async function switchChain(targetChainId) {
    if (!state.wallet.connected || state.wallet.simulated) {
        state.wallet.chainId = targetChainId;
        updateWalletUI();
        loadBalances();
        return;
    }

    const hexChainId = '0x' + targetChainId.toString(16);

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexChainId }]
        });
    } catch (err) {
        // Chain not added — try adding it
        if (err.code === 4902) {
            const chainConfig = buildChainConfig(targetChainId);
            if (chainConfig) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [chainConfig]
                    });
                } catch (addErr) {
                    showToast('Failed to add chain', 'error');
                }
            } else {
                showToast('Chain not supported', 'error');
            }
        } else {
            showToast('Failed to switch chain', 'error');
        }
    }
}

function buildChainConfig(chainId) {
    const configs = {
        1: null, // Ethereum is always available
        56: {
            chainId: '0x38', chainName: 'BNB Smart Chain',
            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[56]],
            blockExplorerUrls: [CONFIG.explorerUrls[56]]
        },
        137: {
            chainId: '0x89', chainName: 'Polygon Mainnet',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[137]],
            blockExplorerUrls: [CONFIG.explorerUrls[137]]
        },
        42161: {
            chainId: '0xa4b1', chainName: 'Arbitrum One',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[42161]],
            blockExplorerUrls: [CONFIG.explorerUrls[42161]]
        },
        10: {
            chainId: '0xa', chainName: 'OP Mainnet',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[10]],
            blockExplorerUrls: [CONFIG.explorerUrls[10]]
        },
        8453: {
            chainId: '0x2105', chainName: 'Base',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[8453]],
            blockExplorerUrls: [CONFIG.explorerUrls[8453]]
        },
        250: {
            chainId: '0xfa', chainName: 'Fantom Opera',
            nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[250]],
            blockExplorerUrls: [CONFIG.explorerUrls[250]]
        },
        43114: {
            chainId: '0xa86a', chainName: 'Avalanche C-Chain',
            nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
            rpcUrls: [CONFIG.rpcUrls[43114]],
            blockExplorerUrls: [CONFIG.explorerUrls[43114]]
        }
    };
    return configs[chainId] || null;
}

// --------------------------------------------------
// BALANCES
// --------------------------------------------------
async function loadBalances() {
    if (!state.wallet.connected) return;

    // Simulated balances for demo (in production: eth_call balanceOf / eth_getBalance)
    const simulatedBalances = {
        'ETH':    2.4518,
        'WETH':   0.8342,
        'USDT':   12450.00,
        'USDC':   8320.50,
        'DAI':    3210.00,
        'WBTC':   0.0482,
        'LINK':   425.30,
        'UNI':    180.00,
        'AAVE':   12.50,
        'PEPE':   42000000,
        'ARB':    3200.00,
        'OP':     1450.00,
        'MATIC':  8500.00,
        'AVAX':   320.00,
        'BNB':    12.80,
        'SOL':    45.20
    };

    const fromBal = simulatedBalances[state.swap.fromToken.symbol];
    const toBal = simulatedBalances[state.swap.toToken.symbol];

    $('fromBalance').textContent = fromBal !== undefined
        ? formatTokenAmount(fromBal, 4)
        : '0.0';

    $('toBalance').textContent = toBal !== undefined
        ? formatTokenAmount(toBal, 4)
        : '0.0';
}

// --------------------------------------------------
// QUOTE ENGINE (Simulated)
// --------------------------------------------------
async function fetchQuote() {
    const { fromToken, toToken, fromAmount } = state.swap;

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
        state.swap.toAmount = '';
        state.swap.route = null;
        updateSwapUI();
        return;
    }

    state.swap.quoting = true;
    updateSwapButtonState();

    // Simulate network delay
    await sleep(300 + Math.random() * 400);

    const inputAmount = parseFloat(fromAmount);
    const usdValue = inputAmount * fromToken.price;

    // Apply simulated slippage & spread
    const spreadPct = 0.0015 + Math.random() * 0.002; // 0.15% - 0.35%
    const outputBeforeFee = usdValue / toToken.price;
    const outputAmount = outputBeforeFee * (1 - spreadPct);

    // Random price impact based on trade size
    let impactPct;
    if (usdValue < 1000) {
        impactPct = getRandomBetween(0.01, 0.08);
    } else if (usdValue < 50000) {
        impactPct = getRandomBetween(0.05, 0.3);
    } else if (usdValue < 500000) {
        impactPct = getRandomBetween(0.2, 0.9);
    } else {
        impactPct = getRandomBetween(0.8, 2.5);
    }

    // Network fee estimation (in native token, converted to USD)
    const gasUsd = getRandomBetween(2, 18);

    // Build route path — direct or multi-hop
    let routePath;
    if (Math.random() > 0.6 && fromToken.symbol !== 'ETH' && toToken.symbol !== 'ETH') {
        routePath = `${fromToken.symbol} → ETH → ${toToken.symbol}`;
    } else if (fromToken.chainId !== toToken.chainId && toToken.chainId !== 0) {
        routePath = `${fromToken.symbol} → Bridge → ${toToken.symbol}`;
    } else {
        routePath = `${fromToken.symbol} → ${toToken.symbol}`;
    }

    const bestSource = pickRandom(LIQUIDITY_SOURCES);

    state.swap.toAmount = outputAmount.toFixed(
        toToken.decimals > 8 ? 8 : 6
    );
    state.swap.route = {
        inputAmount,
        outputAmount,
        usdValue,
        rate: outputAmount / inputAmount,
        impactPct,
        gasUsd,
        routePath,
        bestSource,
        timestamp: Date.now()
    };
    state.swap.quoting = false;

    updateSwapUI();
    updateSwapButtonState();

    // Auto-refresh quote
    scheduleQuoteRefresh();
}

let quoteRefreshTimer = null;

function scheduleQuoteRefresh() {
    clearTimeout(quoteRefreshTimer);
    quoteRefreshTimer = setTimeout(() => {
        if (state.swap.fromAmount && state.swap.route) {
            fetchQuote();
        }
    }, CONFIG.quoteRefreshMs);
}

function updateSwapUI() {
    const { route, toAmount, fromToken, toToken, fromAmount } = state.swap;

    // Output amount
    if (toAmount && parseFloat(toAmount) > 0) {
        $('toAmount').value = formatTokenAmount(toAmount);
        $('swapRoute').style.display = 'block';
    } else {
        $('toAmount').value = '';
        $('swapRoute').style.display = 'none';
    }

    if (route) {
        // USD values
        $('fromUsd').textContent = '~$' + formatNumber(route.usdValue);
        $('toUsd').textContent = '~$' + formatNumber(route.outputAmount * toToken.price);

        // Rate
        const rateStr = route.rate >= 1
            ? `1 ${fromToken.symbol} = ${route.rate.toFixed(4)} ${toToken.symbol}`
            : `1 ${fromToken.symbol} = ${route.rate.toFixed(8)} ${toToken.symbol}`;
        $('rateDisplay').textContent = rateStr;

        // Price impact
        const impactEl = $('priceImpact');
        impactEl.textContent = route.impactPct.toFixed(2) + '%';
        impactEl.className = route.impactPct < 0.5
            ? 'impact-good'
            : route.impactPct < 2
                ? 'impact-warning'
                : 'impact-bad';

        // Network fee
        $('networkFee').textContent = '~$' + route.gasUsd.toFixed(2);

        // Route
        $('routePath').textContent = route.routePath + ' via ' + route.bestSource;
    } else {
        $('fromUsd').textContent = '~$0.00';
        $('toUsd').textContent = '~$0.00';
    }
}

function updateSwapButtonState() {
    const btn = $('swapBtn');
    const { fromAmount, route, quoting } = state.swap;

    if (quoting) {
        btn.textContent = 'Fetching best route...';
        btn.disabled = true;
        return;
    }

    if (!state.wallet.connected) {
        btn.textContent = 'Connect Wallet';
        btn.disabled = false;
        return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
        btn.textContent = 'Enter an amount';
        btn.disabled = true;
        return;
    }

    if (!route) {
        btn.textContent = 'Fetching quote...';
        btn.disabled = true;
        return;
    }

    btn.textContent = 'Confirm Swap';
    btn.disabled = false;
}
// --------------------------------------------------
// TOKEN SELECTOR MODAL
// --------------------------------------------------
function openTokenModal(target) {
    state.ui.tokenModalOpen = true;
    state.ui.modalTarget = target;
    $('tokenModal').classList.add('open');
    $('tokenSearch').value = '';
    renderTokenList('');
    $('tokenSearch').focus();
}

function closeTokenModal() {
    state.ui.tokenModalOpen = false;
    state.ui.modalTarget = null;
    $('tokenModal').classList.remove('open');
}

function renderTokenList(filter) {
    const list = $('tokenList');
    const query = filter.toLowerCase().trim();

    const filtered = TOKENS.filter(t => {
        if (!query) return true;
        return (
            t.symbol.toLowerCase().includes(query) ||
            t.name.toLowerCase().includes(query) ||
            t.address.toLowerCase().includes(query)
        );
    });

    list.innerHTML = '';

    if (filtered.length === 0) {
        list.innerHTML = `<div class="token-empty">No tokens found</div>`;
        return;
    }

    filtered.forEach(token => {
        const el = document.createElement('button');
        el.className = 'token-row';
        el.innerHTML = `
            <img class="token-row-icon" src="${token.logo}" alt="${token.symbol}" onerror="this.style.display='none'">
            <div class="token-row-info">
                <span class="token-row-symbol">${token.symbol}</span>
                <span class="token-row-name">${token.name}</span>
            </div>
            <div class="token-row-right">
                <span class="token-row-price">$${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
        `;
        el.addEventListener('click', () => selectToken(token));
        list.appendChild(el);
    });
}

function selectToken(token) {
    const target = state.ui.modalTarget;

    if (target === 'from') {
        // Prevent same token pair
        if (token.symbol === state.swap.toToken.symbol) {
            state.swap.toToken = state.swap.fromToken;
            updateTokenButtonUI('to');
        }
        state.swap.fromToken = token;
        updateTokenButtonUI('from');
    } else if (target === 'to') {
        if (token.symbol === state.swap.fromToken.symbol) {
            state.swap.fromToken = state.swap.toToken;
            updateTokenButtonUI('from');
        }
        state.swap.toToken = token;
        updateTokenButtonUI('to');
    }

    closeTokenModal();
    loadBalances();

    // Re-quote if amount exists
    if (state.swap.fromAmount && parseFloat(state.swap.fromAmount) > 0) {
        fetchQuote();
    } else {
        updateSwapUI();
        updateSwapButtonState();
    }
}

function updateTokenButtonUI(which) {
    if (which === 'from') {
        $('fromTokenSymbol').textContent = state.swap.fromToken.symbol;
        $('fromTokenIcon').src = state.swap.fromToken.logo;
        $('fromTokenIcon').style.display = '';
    } else {
        $('toTokenSymbol').textContent = state.swap.toToken.symbol;
        $('toTokenIcon').src = state.swap.toToken.logo;
        $('toTokenIcon').style.display = '';
    }
}

// --------------------------------------------------
// TOKEN FLIP
// --------------------------------------------------
function flipTokens() {
    const temp = state.swap.fromToken;
    state.swap.fromToken = state.swap.toToken;
    state.swap.toToken = temp;

    // Move amounts
    const tempAmount = state.swap.fromAmount;
    state.swap.fromAmount = state.swap.toAmount;
    state.swap.toAmount = tempAmount;

    $('fromAmount').value = state.swap.fromAmount || '';
    updateTokenButtonUI('from');
    updateTokenButtonUI('to');
    loadBalances();

    if (state.swap.fromAmount && parseFloat(state.swap.fromAmount) > 0) {
        fetchQuote();
    } else {
        updateSwapUI();
        updateSwapButtonState();
    }
}

// --------------------------------------------------
// SWAP EXECUTION (Simulated)
// --------------------------------------------------
async function executeSwap() {
    if (!state.wallet.connected) {
        connectWallet();
        return;
    }

    const { fromToken, toToken, fromAmount, route } = state.swap;

    if (!fromAmount || !route) return;

    const btn = $('swapBtn');
    const originalText = btn.textContent;

    // Phase 1 — Approve simulation
    btn.textContent = 'Waiting for approval...';
    btn.disabled = true;
    await sleep(1200);

    // Phase 2 — Broadcasting
    btn.textContent = 'Broadcasting transaction...';
    await sleep(1000 + Math.random() * 800);

    // Phase 3 — Confirming
    btn.textContent = 'Confirming swap...';
    await sleep(1500 + Math.random() * 1200);

    // Success
    const txHash = '0x' + Array.from({ length: 64 }, () =>
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');

    showToast(
        `Swapped ${formatTokenAmount(fromAmount)} ${fromToken.symbol} → ${formatTokenAmount(route.outputAmount)} ${toToken.symbol}`
    );

    // Reset form
    state.swap.fromAmount = '';
    state.swap.toAmount = '';
    state.swap.route = null;
    $('fromAmount').value = '';
    updateSwapUI();
    updateSwapButtonState();

    // Bump trade counter
    incrementTradeCounters();
}

function incrementTradeCounters() {
    // Live stat bump on successful swap
    const tradesEl = $('trustTrades');
    const swapsEl = $('statSwaps');
    const current = parseInt(tradesEl.textContent.replace(/[^0-9]/g, '')) || 0;
    const currentSwaps = parseInt(swapsEl.textContent.replace(/[^0-9]/g, '')) || 0;
    tradesEl.textContent = formatNumber(current + 1);
    swapsEl.textContent = formatNumber(currentSwaps + 1);
}

// --------------------------------------------------
// SLIPPAGE SETTINGS
// --------------------------------------------------
function initSlippage() {
    const btn = $('slippageBtn');
    const popover = $('slippagePopover');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!popover.contains(e.target) && e.target !== btn) {
            popover.classList.remove('open');
        }
    });

    $$('.slip-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            $$('.slip-opt').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            state.swap.slippage = parseFloat(opt.dataset.slip);
            showToast(`Slippage set to ${state.swap.slippage}%`);
        });
    });
}

// --------------------------------------------------
// PARTICLE SYSTEM
// --------------------------------------------------
function initParticles() {
    const canvas = $('particles');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;
    let mouseX = -100;
    let mouseY = -100;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Wrap edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(239, 68, 68, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse proximity glow
            const mdx = particles[i].x - mouseX;
            const mdy = particles[i].y - mouseY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 * (1 - mDist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                // Boost particle opacity near mouse
                particles[i].opacity = Math.min(0.8, particles[i].opacity + 0.01);
            }
        }

        animationId = requestAnimationFrame(drawParticles);
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseX = -100;
        mouseY = -100;
    });

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    drawParticles();
}

// --------------------------------------------------
// ANIMATED COUNTERS (Stats Section)
// --------------------------------------------------
function animateValue(el, start, end, duration, formatter) {
    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        el.textContent = formatter(current);

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}

function initStatsCounters() {
    const targets = [
        { el: $('trustTvl'),    value: 847_000_000_000,  formatter: formatUsd },
        { el: $('trustVolume'), value: 312_000_000_000,  formatter: formatUsd },
        { el: $('trustTrades'), value: 14_200_000,       formatter: (v) => formatNumber(v) },
        { el: $('statTvl'),     value: 847_000_000_000,  formatter: formatUsd },
        { el: $('statVolume'),  value: 312_000_000_000,  formatter: formatUsd },
        { el: $('statTraders'), value: 2_400_000,        formatter: (v) => formatNumber(v) },
        { el: $('statSwaps'),   value: 14_200_000,       formatter: (v) => formatNumber(v) }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                targets.forEach(({ el, value, formatter }) => {
                    if (el && !el.dataset.counted) {
                        el.dataset.counted = 'true';
                        animateValue(el, 0, value, 2200, formatter);
                    }
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsSection = $('stats');
    if (statsSection) observer.observe(statsSection);

    // Hero counters run on load (no observer needed — visible immediately)
    setTimeout(() => {
        ['trustTvl', 'trustVolume', 'trustTrades'].forEach(id => {
            const el = $(id);
            if (el && !el.dataset.counted) {
                el.dataset.counted = 'true';
                const target = targets.find(t => t.el === id);
                if (target) animateValue(el, 0, target.value, 2000, target.formatter);
            }
        });
    }, 400);
}

// --------------------------------------------------
// NAVIGATION
// --------------------------------------------------
function initNav() {
    const hamburger = $('hamburger');
    const navLinks = $('navLinks');

    hamburger.addEventListener('click', () => {
        state.ui.navOpen = !state.ui.navOpen;
        navLinks.classList.toggle('open', state.ui.navOpen);
        hamburger.classList.toggle('active', state.ui.navOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            state.ui.navOpen = false;
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // Nav scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 40) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

// --------------------------------------------------
// SCROLL REVEAL
// --------------------------------------------------
function initScrollReveal() {
    const revealElements = $$('.stat-card, .feature-card, .chain-card, .step, .cta-card');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// --------------------------------------------------
// MARQUEE SPEED CONTROL
// --------------------------------------------------
function initMarquee() {
    const marquee = document.querySelector('.marquee-track');
    if (!marquee) return;

    // Pause on hover
    const marqueeSection = document.querySelector('.marquee-section');
    marqueeSection.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    marqueeSection.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
}

// --------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------
function initEventListeners() {
    // Wallet
    $('connectBtn').addEventListener('click', connectWallet);

    // Swap inputs
    const fromAmountInput = $('fromAmount');
    const debouncedQuote = debounce(() => {
        if (state.swap.fromAmount && parseFloat(state.swap.fromAmount) > 0) {
            fetchQuote();
        }
    }, 400);

    fromAmountInput.addEventListener('input', (e) => {
        const cleaned = sanitizeInput(e.target.value);
        e.target.value = cleaned;
        state.swap.fromAmount = cleaned;

        if (!cleaned || parseFloat(cleaned) <= 0) {
            state.swap.toAmount = '';
            state.swap.route = null;
            updateSwapUI();
            updateSwapButtonState();
            return;
        }

        // Quick USD update while debouncing
        const usd = parseFloat(cleaned) * state.swap.fromToken.price;
        $('fromUsd').textContent = '~$' + formatNumber(usd);
        updateSwapButtonState();
        debouncedQuote();
    });

    // Flip
    $('flipBtn').addEventListener('click', flipTokens);

    // Token selectors
    $('fromTokenBtn').addEventListener('click', () => openTokenModal('from'));
    $('toTokenBtn').addEventListener('click', () => openTokenModal('to'));

    // Modal
    $('modalClose').addEventListener('click', closeTokenModal);
    $('tokenModal').addEventListener('click', (e) => {
        if (e.target === $('tokenModal')) closeTokenModal();
    });
    $('tokenSearch').addEventListener('input', (e) => {
        renderTokenList(e.target.value);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.ui.tokenModalOpen) {
            closeTokenModal();
        }
    });

    // Swap button
    $('swapBtn').addEventListener('click', executeSwap);

    // Slippage
    initSlippage();
}

// --------------------------------------------------
// INIT
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initEventListeners();
    initParticles();
    initStatsCounters();
    initScrollReveal();
    initMarquee();

    // Set year in footer
    const yearEl = document.querySelector('.footer-copyright');
    if (yearEl) {
        yearEl.textContent = `© ${new Date().getFullYear()} KeroSwap. All rights reserved.`;
    }

    console.log(
        '%c KeroSwap %c v1.0.0 — DEX Aggregator ',
        'background:#ef4444;color:#0a0a0a;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px;',
        'background:#1a1a2e;color:#ef4444;padding:2px 6px;border-radius:0 3px 3px 0;'
    );
});