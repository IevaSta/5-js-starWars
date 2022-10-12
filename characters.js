let characters = [
    {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        gender: 'male',
    },

    {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        eye_color: 'yellow',
        gender: 'male',
    },

    {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        eye_color: 'brown',
        gender: 'female',
    },

    {
        name: 'Anakin Skywalker',
        height: '188',
        mass: '84',
        eye_color: 'blue',
        gender: 'male',
    },
];

const tableBody = document.getElementById('table');
const keys = Object.keys(characters[0]);

function renderTableData(array) {
    tableBody.innerHTML = ''

    array.map((character) => {
        const rowElement = document.createElement('tr');

        for (let key of keys) {
            const dataCellElement = document.createElement('td');
            dataCellElement.textContent = character[key];
            rowElement.appendChild(dataCellElement);
        }

        tableBody.appendChild(rowElement);
    })

    buildTotalRow();
}

function getAllFirstNames() {
    console.log(characters.map((character) => character.name.split(' ')[0]));
}

const getCharacterPropertySum = (property) =>
    characters.reduce((prev, current) => prev + Number(current[property]), 0);

const getCharacterNamesLengthSum = () => characters.reduce((prev, current) => prev + current.name.length, 0);

function buildTotalRow() {
    const rowElement = document.createElement('tr');

    for (let key of keys) {
        const dataCellElement = document.createElement('td');
        dataCellElement.classList.add('fw-bold');

        if (key === 'name') {
            dataCellElement.textContent = `Simboliu suma ${getCharacterNamesLengthSum()}`
        }

        if (key === 'height' || key === 'mass') {
            dataCellElement.textContent = getCharacterPropertySum(key);
        }

        rowElement.appendChild(dataCellElement);
    }

    tableBody.appendChild(rowElement);
}

const sortByNumber = (property) => renderTableData(characters.sort((a, b) => a[property] - b[property]));
const sortByAlphabet = (property) => renderTableData(characters.sort((a, b) => a[property].localeCompare(b[property])));

const charactersWithGreaterMassThan80 = characters.filter((character) => character.mass > 80);
const charactersWithLessHeightThan180 = characters.filter((character) => character.height < 180);
const charatersMale = characters.filter((character) => character.gender === 'male');
const charatersWithBlueEyes = characters.filter((character) => character.eye_color === 'blue');

getAllFirstNames();
renderTableData(characters);

function addCharacter(character) {
    const nameInput = document.getElementById('name').value;
    const heightInput = document.getElementById('height').value;
    const massInput = document.getElementById('mass').value;
    const eyeColorInput = document.getElementById('eye_color').value;
    const genderInput = document.getElementById('gender').value;

    const newCharacter = {
        name: nameInput,
        height: heightInput,
        mass: massInput,
        eye_color: eyeColorInput,
        gender: genderInput
    }

    characters.push(newCharacter);

    renderTableData(characters);
}


fetch('https://swapi.dev/api/people/').then((response) => {
    response.json().then((data) => {
        characters = data.results;
        renderTableData(characters);
    })
})

