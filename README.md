# Josh's Kitchen
Launch Academy Breakable Toy Project

This is a kitchen assistant website to help users keep track of their favorite recipes and the ingredients that they own.  This website uses the Spoonacular API to provide a database of recipes for users to search.  
You can view the full website [here](https://joshs-kitchen.herokuapp.com/)

# Installation
To run this website, clone the repository then 
```
  $ yarn install
```
You will have to sign up for API access at [Spoonacular](https://spoonacular.com/food-api) (they have a free version). 
Create a .env file under /server and add your API key as well as a SESSION_SECRET key like this:
```
SESSION_SECRET="make something up"
API_KEY="key goes here"
```
You can then migrate and seed the database by running the following commands in the terminal under /server:
```
$ yarn run migrate:latest
$ yarn run db:seed
```
Run the website on a local server by using the following commant in the terminal under /server:
```
$ yarn run dev
```
# Upcoming Features
I will continue to add features to the website over the coming weeks, including
- Automatically checking if the user has enough ingredients to make each recipe
- Updating the user's ingredient totals after making a recipe by subtracting the amounts used
- Stlying changes and revisions
- Ability to add and edit recipes
- Integrate Documenu API to suggest local restaurants with similar dishes if user doesn't have enough ingredients to make a recipe
