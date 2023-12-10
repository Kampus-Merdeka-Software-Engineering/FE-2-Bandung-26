const API_URL = "https://be-2-bandung-26-production.up.railway.app";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const topik = urlParams.get('topik');

    if (topik) {
        await fetchBeritaByTopik(topik);
    }
});

const fetchBeritaByTopik = async (topik) => {
    try {
        const endpoint = `${API_URL}/berita/topik/${topik}`;
        const response = await fetch(endpoint);
        const berita = await response.json();

        console.log(berita);
        searchingAllBerita(berita.data);
        displayHeadlines(berita.data);
        displayBanner(berita.data);
        displayBeritaTerpopuler(berita.data);
        displayBeritaTerkini(berita.data);
    } catch (error) {
        console.error("Error", error);
    }
};

const searchingAllBerita = (berita) => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();

        const filteredBerita = berita.filter(news => news.judul.toLowerCase().includes(searchTerm));
        console.log(filteredBerita);

        updateFrontend(filteredBerita);
    });
};

const updateFrontend = (filteredBerita) => {
    const hotTopics = document.querySelectorAll(".hot-topic");

    hotTopics.forEach((topic, index) => {
        const news = filteredBerita[index];
        const hotTopicContent = topic.querySelector(".hot-topic-content");

        if (news) {
            const img = topic.querySelector("img");
            img.src = news.gambar;
            hotTopicContent.querySelector("h2").innerText = news.judul;
            hotTopicContent.querySelector("h3").innerText = news.topik;
            hotTopicContent.querySelector("p").innerText = news.konten;
        } else {
            topic.style.display = "none";
        }
    });
};

const displayHeadlines = (berita) => {
    const currentNewsHead = document.querySelector(".current-news-head");

    berita.slice(0, 4).forEach((news) => {
        const headline = document.createElement("h3");
        headline.innerHTML = `${news.judul} <span>TOPIK: ${news.topik}</span>`;
        currentNewsHead.appendChild(headline);
    });
};

const displayBanner = (berita) => {
    const bannerSubContent = document.querySelector(".banner-sub-content");

    berita.slice(0, 4).forEach((news) => {
        const hotTopic = document.createElement("div");
        hotTopic.classList.add("hot-topic");

        const img = document.createElement("img");
        img.src = news.gambar;
        img.alt = "";

        const hotTopicContent = document.createElement("div");
        hotTopicContent.classList.add("hot-topic-content");

        const h2 = document.createElement("h2");
        h2.textContent = news.judul;

        const h3 = document.createElement("h3");
        h3.textContent = news.topik;

        const p = document.createElement("p");
        p.textContent = news.konten;

        const a = document.createElement("a");
        a.href = news.sumber;
        a.textContent = "Baca Berita";

        hotTopicContent.appendChild(h2);
        hotTopicContent.appendChild(h3);
        hotTopicContent.appendChild(p);
        hotTopicContent.appendChild(a);

        hotTopic.appendChild(img);
        hotTopic.appendChild(hotTopicContent);

        bannerSubContent.appendChild(hotTopic);
    });
};

const displayBeritaTerpopuler = (berita) => {
    const containerTopLeft = document.querySelector('.container-top-left');
    const containerBottomLeft = document.querySelector('.container-bottom-left');
    const bottomArticles = containerBottomLeft.querySelectorAll("article");

    if (berita.length >= 3) {
        const topBerita = berita[0];
        containerTopLeft.innerHTML = `
            <article>
                <img src="${topBerita.gambar}" />
                <div>
                    <h3>${topBerita.judul}</h3>
                    <p>${topBerita.konten}</p>
                    <a href="${topBerita.sumber}" target="_blank">Baca Berita <span>>></span></a>
                </div>
            </article>
        `;

        for (let i = 1; i <= 2; i++) {
            const beritaItem = berita[i];
            const bottomArticle = bottomArticles[i - 1];
            bottomArticle.innerHTML = `
                <img src="${beritaItem.gambar}" />
                <div>
                    <h3>${beritaItem.judul}</h3>
                    <p>${beritaItem.konten}</p>
                    <a href="${beritaItem.sumber}" target="_blank">Baca Berita <span>>></span></a>
                </div>
            `;
        }
    }
};

const displayBeritaTerkini = (berita) => {
    const section = document.getElementById("berita-terkini");
    const articles = section.querySelectorAll("article");

    berita.slice(0, 5).forEach((news, index) => {
        if (articles[index]) {
            articles[index].innerHTML = `
                <h4>just in</h4>
                <div>
                    <h2>${news.judul}</h2>
                    <p>${news.konten}</p>
                    <a href="${news.sumber}" target="_blank">Baca Berita <span>>></span></a>
                </div>
                <img src="${news.gambar}" />
            `;
        }
    });
};