console.log("Script geladen");

const openaiApiKey = "ENTER HERE YOUR API KEY ";
const model = "text-davinci-003";
const prePrompt =
  "Write a reply to the latest email in a professional tone and end with my name (David). Important, reply in German language!:\n";

async function generateResponse(prompt) {
  console.log(prompt);
  const response = await fetch(
    "https://api.openai.com/v1/engines/" + model + "/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + openaiApiKey,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 300,
        n: 1, // Anzahl der zu generierenden Antworten
        stop: null, // Setzt die Stop-Bedingung für den Prompt
      }),
    }
  );

  const data = await response.json();
  return data.choices[0].text;
}

window.onload = function () {
  window.onhashchange = () => {
    if (window.location.hash.startsWith("#inbox/")) {
      const spans = document.querySelectorAll("span");

      for (const span of spans) {
        if (span.innerText === "Antworten") {
          span.addEventListener("click", function () {
            console.log("Klick");

            // Erstellen des Buttons
            const button = document.createElement("button");
            button.innerText = "Antwort generieren";
            button.style.position = "fixed";
            button.style.right = "20px";
            button.style.bottom = "20px";
            button.style.zIndex = 99;
            button.style.backgroundColor = "white";
            button.style.color = "purple";
            button.style.border = "1px solid purple";
            button.style.cursor = "pointer";
            document.body.appendChild(button);

            // Hinzufügen des Klick-Handlers zum Button
            button.addEventListener("click", async function () {
              const email = document.querySelector(".adn.ads");
              const promptExec = prePrompt + email.textContent;
              const gptResponse = await generateResponse(promptExec);
              const gmailTextbox = document.querySelector("[role=textbox]");
              gmailTextbox.innerText = gptResponse;
            });
          });
        }
      }
    }
  };
};
