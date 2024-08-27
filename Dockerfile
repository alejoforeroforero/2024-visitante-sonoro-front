# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 5174

# CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174" ]

FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]