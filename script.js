const card = document.getElementById("card");
const hint = document.getElementById("hint");
const subhint = document.getElementById("subhint");

const frames = Array.from(card.querySelectorAll(".img"));
let step = 0;

/* Musique : démarre au premier clic (Chrome bloque sinon) */
const bgm = document.getElementById("bgm");
let musicStarted = false;

async function startMusic(){
  if (musicStarted || !bgm) return;
  musicStarted = true;

  bgm.loop = true;
  bgm.volume = 0;

  try{
    await bgm.play();

    let v = 0;
    const target = 0.25;
    const stepVol = 0.02;

    const interval = setInterval(() => {
      v = Math.min(target, v + stepVol);
      bgm.volume = v;
      if (v >= target) clearInterval(interval);
    }, 60);

  } catch (e){
    musicStarted = false;
  }
}

function showStep(nextStep){
  step = Math.max(0, Math.min(frames.length - 1, nextStep));

  frames.forEach((el, idx) => {
    el.classList.toggle("is-active", idx === step);
  });

  subhint.textContent = `${step + 1}/${frames.length}`;

  if (step === frames.length - 1){
    hint.textContent = "open ✔";
    hint.style.opacity = "0.65";
    hint.style.letterSpacing = "0.18em";
  } else {
    hint.textContent = "HANNNAHHHHH click on me to open me";
    hint.style.opacity = "0.55";
    hint.style.letterSpacing = "0.22em";
  }
}

function next(){
  const nextStep = (step + 1) % frames.length;
  showStep(nextStep);
}

card.addEventListener("click", (e) => {
  e.preventDefault();
  startMusic();
  next();
});

card.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " "){
    e.preventDefault();
    startMusic();
    next();
  }
});

showStep(0);
