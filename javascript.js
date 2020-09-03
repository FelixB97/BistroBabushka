//JSON fetch:

let retter;
let filter = "alle";

const link = "https://spreadsheets.google.com/feeds/list/1X12aLU9AzyTNRiG9xer9NofQufUxZiSPcwtLHEQndko/od6/public/values?alt=json";

async function hentData(link) {
    const respons = await fetch(link);
    const json = await respons.json();
    vis(json);
    buttonEventListeners();
}

function vis(retter) {
    console.log(retter);
    container.innerHTML = "";
    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            console.log('ret filter');
            const klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            klon.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
            klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
            klon.querySelector(".pris").textContent = "pris: " + ret.gsx$pris.$t + " kr. ,-";
            klon.querySelector("#listContainer").addEventListener("click", () => visDetaljer(ret));
            container.appendChild(klon);
        }
    })
}

function visDetaljer(ret) {
    console.log(retter);
    popup.querySelector("h2").textContent = ret.gsx$navn.$t;
    popup.style.display = "block";
    document.querySelector("#popup").addEventListener("click", tilbage);
    popup.querySelector(".kategori").textContent = ret.gsx$kategori.$t;
    popup.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;
    popup.querySelector(".lang").textContent = ret.gsx$lang.$t;
    popup.querySelector("img").src = "imgs/large/" + ret.gsx$billede.$t + ".jpg";
}

function tilbage() {
    popup.style.display = "none";
}



//button funktioner for filtre:
function buttonEventListeners() {
    console.log('buttonEventListeners');
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });

}

function filterBTNs() {
    console.log('clicked button ' + this.dataset.type);
    filter = this.dataset.type;
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("buttonClicked"));

    if (filter == "alle") {

        document.querySelector(".filter:first-child").classList.add("buttonClicked");
    } else if (filter == "desserter") {

        document.querySelector(".filter:nth-child(2)").classList.add("buttonClicked");
    } else if (filter == "drikkevarer") {

        document.querySelector(".filter:nth-child(3)").classList.add("buttonClicked");
    } else if (filter == "forretter") {

        document.querySelector(".filter:nth-child(4)").classList.add("buttonClicked");
    } else if (filter == "hovedretter") {

        document.querySelector(".filter:nth-child(5)").classList.add("buttonClicked");
    } else if (filter == "sideorders") {

        document.querySelector(".filter:last-child").classList.add("buttonClicked");
    }

    hentData(link);
}


hentData(link);

let container = document.querySelector("#listSection");
let temp = document.querySelector("template");
