// Api
const fetchData = async () => {
    const URL = 'https://rickandmortyapi.com/api/character';
    const query = await fetch(URL);
    const data = await query.json();
    const charactersContainer = document.getElementById('characters-container');
//empty array
    charactersContainer.innerHTML = '';
//Map and button in a div
    data.results.forEach((character) => {
      const characterElement = document.createElement('div');
      characterElement.textContent = character.name;
      const button = document.createElement('button');
      button.textContent = "Save";
// Saved in localStorage
      const isSaved = localStorage.getItem(JSON.stringify(character.name));
      if (isSaved) {
        button.classList.add('saved');
      }
      //Funcion
      button.addEventListener("click", () => {
        if (button.classList.contains('saved')) {
          localStorage.removeItem(JSON.stringify(character.name));
        } else {
          localStorage.setItem(JSON.stringify(character.name), JSON.stringify(character.name));
        }
        //Toggle es una clase de JS para Classlits
        //Es decir, si la clase existe, la elimina, y si no existe, la agrega.
        button.classList.toggle('saved');
      });
      
      characterElement.appendChild(button);
      charactersContainer.appendChild(characterElement);
    });
  };
  
  fetchData();
  