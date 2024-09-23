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

1.  docker build -t backend-image .
2.  docker run --env-file ./backend/.env -d --name backend --network mynw -p 5000:5000 backend-image

3.  docker build -t frontend-image .
4.  docker run -d --name frontend --network mynw -p 80:80 frontend-image

## OR USE DOCKER-COMPOSE:

    1.  Paste this line into the nginx.conf : proxy_pass http://backend:5000;
    2.  docker build -t backend .
    3.  docker build -t frontend .
    4.  docker compose up

## START JENKINS SERVER (Dockerfile in the root directory)

**WARNING!**
This solution is unsafe for production use, as it relies on running as root and sharing the docker.sock. Only for educational purposes.

## Requirements

- Docker

## How to use

Build the image:

```sh
docker build -t custom-jenkins .
```

Run the image:

```sh
docker run -p 8080:8080 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  custom-jenkins
```

## AUTOMATION

    1.  Install the necessary plugins :
        - Docker pipeline
        - Amazon ECR
    2.  Create a 'Pipeline Project'
    3.  Enable GitHub hook trigger for GITScm polling
    4.  Copy the Jenkinsfile into the script.

## PRE-REQUISITES

    1.  Docker
    2.  AWS
    3.

## MERNFLIX (NETFLIX CLONE)

This project is a web application consisting of a React + Vite + TypeScript frontend and an Express.js backend, integrated with a MongoDB database and the TMDB API. The project is Dockerized with Jenkins CI/CD automation and Kubernetes deployment on Minikube.

## Table of Contents

- [Key Technologies](#key-technologies)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
  - [1. Using Docker](#using-docker)
  - [2. Using Minikube](#using-minikube)
- [CI/CD Automation](#cicd-automation)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Key Technologies

- **Frontend**: React, Vite, TypeScript, TailwindCSS, Lucide-react
- **Backend**: Express.js, MongoDB, TMDB API
- **Containerization**: Docker, Docker Compose
- **CI/CD**: Jenkins, GitHub integration
- **Deployment**: AWS ECR, Kubernetes (Minikube)

## Features

- **Frontend**: A responsive web interface built with React, styled with TailwindCSS, and using Lucide-react icons.
- **Backend**: A REST API built with Express.js, connected to MongoDB, and integrated with TMDB for movie data.
- **Docker**: Both frontend and backend are containerized using Docker, with Docker Compose for easy multi-container orchestration.
- **CI/CD Pipeline**: Automated build and deployment triggered by GitHub pull requests using Jenkins.
- **Kubernetes**: The application is deployed in a Minikube environment, with images pulled from AWS ECR.

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development)
- [Jenkins](https://www.jenkins.io/) (for CI/CD pipeline setup)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (for Kubernetes deployment)
- [AWS CLI](https://aws.amazon.com/cli/) (for AWS ECR access)

## Installation

### Using Docker

1. **Create backend container**:

   1. docker build -t backend-image .
   2. docker run --env-file ./backend/.env -d --name backend --network mynw -p 5000:5000 backend-image

2. **Create frontend container**:

   1. modify nginx.conf for **proxy_pass:http://backend:5000** 
   2. docker run -d --name frontend --network mynw -p 80:80 frontend-image
   3. docker build -t frontend-image .

3. **Run containers with docker-compose**

    1. modify nginx.conf for **proxy_pass:http://backend:5000**
    2. 
