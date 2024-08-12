document.getElementById('generateMnemonic').addEventListener('click', () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    document.getElementById('mnemonic').innerText = mnemonic;
    localStorage.setItem('mnemonic', mnemonic);
});

document.getElementById('createWallets').addEventListener('click', () => {
    const mnemonic = localStorage.getItem('mnemonic');
    if (!mnemonic) {
        alert('Please generate a mnemonic first.');
        return;
    }
    
    // Create a new wallet using the mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const walletsDiv = document.getElementById('wallets');
    
    // Clear previous wallets
    walletsDiv.innerHTML = '';

    // Generate and display multiple wallets
    for (let i = 0; i < 4; i++) {
        // Use `ethers.Wallet.fromMnemonic` with a derivation path to generate new wallets
        const childWallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
        const publicKey = childWallet.address;
        const walletDiv = document.createElement('div');
        walletDiv.innerText = `Wallet ${i + 1}: ${publicKey}`;
        walletsDiv.appendChild(walletDiv);
    }
});
