---
title: Generating Navigation Based on Routes in Vue 3
subtitle: Using route meta properties to generate navigation items
date: '2023-04-05'
---

While working on a recent project in Vue 3, I needed to control what main navigation items appeared for a user based on
their role(s). I also wanted to use the same role check in a [Navigation Guard][1] to prevent unauthorized users from
accessing pages. Previously, I had been defining the navigation items and routes in two separate places, both defining
the roles allowed to access them separately, which is repetitive and prone to forgotten updates.

## Typing Route Meta Fields

One of my gripes with using route meta properties is that it wasn't typed and you could easily lose track of what should be
included in meta. Luckily, there's a way to [strongly-type route meta][2]! Since the docs explain how to type your meta,
I won't repeat that here, but here's how I defined the interface for my route meta:

```ts
declare module 'vue-router' {
  interface RouteMeta {
    authRequired?: boolean, // Whether or not auth is required to view the page
    showInNav?: boolean; // Whether or not to show in the [main] navigation
    navText?: string; // The text that should show in the navigation
    roles?: RoleKey | RoleKey[]; // The role(s) that are allowed to view the page. Could be strings.
  }
}
```

With this in mind, here's an example of a route record with the above properties:

```ts
{
  path: '/employees',
  component: GenericRouterView,
  meta: { authRequired: true, showInNav: true, navText: 'Employees', roles: [ 'admin', 'owner' ] },
  children: [
    // define children
  ],
},
```

## Navigation Guards

We can also use route meta properties in our navigation guards to control access the actual routes based on the same
allowed roles.

```ts
const handleAuthRequired = async (to: RouteLocationNormalized) => {
  const isAuthd = await isAuthenticated();

  const currentEmployeeStore = useCurrentEmployeeStore(); // A Pinia store
  await currentEmployeeStore.loadCurrentEmployee();

  if (to.meta.authRequired && to.name !== 'login' && !isAuthd) {
    return '/login'
  }

  if (to.meta.roles && !isEmployeeInRole(currentEmployeeStore.currentEmployee, to.meta.roles)) {
    return { name: 'home' }
  }
};

router.beforeEach(handleAuthRequired);
```

## Building the navigation list

To generate the navigation I created a [composable][3] function to generate the navigation based on the current user.

```ts
import { useRouter, type RouteLocationRaw } from 'vue-router'

export const useNavigation = () => {
  const router = useRouter();

  function getMainNavigationItems(user: UserModel | null): NavigationItem[] {
    const navItems = router.getRoutes()
      .filter()
      .filter(route => route.meta.showInNav === true && (!route.meta.roles || isUserInRole(user, route.meta.roles)))
      .map(route => (
        {
          text: route.meta.navText || route.name?.toString() || '',
          destination: route
        }
      ));

    return navItems;
  }

  return {
    getMainNavigationItems,
  };
}
```

There's not much magic going on here, but let's walk through it. First I'm calling `router.getRoutes()` which returns all
the routes defined in the router. Note that this includes all _children_ routes flattened to one level. In my case, I'm
only showing top-level routes in the nav. From there, I'm filtering the routes based on the `showInNav` property being
true, and if there are either no role restrictions or the user is in the defined roles. Once the routes are filtered,
I'm mapping them to a `NavigationItem` type to standardize the structure of the items.

## Implementing the Composable

Now we can implement our composable into our nav component (or App Layout), which is pretty straightforward.

```vue
<template>
  <!-- Redacted for brevity -->
  <RouterLink
    v-for="item in mainNavItems"
    :key="item.text"
    :to="item.destination"
  >
    {{ item.text }}
  </RouterLink>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type NavigationItem, useNavigation } from '@/composables/useNavigation';

const { getMainNavigationItems } = useNavigation();

const mainNavItems = ref<NavigationItem[]>([]);

onMounted(async() => {
  // Get current user from store or API...
  const currentUser = await getCurrentUser();
  mainNavItems.value = getMainNavigationItems(currentUser);
});
</script>
```

In the component, we are calling our composable (`useNavigation`), then calling the `getMainNavigationItems` function
with the current user and setting them to a `ref` which can be used in the template.

This approach may not work the best for large applications or apps with complex navigation structures, but for smaller
apps that require authorization for routes, it seems to work well.

[1]: https://router.vuejs.org/guide/advanced/navigation-guards.html
[2]: https://router.vuejs.org/guide/advanced/meta.html#typescript
[3]: https://vuejs.org/guide/reusability/composables.html
