# ---- Étape 1 : build ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier les csproj et restaurer (cache des couches)
COPY InfraVision.sln ./
COPY InfraVision.Domain/InfraVision.Domain.csproj InfraVision.Domain/
COPY InfraVision.Application/InfraVision.Application.csproj InfraVision.Application/
COPY InfraVision.Infrastructure/InfraVision.Infrastructure.csproj InfraVision.Infrastructure/
COPY InfraVision.Api/InfraVision.Api.csproj InfraVision.Api/
RUN dotnet restore InfraVision.Api/InfraVision.Api.csproj

# Copier le reste et publier
COPY . .
RUN dotnet publish InfraVision.Api/InfraVision.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

# ---- Étape 2 : runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# L'API écoute sur 5163 dans votre code (UseUrls)
EXPOSE 5163
ENTRYPOINT ["dotnet", "InfraVision.Api.dll"]
