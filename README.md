# Dice & Roll 🎲

<br>

# Quick Compo

<br>

## Description

This application is a content generator for the tabletop RPG 'Pathfinder 2'.

It is able to generate complete Player Characters, both with randomized, filtered and/or selected options. In addition, Player Characters may be grouped into Adventuring Parties for further organization.

The goal of this app is to speed up play and manage player characters.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.

<hr>

-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.

<hr>

-  **User Profile Page**: As a logged in user I can visit my profile page so that I can access and see the list of *Adventuring Parties* and *Player Characters* that I have created.

-  **Generate Player Character:** As a logged in user I can access the generate player character page so that I can create a new Player Character.

-  **Save Player Character:** As a logged in user, and a direct follow-up of *Generate Player Character*, I can access the save player character page so that I can create a save a Player Character.

-  **Delete Player Character:** As a logged in user I can access the delete player character page so that I can delete modify an adventuring party details.

<hr>

-  **Add Adventuring Party:** As a logged in user I can access the create adventuring party page so that I can create a new adventuring party.

-  **Edit Adventuring Party:** As a logged in user I can access the edit adventuring party page so that I can create modify an adventuring party details.

-  **Delete Adventuring Party:** As a logged in user I can access the edit adventuring party page so that I can create modify an adventuring party details.

<hr>




## Backlog

- ???


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/character/generate`           | GenerateCharacter | all users | Generate a random player charater.                               |
| `/characterlist`               | CharacterListPage   | user only `<PrivateRoute>` | Player Character list.                                         |
| `/characterlist/:characterId` | CharacterDetailPage | user only `<PrivateRoute>` | Player Character details. |
| `/party/create`           | CreateParty |  user only `<PrivateRoute>` | Create a new party.                               |
| `/partylist`               | PartyListPage   | user only `<PrivateRoute>` | Party list.                                         |
| `/partylist/:partyId` | PartyDetailPage | user only `<PrivateRoute>` | Party details. |




## Components

**Pages:**

- LogIn (Page)

- SignUp (Page)

- Home (Page)

- UserProfile (Page)

- EditProfile (Page)

- GenerateCharacter (Page)

- CollectionList (Page)

- CharacterList (Page)

- CharacterDetails (Page)

- EditCharacter (Page)

- CreateCharacter (Page)

- PartyList (Page)

- PartyDetails (Page)

- EditParty (Page)


**Components:**

- SaveCharacter
- Navbar & Footer


## Services

- **Universal Service**

  - `universalService` :
    - `.rng(min, max)`

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Player Character Service**

  - `characterService` :
    - `.createCharacter(characterData)`
    - `.getCharacters()`
    - `.getOneCharacter(id)`
    - `.deleteCharacter(id)`

- **Adventuring Party Service**

  - `partyService` :
    - `.createParty(partyData)`
    - `.getParty()`
    - `.getOneParty(id)`
    - `.deleteParty(id)`

<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adventuringParties: [ { type: Schema.Types.ObjectId, ref:'AdventuringParty' } ],
  playerCharacters: [ { type: Schema.Types.ObjectId, ref:'PlayerCharacter' } ],
  {   
    timestamps: true
  },
}
```



**AdventuringParty model**

```javascript
 {
   name: { type: String, required: true },
   members: [ { type: Schema.Types.ObjectId, ref:'PlayerCharacter' } ],
  {   
    timestamps: true
  },
}
```



**PlayerCharacter model**

```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String },
  profileImage: { type: String },
  gender: { type: String, default: 'N/A' },
  level: {type: Number, required: true, default: 1}mc
  ancestry: { type: String, required: true},
  background: {type: String, required: true},
  class: {type: String, required: true},
  deity: {type: String, default: 'none'},
  equipment: [{type: Object}],
  {   
    timestamps: true
  },
}
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/characterlist`     |                              |                | 400          | Show all player characters                                         |
| GET         | `/api/character/:id` |                              |                |              | Show specific player character                                     |
| GET        | `/api/generatecharacter`     |       | 201            | 400          | Generate a randomized player character                             |
| POST        | `/api/save-character`     | { firstName, ancestry, background, class }       | 201            | 400          | Generate a randomized player character                             |
| PUT         | `/api/character/:id` | { firstName, ancestry, background, class }       | 200            | 400          | edit specific player character                                              |
| DELETE      | `/api/character/:id` |                              | 201            | 400          | delete specific player character                                            |
| GET         | `/api/partylist`     |                              |                | 400          | Show all adventuring parties                                         |
| GET         | `/api/party/:id` |                              |                |              | Show specific adventuring party character                                     |
| POST        | `/api/createparty`     |       | 201            | 400          | Create and save a new adventuring party                             |                           |
| PUT         | `/api/party/:id` | { firstName, ancestry, background, class }       | 200            | 400          | edit specific adventuring party                                              |
| DELETE      | `/api/party/:id` |                              | 201            | 400          | delete specific adventuring party 



<br>

## API's

[Pathfinder 2 API](https://api.pathfinder2.fr)

<br>

## Packages

[Chakra-UI (for React)](https://www.npmjs.com/package/@chakra-ui/react?activeTab=readme)

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/RFCoelho-gh/dice-roll-app-client)

[Server repository Link](https://github.com/RFCoelho-gh/dice-roll-app-server)

[Deployed App Link](http://heroku.com) - PENDING

### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides - PENDING

### Contributors

Rafael Coelho - [GitHub](https://github.com/RFCoelho-gh) - [LinkedIn](https://www.linkedin.com/in/rafael-fernandes-coelho/)