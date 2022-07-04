FROM node:16.3.0-alpine
WORKDIR /home
COPY . .
RUN npm update -g
RUN npm run dev
EXPOSE 3000
USER node

