const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText.toUpperCase();
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        block.style.animation = "correctAnimation 0.5s ease-in-out forwards";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        block.style.animation = "incorrectAnimation 0.5s ease-in-out";
        setTimeout(() => {
          block.style.animation = "";
        }, 500);
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) {
      gameover();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      index -= 1;
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index}']`
      );
      preBlock.innerText = "";
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    if (event.key === "Backspace") {
      handleBackspace();
    } else if (keyCode >= 65 && keyCode <= 90 && index < 5) {
      const thisBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index}']`
      );
      thisBlock.innerText = key;
      index++;
      if (index === 5) {
        handleEnterKey();
      }
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = String(흐른_시간.getMinutes()).padStart(2, "0");
      const 초 = String(흐른_시간.getSeconds()).padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();

  const keyboardKeys = document.querySelectorAll(".keyboard-key");
  keyboardKeys.forEach((key) => {
    key.addEventListener("click", () => {
      const keyPressed = key.innerText.toUpperCase();
      if (index < 5) {
        const thisBlock = document.querySelector(
          `.board-column[data-index='${attempts}${index}']`
        );
        thisBlock.innerText = keyPressed;
        index++;
        if (index === 5) {
          handleEnterKey();
        }
      }
    });
  });

  window.addEventListener("keydown", handleKeydown);
}

appStart();
