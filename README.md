# Personal Site
[![Site Status][site-status-shield]][site-url]
[![Actions Status][site-build-shield]][site-build-url]
[![Stars][stars-shield]][stars-url]
[![Languages][languages-shield]][repo-url]


<p align="center">
  <a href="https://tienfoong.com">
    <img src="https://tienfoong.com/icons/onigiri.svg" alt="logo" height="100" />
    </a>
  </p>
  <h2 align="center">
  Tien Foong's Personal Site
  </h2>
  <p align="center">
    Portfolio &middot; Hobbies &middot; Miscellaneous
  </p>
  <br />
  <p align="center">
    A showcase of my ever-expanding web-dev toolkit and skills used as
    <br />
    a form of self expression through code and design.
  </p>
  <p align="center">  
    <a href="https://tienfoong.com">Click here to visit</a>
  </p>


<details open="open">
  <summary><h2 style="display: inline-block">Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-site">About The Site</a>
      <ul>
        <li>
          <a href="#preamble">Preamble</a>
        </li>
        <li>
          <a href="#languages">Languages</a>
        </li>
        <li>
          <a href="#technologies">Technologies</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#setting-up">Setting Up</a>
      <ul>
        <li><a href="#open-sourcing">Open Sourcing</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#contents">Contents</a>
      <ul>
        <li><a href="#routing">Routing</a></li>
      </ul>
    </li>
    <li>
      <a href="#license">License</a>
      <ul>
        <li>
          <a href="#open-sourcing">Open Sourcing</a></li>
        <li>
          <a href="#ackowledgements">Acknowledgements</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>

  </ol>
</details>


## About the Site

### Preamble

This site is wholy built for the sake of personal expression as an individual via design and code in both professional and personal capacities.

Initially conceived as a portfolio site to showcase my development skills, I have future plans to expand on it to cover more personal stuff.

The site also interacts with the ethereum blockchain in a read capacity for now and supports the following wallets:
- [Metamask](https://metamask.io/)
- [Coinbase](https://www.coinbase.com)
- Future support for other wallets coming soon

Also if you're wondering why the onigiri, i'll point you to this fellow [cool gamer cat.](https://hololive.hololivepro.com/en/talents/nekomata-okayu/)


### Languages

Website was fully built using typescript and css using React and Sass.
<ul>
  <li>
    <a href="https://typescript.org">Typescript</a>
  </li>
  <li>
    <a href="https://sass-lang">Sass (CSS)</a>

  </li>
</ul>

### Technologies
Some packages are required to be installed with `yarn` to run the website, here are some of the notable ones.

For installation instructions please view [the setting up section.](#setting-up)

Front-End 
<ul>
  <li><a href="https://react.org">React</a></li>
  <li><a href="https://sass-lang">Sass</a></li>
  <li><a href="https://greensock.com/gsap/">GSAP</a></li>
  <li><a href="https://michalsnik.github.io/aos/">AOS</a></li>
    <li><a href="https://swiperjs.com">Swiper</a>
  <li><a href="https://github.com/Aljullu/react-lazy-load-image-component#readme">React Lazy Load Image Component</a></li>
  <li><a href="https://pages.github.org">Github Pages</a></li>
  <li><a href="https://github.com/tschaub/gh-pages">gh-pages</a></li>

</ul>

Linting and Deployment
<ul>
  <li><a href="https://typicode.github.io/husky/">Husky</a></li>
  <li><a href="https://eslint.org">Eslint</a></li>
  <li><a href="https://prettier.io/">Prettier</a></li>
  <li><a href="https://github.com/features/actions">Github Actions</a></li>
</ul>


Web3
<ul>
  <li><a href="https://ethers.org">Ethers</a></li>
  <li><a href="https://github.com/Uniswap/web3-react#readme">web3-react</a></li>
</ul>

Supported Ethereum Wallets
<ul>
  <li><a href="https://metamask.io/">Metamask</a></li>
  <li><a href="https://www.coinbase.com">Coinbase</a></li>
  <li>Future support for other wallets coming soon</li>
</ul>


## Setting Up

### Installation

1. Clone this repository
   ```
    $ git clone https://github.com/breaddog/personal-site
   ```
2. Install dependencies
    ```
      $ yarn --frozen-lockfile
    ```

3. Optionally create a `.env` file that follows the template of `template.env`, you can leave out some or all variables if you wish
4. Depending on your operating system, run the site on a local machine via:
    ```
    windows
    $ yarn winStart

    mac, linux, wsl
    $ yarn start
    ```

## Contents

### Routing

Here is a routing tree to illustrate the url hierarchy

```
/                           # Homepage (Portfolio)
└── /projects/              # Parent project directory (directory coming soon)
│   ├── /:projectKey        # Projects go here
│   └── /:projectKey        # Unique project error page if not found
│
└── /                       # Error handling will redirect to root
```

 

## License

### Open Sourcing
[![License: MIT][mit-license-shield]][mit-license-shield]

This site is distributed under the MIT License, which means you can create a fork of this repository and make a derrivative provided **full and proper author credit** has been given.

Generally a direct reference link to my github page would be most appreciated!

For more information, please view the `LICENSE` file included in the repository.

### Ackowledgements

### Assets
Acknowledgements have been provided below for the use of assets which have been used per their own licensing rules.

Images shown in the preview sections of the "Highlights" section and used in said project articles are sourced from screenshots. All attribution and links to the relevant websites are recognised by reference to the main site the article references.

SVGS

- [SVG Repo](https://svgrepo.com)
- [Wikimedia Commons](https://https://commons.wikimedia.org/wiki/Main_Page)


Background
- [SVG Backgrounds](https://www.svgbackgrounds.com/)


Brand Images
- [University of Melbourne](https://unimelb.edu.au)
- [Pellar Technology](https://pellar.io)


All rights reserved and images are owned by their respective owners.

 
## Contact

Code done wholey by [breaddog](https://github.com/breaddog)

You can contact me by [opening an issue here.](https://github.com/breaddog/personal-site/issues)


<!-- sheilds -->
[mit-license-shield]: https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge
[site-status-shield]: https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Ftienfoong.com&style=for-the-badge
[site-build-shield]: https://img.shields.io/github/actions/workflow/status/breaddog/personal-site/.github/workflows/main.yml?style=for-the-badge

[stars-shield]: https://img.shields.io/github/stars/breaddog/personal-site?style=for-the-badge
[languages-shield]: https://img.shields.io/github/languages/count/breaddog/personal-site?style=for-the-badge

<!-- urls -->
[site-url]: https://tienfoong.com
[site-build-url]: https://github.com/breaddog/personal-site/actions
[mit-license-url]: https://opensource.org/licenses/MIT
[stars-url]: https://github.com/breaddog/personal-site/stargazers
[repo-url]: https://github.com/breaddog/personal-site
