FROM node:alpine

WORKDIR /app

COPY package.json .
# Don't include dev dependencies
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]