# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o csproj primeiro para cache do restore
COPY ProductManagement.csproj ./
RUN dotnet restore

# Copia todo o código
COPY . .

# Publica em Release
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copia build do stage anterior
COPY --from=build /app/out .

# Porta padrão ASP.NET
EXPOSE 80

# Variáveis de ambiente
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ConnectionStrings__DefaultConnection="Server=db;Database=MyDb;User Id=sa;Password=YourStrong!Passw0rd"

# Comando para iniciar o backend
CMD ["dotnet", "ProductManagement.dll"]
