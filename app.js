const connectWalletBtn = document.getElementById('connectWallet');
const artGenerator = document.getElementById('artGenerator');
const accessDenied = document.getElementById('accessDenied');

const collectionAddress = '0xYourCollectionAddressHere'; // Replace with your collection's contract address

async function connectWallet() {
    let provider;

    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        alert('Please install MetaMask or another web3 wallet.');
        return;
    }

    try {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        if (!account) {
            alert('Please unlock your web3 wallet and connect to the desired network.');
            return;
        }

        checkNFTCollection(web3, account);
    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
}

async function checkNFTCollection(web3, account) {
    const contractABI = []; // Replace with your NFT collection's contract ABI
    const contract = new web3.eth.Contract(contractABI, collectionAddress);
    const balance = await contract.methods.balanceOf(account).call();

    if (balance > 0) {
        accessDenied.classList.add('hidden');
        artGenerator.classList.remove('hidden');
    } else {
        artGenerator.classList.add('hidden');
        accessDenied.classList.remove('hidden');
    }
}

connectWalletBtn.addEventListener('click', connectWallet);
