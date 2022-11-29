import { useSelector, useDispatch } from "react-redux";
import Blockies from 'react-blockies';
import { loadAccount} from '../store/interactions';
import config from '../config.json';

const Navbar = () => {

  const provider = useSelector(state => state.provider.connection)
  const chainId = useSelector(state => state.provider.chainId)
  const account = useSelector(state => state.provider.account)
  const balance = useSelector(state => state.provider.balance)

  const dispatch = useDispatch()

  const connectHandler = async () => {
    await loadAccount(provider,dispatch)
  };

  const networkHandler = async (event) => {
    await window.ethereum.request({ 
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: event.target.value }]
    })
  }

  return(
    <div className='exchange__header grid'>
      <div className='exchange__header--brand flex'>
        <h1>Depth Token Exchange</h1>
      </div>

      <div className='exchange__header--networks flex'>
      {chainId && (
        <select name='networks' id='networks' value={config[chainId] ? `0x${chainId.toString(16).toUpperCase()}` : `0`} onChange={networkHandler}>
          <option value="0x7E6" >Beresheet</option>
          <option value="0x5" >Goerli</option>
          <option value="0x7A69" >Local Host</option>
        </select>
      )}
      </div>

      <div className='exchange__header--account flex'>
        {balance ? 
          <p><small>My Balance</small>{Number(balance).toFixed(4)}</p>
          : <p><small>My Balance</small>0</p>
        }
        {account ? 
          <a href={config[chainId] ? `${config[chainId].explorerURL}/address/${account}` : '#'}>
            {account.slice(0,5) + '...' + account.slice(38,42)}
            <Blockies
              seed={account}
              size={6}
              scale={3}
              color='#2187D0'
              bgColor='#F1F2F9'
              spotColor='#767F92'
              className='identicon' 
            />
          </a>
          : <button
              variant='contained'
              onClick={connectHandler}>
              Connect Account
            </button>
        }
      </div>
    </div>
  )
}

export default Navbar;