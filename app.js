let btn = document.querySelector("button");
async function getCountryInfo() {
  const countryName = document.getElementById("countryInput").value;

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();

    renderCountryInfo(data);
  } catch (error) {
    console.error("Mamlakat ma'lumotlarini olishda xatolik:", error);
  }
}
btn.addEventListener("click", () => {
  getCountryInfo();
});

function renderCountryInfo(countryData) {
  const countryInfoDiv = document.getElementById("countryInfo");
  countryInfoDiv.innerHTML = "";

  if (countryData.length === 0) {
    countryInfoDiv.innerHTML = "<p>Mamlaka topilmadi.</p>";
    return;
  }

  countryData.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className = "countryCard";

    const countryName = country.name.common;
    const countryCapital = country.capital ? country.capital[0] : "Mavjud emas";
    const countryFlag = country.flags.svg;

    countryCard.innerHTML = `
            <h3>${countryName}</h3>
            <img src="${countryFlag}" alt="${countryName} Bayrog'i" style="max-width: 100px; max-height: 60px;">
            <p><strong>Poytaxt:</strong> ${countryCapital}</p>
        `;

    countryInfoDiv.appendChild(countryCard);
  });
}
