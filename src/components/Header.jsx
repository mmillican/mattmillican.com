import { useState } from 'preact/hooks';

export default function Header() {
  const [ showMobileNav, setShowMobileNav ] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileNav(!showMobileNav);
  }

  const navItems = [
    { text: 'Blog', href: '/posts' },
    { text: 'Projects', href: '/projects' },
    { text: 'Uses', href: '/uses' },
  ]

  return (
    <header class="py-4 border-b-4 border-secondary">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav class="relative flex justify-between">
          <a href="/" class="text-primary font-semibold text-3xl hover:no-underline">
            Matt Millican
          </a>
          <div class="-mr-2 -my-2 md:hidden">
            <button type="button" onClick={toggleMobileMenu} class="p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-expanded="false">
              <span class="sr-only">Open menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div class="hidden md:flex md:gap-x-6 nav-items">
            {navItems.map((item) => (
              <a href={item.href} class="nav-link">{item.text}</a>
            ))}
          </div>
        </nav>
      </div>

      { showMobileNav &&
        (
        <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top right md:hidden">
          <div class="rounded-lg shadow-lg bg-gray-dark border-2 border-gray-400">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <div>
                  <a href="/" class="text-primary font-semibold text-3xl hover:no-underline">
                    Matt Millican
                  </a>
                </div>
                <div class="-mr-2">
                  <button type="button" onClick={toggleMobileMenu} class="p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="mt-6 px-4 grid gap-y-10">
                {navItems.map((item) => (
                  <a href={item.href} class="-m-3 text-white font-medium visited:text-white">
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        )
      }
    </header>
  )
}

