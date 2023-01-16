# PhotoShare - front-end 

This is the frontend of a fullstack Photo Sharing web app built with React, Tailwind CSS, Laravel and MySQL.

Check the demo deployed at AWS EC2 (free tier): http://54.179.174.127

The backend APIs used by this frontend and hosted on AWS can be found [here](https://github.com/kiervz/photo-share).

# Technologies used
* Frontend
    - HTML
    - React JS - v18
    - Tailwind CSS
* Backend - API
    - PHP - Laravel Framework v8
* Backend - Database
    - MySQL - v8
* Server
    - Amazon Web Services (AWS)
        - EC2
        - S3
        - RDS

# Features
* Login and Registration.
* Create, Update photos's caption and delete photos.
* Create, update and delete comments.
* Home page feed, browse all photos.
* Filter photos.
* Generate caption using Catfact API: https://catfact.ninja/fact. 
* Upvote and Downvote.

# Screenshots
![Photo Share Home Page](/src/assets/images/PhotoShare.png)

# Installation

First clone this repository.
```bash
$ git clone https://github.com/kiervz/photo-sharer-fe.git
```

Change Directory into this project.
```bash
$ cd ./photo-sharer-fe
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.
```bash
$ npm install # or yarn
```

Create a copy of .env file.
```bash
$ cp .env.example .env
```

Open **.env** file and add your back-end base URL and persist key in order to save the redux store in persistent local storage. 
```bash
$ VITE_APP_BE_BASE_URL="http://127.0.0.1:8000"
$ VITE_APP_PERSIST_KEY="photoshare"
```

Run it
```bash
$ npm run dev # or yarn run dev
```
