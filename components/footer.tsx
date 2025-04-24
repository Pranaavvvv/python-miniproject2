import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block text-2xl font-bold text-white">
              Nebula<span className="text-purple-500">Store</span>
            </Link>
            <p className="mb-6 text-gray-400">
              Premium e-commerce experience with a focus on quality, design, and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:bg-purple-900/20 hover:text-purple-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:bg-purple-900/20 hover:text-purple-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:bg-purple-900/20 hover:text-purple-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:bg-purple-900/20 hover:text-purple-400"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Featured", "Discounted", "All Products"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products?filter=${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 transition-colors hover:text-purple-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-3">
              {["Contact Us", "FAQs", "Shipping & Returns", "Track Order", "Privacy Policy", "Terms & Conditions"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-purple-400" />
                <span className="text-gray-400">
                  123 Commerce St, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-purple-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-purple-400" />
                <span className="text-gray-400">support@nebulastore.com</span>
              </li>
            </ul>
            <h3 className="mb-2 text-lg font-semibold text-white">Business Hours</h3>
            <p className="text-gray-400">
              Monday - Friday: 9AM - 6PM
              <br />
              Saturday: 10AM - 4PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col items-center justify-between pb-8 md:flex-row">
          <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
            © {new Date().getFullYear()} NebulaStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}
