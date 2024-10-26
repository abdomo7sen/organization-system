

FROM node:18

WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .
RUN npm install


CMD ["npm", "run", "start"]