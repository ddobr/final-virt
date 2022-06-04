FROM node:14-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]