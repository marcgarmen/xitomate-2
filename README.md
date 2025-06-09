![Logo](https://github.com/marcgarmen/xitomate-2/assets/96226d2a-a4a7-42e6-80ee-b5de4f05fa69)

# Xitomate

This repository contains the Xitomate application composed of a Next.js frontend and a Quarkus backend.

- **app-xitomate** – frontend built with Next.js.
- **backend-app-xitomate** – backend service built with Quarkus.

See the README files in each directory for setup instructions.


To build the backend using Google Cloud Build, a Dockerfile is provided at the repository root. The build context only includes the backend application.

For running locally:
Clone repositories in 2 different Windows:
prophet:
https://github.com/marcgarmen/xitomate2-prophet
xitomate-2:
https://github.com/marcgarmen/xitomate-2  de prophet

In prophet:
Open terminal
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

In xitomate-2:
Open terminal
cd .\backend-app-xitomate\
./mvnw quarkus:dev

Open another terminal (without closing anything):
cd .\app-xitomate\
npm run dev
