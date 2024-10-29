FROM node:20.10.0-slim

WORKDIR /app

RUN npm install -g typescript@5.2.2

COPY package*.json ./

RUN apt install bash -y

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x scripts/*


SHELL [ "/bin/bash" ]
RUN ./scripts/build.sh

CMD [ "/bin/bash", "-c", "./scripts/MigrateToLatest.sh" ]
