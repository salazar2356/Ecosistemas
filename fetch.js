const fetchData = async () => {
    const URL = 'https://rickandmortyapi.com/api/character';
    const query = await fetch(URL);
    const data = await query.json();
   // const localStorage = window.localStorage;
    const charactersContainer = document.getElementById('characters-container');

    charactersContainer.innerHTML = '';

    data.results.forEach((character) => {
        const characterElement = document.createElement('div');
        characterElement.textContent = character.name;
        const button = document.createElement('button');
        button.textContent = "Save";
        button.addEventListener("click", () =>{
            localStorage.setItem(JSON.stringify(character.name), JSON.stringify(character.name));
        })
        characterElement.appendChild(button);
        charactersContainer.appendChild(characterElement);
    });
};

fetchData();
