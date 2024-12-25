import './style.css';

function loadScript(url, callback) {
  const script = document.createElement("script");
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  const maxFlakes = 50;
  const flakes = [];
  const snowflakeCharacters = ["❅", "❄", "❆", ];

  setInterval(() => {
    if (flakes.length < maxFlakes) {
      createSnowflake();
    }
  }, 300);

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    const randomChar = snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)];
    snowflake.innerHTML = randomChar;

    document.body.appendChild(snowflake);
    flakes.push(snowflake);

    const startPos = Math.random() * window.innerWidth;
    const startOpacity = Math.random();
    const duration = Math.random() * 3 + 5;
    const size = Math.random() * 20 + 10;

    snowflake.style.fontSize = `${size}px`;
    snowflake.style.opacity = startOpacity;
    snowflake.style.position = "fixed";
    snowflake.style.top = "0";
    snowflake.style.left = `${startPos}px`;

    const rotationDirection = Math.random() > 0.5 ? 1 : -1;

    snowflake.animate(
      [{
          transform: `translate(0, 0) rotate(0deg)`
        },
        {
          transform: `translate(0, 100vh) rotate(${rotationDirection * 360}deg)`
        }
      ], {
        duration: duration * 1000,
        easing: "linear",
        iterations: Infinity
      }
    );
  }

  loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js", function () {

  var cat = document.getElementById("cat");
  var shadowBack = document.getElementsByClassName("shadow-2");
  var shadowMed = document.getElementsByClassName("shadow-1");
  var tlc = new TimelineLite();
  var tl = new TimelineLite();

  tlc
    .fromTo(cat, 1, {
      opacity: 1,
      y: 60
    }, {
      opacity: 1,
      y: 0,
      delay: 2,
      ease: Power4.easeOut
    });

  tl
    .fromTo(shadowBack, 2, {
      opacity: 0
    }, {
      opacity: .5,
      repeat: -1,
      yoyo: true,
      delay: .5
    })
    .fromTo(shadowMed, 2, {
      opacity: .25
    }, {
      opacity: .5,
      repeat: -1,
      yoyo: true,
    })


  cat.onmouseover = function (e) {
    tlc.reverse();
  };
  cat.onmouseout = function (e) {
    tlc.play();
  };

  });
});