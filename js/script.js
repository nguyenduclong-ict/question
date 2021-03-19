let yes = false;
let clickedCounts = 0;
let switchAfter = Math.floor(Math.random() * 5) + 1;
let noCounts = 0;
let yesCounts = 0;
let saved = false;
let ip;

async function getIp() {
  return fetch("https://ipinfo.io/json?token=c2f8f3a72345dc", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}

window.onload = () => {
  const search = new URLSearchParams(window.location.search);
  const id = search.get("id");
  const q = search.get("q");
  const m = search.get("m") || "HIHI";
  const yesText = search.get("yt") || "Có";
  const noText = search.get("nt") || "Không";
  const all = search.get("all");
  const text = document.querySelector("#text");
  const btnOk = document.querySelector("#btn-ok"),
    btnNo = document.querySelector("#btn-no");

  document.title = q;

  getIp().then((ipData) => {
    ip = ipData;
  });

  function saveAnswer() {
    if (firebase) {
      const db = firebase.firestore();
      db.collection("answers")
        .add({
          id,
          q,
          m,
          yes: yesCounts,
          no: noCounts,
          date: new Date(),
          ip,
        })
        .then(() => {
          saved = true;
        });
    }
  }

  window.onbeforeunload = function () {
    !saved && saveAnswer();
  };

  document.hasFocus() && btnOk.focus();
  const randomEffect = () => {
    const effects = [
      "bounce",
      "flash",
      "pulse",
      "rubberBand",
      "shakeX",
      "shakeY",
      "headShake",
      "swing",
      "tada",
      "wobble",
      "jello",
      "heartBeat",
    ];
    return effects[Math.floor(Math.random() * effects.length)];
  };

  animateCSS(text, randomEffect());
  text.innerHTML = q;
  btnOk.value = yesText;
  btnNo.value = noText;

  const onBtnOkClick = function () {
    yesCounts++;
    text.innerHTML = m;
    text.style["font-size"] = "128px";
    btnNo.style.display = "none";
    btnOk.style.display = "none";
    saveAnswer();
    const loop = async () => {
      animateCSS(text, randomEffect()).then(loop);
    };
    loop();
  };

  const onBtnNoClick = function () {
    const _btnNo = this;
    const _btnOk = btnNo !== _btnNo ? btnNo : btnOk;
    _btnNo.style.position = "fixed";
    clickedCounts++;
    noCounts++;

    if (switchAfter === clickedCounts && all !== "no") {
      const top = _btnNo.getBoundingClientRect().top,
        left = _btnNo.getBoundingClientRect().left;
      _btnNo.style.top = _btnOk.getBoundingClientRect().top + "px";
      _btnNo.style.left = _btnOk.getBoundingClientRect().left + "px";

      _btnOk.style.position = "fixed";
      _btnOk.style.top = top + "px";
      _btnOk.style.left = left + "px";

      clickedCounts = 0;
      switchAfter = Math.floor(Math.random() * 5) + 1;
    } else {
      _btnNo.style.top =
        Math.max(Math.random() * window.innerHeight - _btnNo.clientHeight, 0) +
        "px";
      _btnNo.style.left =
        Math.max(Math.random() * window.innerWidth - _btnNo.clientWidth, 0) +
        "px";
    }
    animateCSS(_btnNo, randomEffect());
  };

  btnOk.addEventListener("click", all === "no" ? onBtnNoClick : onBtnOkClick);
  btnNo.addEventListener("click", all === "ok" ? onBtnOkClick : onBtnNoClick);
};

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
