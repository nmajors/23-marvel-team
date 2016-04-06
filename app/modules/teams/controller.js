/*
  Teams Controller Class
  ----------------------

  1. Create placeholders for name and characters.
     name should be an empty string. It represents the
     data in the input field in your view. characters
     should be an empty array. It's going to hold your
     team. You're going to loop over them to display
     your team.

  2. Fill out addCharacter. It should call the Marvel API
    at: http://gateway.marvel.com:80/v1/public/characters?name=<name here>&apikey=<api key here>

    Name should be from your input field (this.name)

  3. When you get your response from the Marvel API, use
    it to create a new Character. I've provided the class
    already. It wants a name, description and image. Remember,
    we combine the image from two fields in the response.

  4. Add the character you just made to the characters array.

  5. Fill out the deleteCharacter function. It's going to
    receive a character. You want to find that character
    in your characters array and remove it. Look up splice
    on MDN if you don't remember how to do this.
*/

import Character from './Character';

class TeamsController {

  constructor($http) {
    this.name = "";
    this._$http = $http;
    this.characters = [];
    this.addCharacter();
  }

  addCharacter() {
    this._$http
      .get(`http://gateway.marvel.com:80/v1/public/characters?name=${this.name}&apikey=ed7601d2962065f2fc12241cbc32a585`)
      .then((response) => {
        // console.log(response);
        this.name = response.data.data.results[0].name;
        this.description = response.data.data.results[0].description;
        this.image = `${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`

        this.character = new Character(this.name, this.description, this.image);

        this.characters.push(this.character);
        // console.log(this.characters);

        this.name="";
      })
  }

  deleteCharacter(character) {
		let confirmed = confirm(`Are you sure you want to delete ${character.name} from your team?`);
		 if (confirmed) {
	    this.characters.splice(this.characters.indexOf(character), 1);
		}
  }

}

export default TeamsController
