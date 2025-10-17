# Stage 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app

# Copia arquivos de dependências e instala
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia todo o código fonte
COPY . .

# Build Angular para produção
RUN npm run build -- --output-path=dist --configuration=production

# Stage 2: Serve com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copia build final para Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta padrão HTTP
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
