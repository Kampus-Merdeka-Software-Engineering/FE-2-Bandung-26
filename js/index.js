const API_URL = "https://be-2-bandung-26-production.up.railway.app";

document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("news.html")) {
        await fetchAllBerita();
    }
});

const fetchAllBerita = async () => {
    try {
        const response = await fetch(`${API_URL}/berita`);
        const berita = await response.json();
        searchAllBerita(berita.data);
        populateHeadlines(berita.data);
        beritaBanner(berita.data);
        beritaTerpopuler(berita.data);
        beritaTerkini(berita.data);
    } catch (error) {
        console.error("Error", error);
    }
};

const searchAllBerita = (berita) => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();

        const filteredBerita = berita.filter(news => news.judul.toLowerCase().includes(searchTerm));

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

const populateHeadlines = (berita) => {
    const currentNewsHead = document.querySelector(".current-news-head");

    const filteredBerita = berita.filter((item) => item.status === "berita-terkini-utama" || item.status === "berita-terpopuler-utama");

    filteredBerita.slice(0, 4).forEach((news) => {
        const headline = document.createElement("h3");
        headline.innerHTML = `<a href="${news.sumber}" target="_blank">${news.judul} </a><span>TOPIK: ${news.topik}</span> `;
        currentNewsHead.appendChild(headline);
    });
};

const beritaBanner = (berita) => {
    const bannerSubContent = document.querySelector(".banner-sub-content");

    berita.slice(0, 4).forEach((news) => {
        const hotTopic = document.createElement("div");
        hotTopic.classList.add("hot-topic");

        const img = document.createElement("img");
        img.src = news.gambar;
        img.alt = "Banner Berita";

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
        a.target = "_blank";

        hotTopicContent.appendChild(h2);
        hotTopicContent.appendChild(h3);
        hotTopicContent.appendChild(p);
        hotTopicContent.appendChild(a);

        hotTopic.appendChild(img);
        hotTopic.appendChild(hotTopicContent);

        bannerSubContent.appendChild(hotTopic);
    });
};

const beritaTerpopuler = (berita) => {
    const section = document.getElementById("berita-terpopuler");
    const containerTopLeft = section.querySelector(".container-top-left");

    const topArticle = containerTopLeft.querySelector("article");

    const containerBottomLeft = section.querySelector(".container-bottom-left");
    const bottomArticles = containerBottomLeft.querySelectorAll("article");

    const beritaPopuler = berita.filter((item) => item.status === "berita-terpopuler-utama");

    if (beritaPopuler.length >= 3) {
        const topBerita = beritaPopuler[0];
        topArticle.innerHTML = `
            <img src="${topBerita.gambar}" alt="Berita Populer"/>
            <div>
                <h3>${topBerita.judul}</h3>
                <p>${topBerita.konten}</p>
                <a href="${topBerita.sumber}" target="_blank">Baca Berita <span>>></span></a>
            </div>
        `;

        for (let i = 1; i <= 2; i++) {
            const beritaItem = beritaPopuler[i];
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

const beritaTerkini = (berita) => {
    const section = document.getElementById("berita-terkini");
    const articles = section.querySelectorAll("article");

    const beritaSekarang = berita.filter((item) => item.status === "berita-terkini-utama");

    beritaSekarang.slice(0, 5).forEach((news, index) => {
        const currentArticle = articles[index];
        if (currentArticle && index < 5) {
            currentArticle.innerHTML = `
                <h4>baru saja</h4>
                <div>
                    <h2>${news.judul}</h2>
                    <p>${news.konten}</p>
                    <a href="${news.sumber}" target="_blank">Baca Berita <span>>></span></a>
                </div>
                <img src="${news.gambar}" alt="Berita Terkini"/>
            `;
        }
    });
};