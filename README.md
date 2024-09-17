## NETFLIX CLONE APPLICATION

    This application is a Netflix clone that allows users to browse through a vast selection of movies and TV shows. The platform offers content in various categories, making it easy for everyone to find something they enjoy.


    Used packages:
        1.  React-Vite
        2.  Lucide-React
        4.  TailwindCSS
        5.  Express
        6.  Bcryptjs
        7.  Cookie-Parser
        8.  Dotenv
        9.  JsonWebToken
        10. Mongoose

      

## HOW TO RUN THE APPLICATION WITHOUT DOCKER OR JENKINS

    1.  Fill a .env file with your credentials (.envSample)
    2.  
        cd backend
        npm install
        node index.js
    3.
        cd frontend
        npm install
        npm run dev (for running in dev mode)


## RUN THE APPLICATION FROM DOCKER

 1. docker build -t backend-image .
 2. docker run --env-file ./backend/.env -d --name backend  --network mynw -p 5000:5000 backend-image

 3. docker build -t frontend-image .
 4. docker run -d --name frontend  --network mynw -p 80:80 frontend-image



## PRE-REQUISITES


