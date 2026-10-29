/* ===== AetherSwap | Frontend Logic ===== */

const AETHER_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png', chain: 'Ethereum', price: 3240 },
  { symbol: 'BTC', name: 'Bitcoin', address: '0xBtcPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png', chain: 'Bitcoin', price: 64200 },
  { symbol: 'USDT', name: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png', chain: 'Ethereum', price: 1 },
  { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png', chain: 'Ethereum', price: 1 },
  { symbol: 'SOL', name: 'Solana', address: '0xSolPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png', chain: 'Solana', price: 142 },
  { symbol: 'BNB', name: 'BNB', address: '0xBnbPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binancesmartchain/info/logo.png', chain: 'BNB Chain', price: 570 },
  { symbol: 'ARB', name: 'Arbitrum', address: '0xArbPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x912ce59144191c1204e64559fe8253a0e46e6548/logo.png', chain: 'Arbitrum', price: 1.1 },
  { symbol: 'OP', name: 'Optimism', address: '0xOpPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4200000000000000000000000000000000000042/logo.png', chain: 'Optimism', price: 2.4 },
  { symbol: 'MATIC', name: 'Polygon', address: '0xMaticPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png', chain: 'Polygon', price: 0.7 },
  { symbol: 'AVAX', name: 'Avalanche', address: '0xAvaxPlaceholder', icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanche/info/logo.png', chain: 'Avalanche', price: 36 }
];

let fromToken = AETHER_TOKENS[0];
let toToken = AETHER_TOKENS[2];
let slippage = 0.5;
let isConnected = false;
let fromAmountValue = 0;

// Elements
const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromTokenBtn = document.getElementById('fromTokenBtn');
const toTokenBtn = document.getElementById('toTokenBtn');
const fromTokenSymbol = document.getElementById('fromTokenSymbol');
const fromTokenIcon = document.getElementById('fromTokenIcon');
const toTokenSymbol = document.getElementById('toTokenSymbol');
const toTokenIcon = document.getElementById('toTokenIcon');
const flipBtn = document.getElementById('flipBtn');
const swapBtn = document.getElementById('swapBtn');
const modal = document.getElementById('tokenModal');
const modalClose = document.getElementById('modalClose');
const tokenList = document.getElementById('tokenList');
const tokenSearch = document.getElementById('tokenSearch');
let activeField = null;

// Slippage
const slippageBtn = document.getElementById('slippageBtn');
const slippagePopover = document.getElementById('slippagePopover');
const slipOpts = document.querySelectorAll('.slip-opt');

// Trust metrics
const trustTvl = document.getElementById('trustTvl');
const trustVolume = document.getElementById('trustVolume');
const trustTrades = document.getElementById('trustTrades');

// Stats counters
const counters = document.querySelectorAll('.counter');

// Initialize
function init() {
  renderToken(fromTokenBtn, fromToken);
  renderToken(toTokenBtn, toToken);
  updateSwapBtnState();
  calculateReverse();
  renderTokenList();
  animateCounters();
  startStatsPulse();
  setupListeners();
}

function setupListeners() {
  // From amount input
  fromAmountInput.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value) || 0;
    fromAmountValue = val;
    toAmountInput.value = (val * getRate()).toFixed(6);
    updateUsdDisplays();
    updateSwapBtnState();
  });

  // To amount input (readonly but allow programmatic)
  toAmountInput.addEventListener('input', (e) => {
    // Reverse calc
    const val = parseFloat(e.target.value) || 0;
    fromAmountInput.value = (val / getRate()).toFixed(6);
    fromAmountValue = parseFloat(fromAmountInput.value) || 0;
    updateUsdDisplays();
    updateSwapBtnState();
  });

  // Token buttons
  fromTokenBtn.addEventListener('click', () => { activeField = 'from'; openModal(); });
  toTokenBtn.addEventListener('click', () => { activeField = 'to'; openModal(); });

  // Flip
  flipBtn.addEventListener('click', flipTokens);

  // Swap
  swapBtn.addEventListener('click', handleSwap);

  // Modal close
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Search
  tokenSearch.addEventListener('input', (e) => renderTokenList(e.target.value));

  // Slippage
  slippageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    slippagePopover.style.display = slippagePopover.style.display === 'block' ? 'none' : 'block';
  });
  slipOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      slippage = parseFloat(opt.dataset.slip);
      slipOpts.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      slippagePopover.style.display = 'none';
    });
  });

  // Close popover on outside click
  document.addEventListener('click', (e) => {
    if (!slippageBtn.contains(e.target) && !slippagePopover.contains(e.target)) {
      slippagePopover.style.display = 'none';
    }
  });

  // Connect button
  document.getElementById('connectBtn').addEventListener('click', toggleConnect);
}

function renderToken(btn, token) {
  const icon = btn.querySelector('.token-icon');
  const sym = btn.querySelector('span');
  icon.src = token.icon;
  sym.textContent = token.symbol;
}

function updateSwapBtnState() {
  if (!isConnected) {
    swapBtn.textContent = 'Connect Wallet';
    swapBtn.className = 'btn btn-primary btn-swap';
    return;
  }
  if (fromAmountValue <= 0) {
    swapBtn.textContent = 'Enter Amount';
    swapBtn.className = 'btn btn-primary btn-swap';
    swapBtn.disabled = true;
  } else {
    swapBtn.textContent = `Swap ${fromToken.symbol} → ${toToken.symbol}`;
    swapBtn.className = 'btn btn-primary btn-swap';
    swapBtn.disabled = false;
  }
}

function getRate() {
  return toToken.price / fromToken.price;
}

function calculateReverse() {
  const val = parseFloat(fromAmountInput.value) || 0;
  toAmountInput.value = (val * getRate()).toFixed(6);
  updateUsdDisplays();
}

function updateUsdDisplays() {
  const fromUsd = document.getElementById('fromUsd');
  const toUsd = document.getElementById('toUsd');
  const fromUsdVal = (fromAmountValue * fromToken.price).toFixed(2);
  const toUsdVal = (parseFloat(toAmountInput.value || 0) * toToken.price).toFixed(2);
  fromUsd.textContent = `~$${fromUsdVal}`;
  toUsd.textContent = `~$${toUsdVal}`;
}

function flipTokens() {
  [fromToken, toToken] = [toToken, fromToken];
  renderToken(fromTokenBtn, fromToken);
  renderToken(toTokenBtn, toToken);
  const fromVal = fromAmountInput.value;
  fromAmountInput.value = toAmountInput.value;
  toAmountInput.value = fromVal;
  calculateReverse();
  updateSwapBtnState();
}

function openModal() {
  renderTokenList();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  tokenSearch.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderTokenList(filter = '') {
  tokenList.innerHTML = '';
  const filtered = AETHER_TOKENS.filter(t =>
    t.symbol.toLowerCase().includes(filter.toLowerCase()) ||
    t.name.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach(t => {
    const div = document.createElement('div');
    div.className = 'token-item';
    div.innerHTML = `
      <img src="${t.icon}" alt="${t.symbol}" class="token-item-icon">
      <div class="token-item-info">
        <div class="token-item-sym">${t.symbol}</div>
        <div class="token-item-name">${t.name}</div>
      </div>
      <div class="token-item-chain">${t.chain}</div>
    `;
    div.addEventListener('click', () => {
      if (activeField === 'from') {
        fromToken = t;
        renderToken(fromTokenBtn, fromToken);
      } else {
        toToken = t;
        renderToken(toTokenBtn, toToken);
      }
      calculateReverse();
      updateSwapBtnState();
      closeModal();
    });
    tokenList.appendChild(div);
  });
}

function handleSwap() {
  if (!isConnected) return toggleConnect();
  const amount = fromAmountInput.value;
  const rate = getRate();
  const result = (parseFloat(amount) * rate).toFixed(6);
  swapBtn.textContent = 'Swapping...';
  swapBtn.disabled = true;

  setTimeout(() => {
    swapBtn.innerHTML = '<span style="color:var(--success)">✓ Swapped!</span>';
    setTimeout(() => {
      swapBtn.textContent = `Swap ${fromToken.symbol} → ${toToken.symbol}`;
      swapBtn.disabled = false;
    }, 2000);
  }, 1500);
}

function toggleConnect() {
  isConnected = !isConnected;
  const dot = document.querySelector('.wallet-dot');
  if (isConnected) {
    swapBtn.textContent = `Swap ${fromToken.symbol} → ${toToken.symbol}`;
    dot.style.background = '#10b981';
    updateSwapBtnState();
  } else {
    swapBtn.textContent = 'Connect Wallet';
    dot.style.background = '#ef4444';
    updateSwapBtnState();
  }
}

// Stats animations
function animateCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        function animate(time) {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const val = Math.floor(progress * target);
          el.textContent = prefix + val.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

function startStatsPulse() {
  setInterval(() => {
    trustTvl.textContent = '$' + (847 + Math.random() * 20).toFixed(1) + 'M';
    trustVolume.textContent = '$' + (234 + Math.random() * 10).toFixed(1) + 'M';
    trustTrades.textContent = Math.floor(4821947 + Math.random() * 5000).toLocaleString();
  }, 4000);
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => revealObserver.observe(r));

// Navbar blur on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 14, 23, 0.95)';
  } else {
    nav.style.background = 'rgba(10, 14, 23, 0.7)';
  }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Init on load
document.addEventListener('DOMContentLoaded', init);