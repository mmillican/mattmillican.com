---
layout: post
title: 'Overriding the Connection String When Running Entity Framework Core Migrations'
date: 2022-02-19
author: 'Matt Millican'
header-img: 'img/blog/macbook-with-smartphone.jpg'
permalink: blog/:slug
---

Entity Framework Core Migrations the preferred way to make database modifications in .NET 6 applications. By default, 
the migrations use the connection string typically defined in your `appsettings.json` or `appsettings.<env>.json` file. 
The configuration system in .NET 6 (fka ".NET Core") is highly flexible and makes it much easier to manage multiple 
environments than the "old" .NET Framework days.

Running database migrations often means changing schema, which in turns means your database user would need some sort of 
`alter schema` privileges (this varies by database platform). At the same time, granting your application's database user 
these types of permissions is not ideal as it opens a potential hole for bad actors to make unwanted changes.

## Configuration

One of the benefits of the [.NET 6 configuration system][asp.net config] is that settings are easily overridable by 
various other sources. Two of my favorites when it comes to automation are command line and environment variables. Let's 
use the following `appsettings.Production.json` file as an example:

```
{
    "ConnectionStrings": {
        "AppConnection": "Host=localhost;Database=mydatabase;Username=app_user;Password=Password123"
    }
}
```

### Override with a command line options

TODO: Provide example

### Override with an environment variable

To override using an environment variable, you would replace each "level" of configuration with a double underscore:

```

ConnectionStrings__AppConnectionString=Host=localhost;Database=mydatabase;Username=app_user;Password=Password123

```
TODO: Other options?? (secrets manager, etc)

## Overriding the connection string during migrations

If you want to run your migrations using a connection string with an "elevated" database user, you could do something 
such as:

```bash

export ASPNETCORE_ENVIRONMENT=Production # this would likely be set previously in your build pipeline

export ConnectionStrings__AppConnectionString=Host=localhost;Database=mydatabase;Username=admin_user;Password=SuperSecurePass

dotnet build

dotnet ef database update

unset ConnectionStrings__AppConnectionString # Clear the environment variable - optional

```

Overriding the connection string (or other settings) at deploy will allow you to restrict the permissions your app's 
database user requires to more appropriate permissions, while giving you the ability to run database migrations as part 
of your deploy pipeline.

[asp.net config]: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-6.0