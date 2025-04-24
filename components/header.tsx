  "use client"

  import { useState, useEffect } from "react"
  import Link from "next/link"
  import { usePathname } from "next/navigation"
  import { motion, AnimatePresence } from "framer-motion"
  import { Button } from "@/components/ui/button"
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
  import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from "lucide-react"
  import { Input } from "@/components/ui/input"
  import { useCart } from "@/lib/cart-context"
  import { getCategories } from "@/lib/products"
  import { PointsDisplay } from "@/components/loyalty/points-display"

  export default function Header() {
    const pathname = usePathname()
    const { cart } = useCart()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
      setCategories(getCategories())
    }, [])

    // Prevent hydration errors by not rendering until client-side
    if (!mounted) {
      return null
    }

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    return (
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 flex lg:hidden" aria-label="Menu">
                    <Menu className="h-6 w-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-gray-800 bg-gray-900 text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    <Link
                      href="/"
                      className={`rounded-md px-4 py-2 text-lg font-medium ${
                        pathname === "/" ? "bg-purple-900/20 text-purple-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Home
                    </Link>
                    <div className="rounded-md px-4 py-2">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-300">Categories</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="ml-2 mt-2 space-y-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="block rounded-md px-3 py-1.5 text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/products"
                      className={`rounded-md px-4 py-2 text-lg font-medium ${
                        pathname === "/products" ? "bg-purple-900/20 text-purple-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      All Products
                    </Link>
                    <Link
                      href="/loyalty"
                      className={`rounded-md px-4 py-2 text-lg font-medium ${
                        pathname === "/loyalty" ? "bg-purple-900/20 text-purple-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Loyalty
                    </Link>
                    <Link
                      href="/about"
                      className={`rounded-md px-4 py-2 text-lg font-medium ${
                        pathname === "/about" ? "bg-purple-900/20 text-purple-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className={`rounded-md px-4 py-2 text-lg font-medium ${
                        pathname === "/contact" ? "bg-purple-900/20 text-purple-400" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Contact
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="mr-6 text-2xl font-bold text-white">
                Nebula<span className="text-purple-500">Store</span>
              </Link>

              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/"}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/products?category=${category.id}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
                              >
                                <div className="text-sm font-medium leading-none text-white">{category.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-gray-400">{category.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/products" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/products"}>
                        All Products
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/loyalty" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/loyalty"}>
                        Loyalty
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/about"}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/contact"}>
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:bg-gray-800"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Loyalty Points Display */}
              <div className="hidden md:block">
                <PointsDisplay />
              </div>

              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-gray-800 bg-gray-900 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/account/profile" className="flex w-full items-center">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/account/orders" className="flex w-full items-center">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/account/wishlist" className="flex w-full items-center">
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/loyalty" className="flex w-full items-center">
                      Loyalty Points
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
                    <Link href="/account/settings" className="flex w-full items-center">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-gray-800"
                aria-label="Cart"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-800 bg-black/90 py-3 backdrop-blur-md"
            >
              <div className="container mx-auto px-4">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 text-gray-400 hover:text-white"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    )
  }