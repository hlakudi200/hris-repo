FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/hrisApi.Web.Host/hrisApi.Web.Host.csproj", "src/hrisApi.Web.Host/"]
COPY ["src/hrisApi.Web.Core/hrisApi.Web.Core.csproj", "src/hrisApi.Web.Core/"]
COPY ["src/hrisApi.Application/hrisApi.Application.csproj", "src/hrisApi.Application/"]
COPY ["src/hrisApi.Core/hrisApi.Core.csproj", "src/hrisApi.Core/"]
COPY ["src/hrisApi.EntityFrameworkCore/hrisApi.EntityFrameworkCore.csproj", "src/hrisApi.EntityFrameworkCore/"]
WORKDIR "/src/src/hrisApi.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/hrisApi.Web.Host", "src/hrisApi.Web.Host"]
COPY ["src/hrisApi.Web.Core", "src/hrisApi.Web.Core"]
COPY ["src/hrisApi.Application", "src/hrisApi.Application"]
COPY ["src/hrisApi.Core", "src/hrisApi.Core"]
COPY ["src/hrisApi.EntityFrameworkCore", "src/hrisApi.EntityFrameworkCore"]
WORKDIR "/src/src/hrisApi.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "hrisApi.Web.Host.dll"]
