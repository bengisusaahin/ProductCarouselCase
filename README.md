<h1 align="center">
e-Bebek Product Carousel
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/javascript-7c6fe1%3Fstyle%3Dflat%26logo%3Djavascript%26logoColor%3D%23F7DF1E?style=flat&logo=javascript&logoColor=%23000000&color=%23FFFFFF">
</p>

This project replicates the "Recommended for You" product carousel from the e-bebek.com homepage. It is built entirely with vanilla JavaScript, without relying on third-party libraries such as jQuery.

## 📚 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Development Decisions](#development-decisions)
  - [Responsiveness](#responsiveness)
  - [Favorites Toggle](#favorites-toggle)
  - [Scroll Logic](#scroll-logic)
  - [Semantic Commits](#semantic-commits)
- [Contact](#contact)
- [Licence](#licence)

---

## Features

- Pure JavaScript product carousel
- Dynamic product data fetch from a public Gist or localStorage
- Fully styled with JS-injected CSS
- Heart (favorite) icon toggle & localStorage persistence
- Manual scrolling via navigation arrows
- Drag-to-scroll support
- Swipe button support (custom-made)
- Mobile responsiveness (improved for common breakpoints)
- Modular and maintainable architecture

---

## Demo

> Works best on desktop and mobile simulators. Ensure you’re on the homepage (`/` or `/index.html`) for full functionality.

[ebebek _ Anne ve Bebek Ürünleri - Bebek Mağazaları - Google Chrome 2025-04-07 22-13-13.webm](https://github.com/user-attachments/assets/7251967a-5968-4e2a-a9dc-675463be3b60)

---

## Installation

# Clone the repo
git clone https://github.com/bengisusaahin/ProductCarouselCase.git

Open https://www.e-bebek.com/

Right-click anywhere on the page and select "Inspect"

Go to the Console tab

Copy and paste the entire JS code (from BENGISU_SAHIN.js) into the console

Hit Enter and see the carousel appear on the homepage

## Tech Stack

- Vanilla JavaScript (ES6+)
- HTML DOM API
- CSS (inline injection)
- localStorage
- Fetch API

## Development Decisions
## Responsiveness
The structure mimics the real DOM on e-bebek.com. Extra effort was put into mimicking layout behaviors and ensuring mobile compatibility using scroll width, margins, and breakpoints.

## Favorites Toggle
The heart icon uses four different SVG states and toggles via class switching. The favorite product IDs are stored in localStorage under the key ebFavorites.

## Scroll Logic
Carousel scroll is handled by translating the X position of the .owl-stage with JavaScript. Button states and scroll bounds are dynamically calculated using container width and item width.

## Semantic Commits
This project follows atomic commit practices and uses semantic commit messages. 

- **Atomic Commits**: Each commit should represent a single logical change. This makes it easier to understand the history of changes and to revert specific changes if necessary.
  
- **Semantic Commit Messages**: Commit messages should follow the format:
  - `type(scope): subject`
  - Examples of types include:
    - `feat`: A new feature
    - `fix`: A bug fix
    - `docs`: Documentation changes
    - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
    - `refactor`: A code change that neither fixes a bug nor adds a feature
    - `test`: Adding missing tests or correcting existing tests
    - `chore`: Changes to the build process or auxiliary tools and libraries

This practice helps maintain a clear and organized commit history, making it easier for contributors to understand the project's evolution.

## Contact

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding-right: 10px;">Bengisu Şahin - <a href="mailto:bengisusaahin@gmail.com">bengisusaahin@gmail.com</a></td>
    <td>
      <a href="https://www.linkedin.com/in/bengisu-sahin/" target="_blank">
        <img src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" style="vertical-align: middle;" />
      </a>
    </td>
  </tr>
</table>

## Licence
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
