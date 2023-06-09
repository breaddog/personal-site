import { EXTERNAL_LINKS } from '../../../../shared'
import { Hyperlink } from '../../../../shared/components'

export interface Web3FaqProps {
  title: string
  content: JSX.Element | Element | string
}

export const WEB3_FAQ: Web3FaqProps[] = [
  {
    title: 'Web3 Explained Like I\'m Five',
    content: (
      <>
        <p>
          You can treat it as a platform where compared to a{' '}
          <b>single person</b> confirming something, like a bank showing how
          much you have.
        </p>
        <br />
        <p>
          Web3 works by having <b>multiple independent people</b> confirming
          that same amount along with many other amounts, transactions and
          actions in a single <b>block</b>, hence decentralised as there is no
          main person.
        </p>
      </>
    ),
  },
  {
    title: 'Blockchain? Is that Lego?',
    content: (
      <>
        <p>
          Blocks can be treated as a <b>group of proofs</b> that confirm events
          in the form of <b>transactions.</b> Transactions could be anything
          from interactions, transfers or creations to name a few.
        </p>
        <br />
        <p>
          Each block is provided with a <b>sequential number</b> and a{' '}
          <b>mathematical hash value</b> calculated from the block's contents
          and <b>data from the previous block.</b>
        </p>
        <br />
        <p>
          If all validators arrive at the <b>same hash value</b>, the block is
          confirmed and added to the <b>chain of blocks</b>, hence the term
          blockchain.
        </p>
        <br />
        <p>
          This means that <b>tampering with previous data will be impossible</b>{' '}
          as it will affect future calculations, providing a level of{' '}
          <b>immutability and security</b> as all validators would need to
          arrive at the same hash value when validating a block.
        </p>
      </>
    ),
  },
  {
    title: 'Ethereum? Ethereum.',
    content: (
      <>
        <p>
          Ethereum works off a <b>Proof of Stake</b> network, meaning the more
          you stake in the network when starting a <b>validator node</b>, the
          higher chance you have of being <b>selected</b> as one of the
          validator nodes participating in the{' '}
          <b>validation of a single block</b> and receiving a cut of fees used
          in transactions from the block (you might even be tipped for it!).
        </p>
        <br />
        <p>
          A popular use on the Ethereum Blockchain is the use of tokens to
          represent a variety of concepts/ideas. Tokens can either be{' '}
          <b>fungible (multiple)</b> or <b>non-fungible (unique).</b>
        </p>
        <br />
        <p>There exists three popular standards for tokens:</p>
        <ul>
          <li>
            <b>ERC-20</b>: Fungible, popular with currency/points based
            applications.
          </li>
          <li>
            <b>ERC-721</b>: Non-fungible, NFT stands for Non-Fungible Token.
          </li>
          <li>
            <b>ERC-1155</b>: Can be both, used for variable/versatile
            applications.
          </li>
        </ul>
        <br />
        <p>
          Each one of these tokens are <b>minted</b> from a platform on the
          Ethereum Network called a <b>Smart Contract</b>
        </p>
      </>
    ),
  },
]
