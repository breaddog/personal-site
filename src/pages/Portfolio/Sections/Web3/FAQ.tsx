export interface Web3FaqProps {
  title: string
  content: JSX.Element | Element | string
}

export const WEB3_FAQ: Web3FaqProps[] = [
  {
    title: 'Web3 Simplified (ELI5)',
    content: (
      <>
        <p>
          For context, the internet is a <b>connection of networks</b>, with
          each network having it's own content hosted on servers,{' '}
          <b>owned by individuals</b>. All content retrieval requests are done
          by querying network nodes on{' '}
          <b>finding the fixed location of where its hosted</b> amongst the web
          of connections.
        </p>
        <br />
        <p>
          This <b>centralised hosting and ownership</b> of content means that
          events such as blacklisting, server/network downtime will render the
          content inacessible as the location where it's stored cannot be
          accesed.
        </p>
        <br />
        <p>
          Web3 works by having <b>direct content retreival</b>, where identical
          copies are hosted simultaneously across multiple nodes Any change to
          it will be reflected across all of them allowing for{' '}
          <b>decentralised distribution and hosting</b> with guaranteed data
          integrity and uptime.
        </p>
        <br />
        <p>
          We can expand on this by integrating <b>blockchain technology</b>,
          having an overall state of content available which all nodes must
          match and replicate, creating a transparent, tamper-proof and reliable
          network that is <b>user control oriented</b>.
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
          form of interaction such as updates, transfers or creations to name a
          few.
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
