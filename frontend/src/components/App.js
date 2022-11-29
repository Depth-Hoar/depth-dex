import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json';
import Navbar from './Navbar'
import Markets from './Markets'

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange
} from '../store/interactions';

function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Connect Ethers to blockchain
    const provider = loadProvider(dispatch)

    // fetch current networks chainId
    const chainId = await loadNetwork(provider, dispatch)
    
    // fetch current account and balance from metamask
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, dispatch)
    })

    //reload page when netwok changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // load Token Contracts
    const depth = config[chainId].depth;
    const mETH = config[chainId].mETH;
    await loadTokens(provider, [depth.address, mETH.address], dispatch)


    // Load Exchange Contract
    const exchangeConfig = config[chainId].exchange
    await loadExchange(provider, exchangeConfig.address, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  })


  return (
    <div>

    <Navbar/>

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          <Markets />

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

    {/* Alert */}

    </div>
  );
}

export default App;
