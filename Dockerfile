FROM node:16.15.1-alpine AS builder

WORKDIR /zanger-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.15.1-alpine AS server
WORKDIR /zanger-api
COPY package* ./
RUN npm install --production
COPY --from=builder ./zanger-api/dist ./dist
CMD ["npm", "start"]