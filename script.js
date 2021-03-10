let yes = false;
let clickedCounts = 0;
let switchAfter = Math.floor(Math.random() * 5) + 1;

window.onload = () => {
  const search = new URLSearchParams(window.location.search);
  const m = search.get("m");
  const s = search.get("ok") || "HIHI";
  const okeText = search.get("bok") || "Có";
  const noText = search.get("bno") || "Không";
  const all = search.get("all");
  const text = document.querySelector("#text");
  const btnOk = document.querySelector("#btn-ok"),
    btnNo = document.querySelector("#btn-no");

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
  text.innerHTML = m;
  btnOk.value = okeText;
  btnNo.value = noText;

  const onBtnOkClick = function () {
    yes = true;
    text.innerHTML = s;
    text.style["font-size"] = "128px";
    btnNo.style.display = "none";
    btnOk.style.display = "none";
    const loop = async () => {
      animateCSS(text, randomEffect()).then(loop);
    };
    loop();
  };

  const onBtnNoClick = function () {
    btnNo.style.position = "fixed";
    clickedCounts++;

    if (switchAfter === clickedCounts) {
      const top = btnNo.getBoundingClientRect().top,
        left = btnNo.getBoundingClientRect().left;

      console.log(top, left);

      btnNo.style.top = btnOk.getBoundingClientRect().top + "px";
      btnNo.style.left = btnOk.getBoundingClientRect().left + "px";

      btnOk.style.position = "fixed";
      btnOk.style.top = top + "px";
      btnOk.style.left = left + "px";

      clickedCounts = 0;
      switchAfter = Math.floor(Math.random() * 5) + 1;
    } else {
      btnNo.style.top =
        Math.max(Math.random() * window.innerHeight - btnNo.clientHeight, 0) +
        "px";
      btnNo.style.left =
        Math.max(Math.random() * window.innerWidth - btnNo.clientWidth, 0) +
        "px";
    }
    animateCSS(btnNo, randomEffect());
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
