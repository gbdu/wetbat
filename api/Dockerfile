from node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

EXPOSE 3030

CMD ["npm", "run", "start"]


