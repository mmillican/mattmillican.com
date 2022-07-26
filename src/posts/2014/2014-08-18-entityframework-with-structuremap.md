---
title: 'Entity Framework with Structuremap'
date: '2014-08-18'
slug: entity-framework-with-structuremap
---

I recently ran into a problem while using Entity Framework with Structuremap.  The issue was mainly present while making concurrent calls to Web API endpoints, because they were all asynchronous.  After a lot of investigation and looking around for various examples (mainly using other IOC containers), I came up with a solution.

My particular app is built to be somewhat modular, so this may be more complex than some need, but hopefully still helpful

##EntityFrameworkRegistry.cs

This is picked up by StructureMap on application startup as another "registry."

``` c#
public class EntityFrameworkRegistry : Registry
{
    public EntityFrameworkRegistry()
    {
        var config = DataAccessConfig.GetConfig();
        var dbConnName = config.Connection.ConnectionStringName;


        For<IDbContext>().Use<MyDataContext()
            .Ctor("nameOrConnectionstring").Is(dbConnName);


        For(typeof(IRepository<>)).Use(typeof(EntityFrameworkRepository<>));
     }
}
```

Basically, I'm getting my connection string (name of the connection string or the actual connection string itself) from the Web.config and injecting that into to the constructor of `MyDataContext`.  This seems to properly create the context so it creates a new instance per request.
