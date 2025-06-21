import { useState } from "react";

const maps = {
  "Kanto": {
    image: "/images/maps/kanto.png", // tá como placeholder arthurzinho
    areas: {
      "Viridian Forest": ["Caterpie", "Weedle", "Pikachu"],
      "Mt. Moon": ["Zubat", "Geodude", "Clefairy"],
    },
  },
  "Johto": {
    image: "/images/maps/johto.png", // mesma coisa, placeholder
    areas: {
      "Ilex Forest": ["Oddish", "Pineco", "Celebi"],
    },
  },
};

export default function Maps() {
  const [selectedGen, setSelectedGen] = useState("Kanto");
  const [selectedArea, setSelectedArea] = useState("");

  const gen = maps[selectedGen];
  const areaList = Object.keys(gen.areas);

  return (
    <div>
      <h2>Mapas das Gerações</h2>

      <label>
        Escolha a geração:{" "}
        <select
          value={selectedGen}
          onChange={(e) => {
            setSelectedGen(e.target.value);
            setSelectedArea("");
          }}
        >
          {Object.keys(maps).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>

      <div>
        <img
          src={gen.image}
          alt={selectedGen}
          style={{ width: "100%", maxWidth: "500px", marginTop: "10px" }}
        />
      </div>

      <h3>Áreas:</h3>
      <ul>
        {areaList.map((area) => (
          <li key={area}>
            <button onClick={() => setSelectedArea(area)}>{area}</button>
          </li>
        ))}
      </ul>

      {selectedArea && (
        <div>
          <h4>Pokémon encontrados em {selectedArea}:</h4>
          <ul>
            {gen.areas[selectedArea].map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
