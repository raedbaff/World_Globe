# ----Stage 1: Building the application----
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_MADE_BY
ENV VITE_MADE_BY=$VITE_MADE_BY
RUN npm run build


# ----Stage 2: Serving the application----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]