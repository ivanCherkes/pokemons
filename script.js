const searchBtn = document.getElementById("search-button");
const input = document.getElementById("search-input");
const container = document.querySelector(".pokemon-info-container");

const hpCell = document.querySelector(".hp td:last-child");
const speedCell = document.querySelector(".speed td:last-child");
const spAttackCell = document.querySelector(".sp-attack td:last-child");
const spDefenseCell = document.querySelector(".sp-defense td:last-child");
const attackCell = document.querySelector(".attack td:last-child");
const defenseCell = document.querySelector(".defense td:last-child");

const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemon = async (nameOrId) => {
    try {
        const url = `${pokemonAPI}${nameOrId.toLowerCase()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Pokemon with name or ID ${nameOrId} not found`);
        }

        const data = await response.json();
        console.log(data);

        const { name, id, weight, height, stats, types, sprites } = data;
        const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
        const spAttack = stats.find(stat => stat.stat.name === 'special-attack').base_stat;
        const spDefense = stats.find(stat => stat.stat.name === 'special-defense').base_stat;
        const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;
        const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;
        const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
        const typeNames = types.map(type => type.type.name);
        const frontSpriteURL = sprites.front_default;

        displayPokemon(name.toUpperCase(), id, weight, height, attack, defense, typeNames, frontSpriteURL, hp, speed, spAttack, spDefense);
    } catch (error) {
        console.error(error);
        alert(`Pokemon not found. Please check the name or ID.`);
    }
}

const displayPokemon = (name, id, weight, height, attack, defence, types, sprite, hp, speed, spAttack, spDefense) => {
    const imgElement = document.createElement('img');
    imgElement.src = sprite;
    imgElement.alt = name;
    imgElement.classList.add('pokemon-image');

    // Create type HTML with appropriate background colors based on type
    let typesHTML = types.map(type => {
        return `<div class="type ${type}"">${type}</div>`;
    }).join('');

    container.innerHTML = `
        <div class="name-and-id">
            <span id="pokemon-name">${name}</span>
            <span id="pokemon-id">${id}</span>
        </div>
        <div class="size">
            <span id="pokemon-weight">Weight: ${weight}</span>
            <span id="pokemon-height">Height: ${height}</span>
        </div>
        <div class="sprite-container">
            ${imgElement.outerHTML}
        </div>
        <div class="types-container">
            ${typesHTML}
        </div>
    `;

    hpCell.textContent = hp;
    speedCell.textContent = speed;
    spAttackCell.textContent = spAttack;
    spDefenseCell.textContent = spDefense;
    attackCell.textContent = attack;
    defenseCell.textContent = defence;
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const pokemonInfo = input.value.trim();
    if (pokemonInfo) {
        fetchPokemon(pokemonInfo);
    } else {
        alert('Please enter a Pokemon name or ID.');
    }
});
