class NavSmallScreen extends HTMLElement {
    isOpen = false;
    connectedCallback() {
        this.#render();
    }

    #render() {
        this.#template();
        this.#onClick();
        this.#onScroll();
        this.#onClickChildMenu();
    }

    #template() {
        this.innerHTML = `
        <div style="display: flex;">
        <div class="logo">
            <a href="#"><img src="assets/logo/logo-bg-dark-small.png" alt="Naratif Indonesia" /></a>
        </div>
        <button id="nav-small-screen__button">
            <div></div>
            <div></div>
            <div></div>
        </button>
        </div>

        <div id="nav-small-screen__menu" style="display: none;">
            <div><a href="#header">Beranda</a></div>
            <div><a href="#article-profile">Tentang Kami</a></div>
            <div><a href="#article-service">Layanan</a></div>
            <div><a href="#article-members">Tim</a></div>
            <div><a href="#">Berita</a></div>
        </div>
    `;
    }

    #onClick() {
        const humburgerButton = document.getElementById("nav-small-screen__button");
        const menu = document.getElementById("nav-small-screen__menu");
        humburgerButton.onclick = () => {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                menu.style = "display: block";
            } else {
                menu.style = "display: none";
            }
        };
    }

    #onClickChildMenu() {
        const menu = document.getElementById("nav-small-screen__menu");

        for (let i = 0; i < menu.children.length; i++) {
            menu.children[i].onclick = () => {
                menu.style = "display: none";
                this.isOpen = false;
            };
        }
    }

    #onScroll() {
        const thisElement = this;
        window.onscroll = function () {
            scrollFunction();
        };
        function scrollFunction() {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                thisElement.style.position = "fixed";
                thisElement.style.boxShadow = "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;";
            } else {
                thisElement.style.position = "sticky";
                thisElement.style.boxShadow = "none";
            }
        }
    }
}

customElements.define("nav-small-screen", NavSmallScreen);
