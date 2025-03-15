FROM node:20

WORKDIR /home/node/app

COPY package.json ./

COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
