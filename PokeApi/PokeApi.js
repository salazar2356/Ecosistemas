const baseUrl = "https://pokeapi.co/api/v2/";

// Pokemones que quiero
const pokemonNames = ["pikachu", "eevee", "bulbasaur", "charmander", "squirtle"];

// Pintado
const pokemonContainer = document.getElementById("pokemon-container");

// Función para obtener y mostrar la info
function getPokemonInfo(pokemonName) {
  fetch(`${baseUrl}pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(pokemonData => {
      // Obtener información de especies
      fetch(pokemonData.species.url)
        .then(response => response.json())
        .then(speciesData => {
          const evolutionChainUrl = speciesData.evolution_chain.url;
          // Obtener información de la cadena de evolución
          fetch(evolutionChainUrl)
            .then(response => response.json())
            .then(evolutionChainData => {
              // Pintar información de especies y evolución en el mismo div
              const pokemonDiv = document.createElement("div");
              pokemonDiv.classList.add("pokemon");

              const pokemonInfo = `
                <h2>${pokemonData.name.toUpperCase()}</h2>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <h3>Species Information</h3>
                <p>Base Experience: ${speciesData.base_experience}</p>
                <p>Color: ${speciesData.color.name}</p>
                <h3>Evolution Chain</h3>
                <p>Species: ${evolutionChainData.chain.species.name}</p>
                <!-- Agregar más detalles de la cadena de evolución aquí -->
              `;

              pokemonDiv.innerHTML = pokemonInfo;
              pokemonContainer.appendChild(pokemonDiv);
            })
            .catch(error => {
              console.error(`Error en la llamada para evolución de ${pokemonName}:`, error);
            });
        })
        .catch(error => {
          console.error(`Error en la llamada para especies de ${pokemonName}:`, error);
        });
    })
    .catch(error => {
      console.error(`Error en la llamada para ${pokemonName}:`, error);
    });
}

for (const pokemonName of pokemonNames) {
  getPokemonInfo(pokemonName);
}
