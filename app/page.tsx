import { Heart, Search, SlidersHorizontal, Star, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  "All",
  "Beachfront",
  "Cabins",
  "Trending",
  "Tropical",
  "Unique stays",
  "Castles",
  "Countryside",
  "Design",
  "Islands",
  "Lakefront",
]

const properties = [
  {
    id: 1,
    image: "/modern-bedroom-with-purple-bedding.png",
    type: "private room",
    beds: "1 bed",
    title: "Private Room in Do...",
    rating: 4.8,
    location: "New York, United States",
    price: 55,
    period: "night",
  },
  {
    id: 2,
    image: "/cozy-wooden-house-exterior-at-sunset.png",
    type: "entire home",
    beds: "5 beds",
    title: "River Laurie in Main...",
    rating: 4.9,
    location: "Millergin, Ireland",
    price: 750,
    period: "night",
  },
  {
    id: 3,
    image: "/rustic-cabin-in-green-field.png",
    type: "entire place",
    beds: "8 beds",
    title: "Historic and Stunnin...",
    rating: 4.9,
    location: "Edinburgh, Scotland",
    price: 640.44,
    period: "night",
  },
  {
    id: 4,
    image: "/modern-loft.png",
    type: "entire place",
    beds: "2 beds",
    title: "Lux Loft Apartment...",
    rating: 4.7,
    location: "Los Angeles, United States",
    price: 989.78,
    period: "night",
  },
  {
    id: 5,
    image: "/cozy-fireplace-living-room.png",
    type: "entire home",
    beds: "4 beds",
    title: "Historic Georgian La...",
    rating: 4.8,
    location: "Georgian Bay, Canada",
    price: 756.89,
    period: "night",
  },
  {
    id: 6,
    image: "/minimalist-modern-bedroom.png",
    type: "shared room",
    beds: "1 bed",
    title: "Adorable townhous...",
    rating: 4.6,
    location: "Philadelphia, United States",
    price: 550,
    period: "night",
  },
  {
    id: 7,
    image: "/urban-loft-with-city-view.png",
    type: "entire loft",
    beds: "1 bed",
    title: "Chic Urban Loft wit...",
    rating: 4.92,
    location: "New York, United States",
    price: 280,
    period: "night",
  },
  {
    id: 8,
    image: "/modern-dark-kitchen-interior.png",
    type: "entire cabin",
    beds: "3 beds",
    title: "Cozy Mountain Cab...",
    rating: 4.88,
    location: "Banff, Canada",
    price: 195,
    period: "night",
  },
  {
    id: 9,
    image: "/tropical-beachfront-villa.png",
    type: "entire villa",
    beds: "5 beds",
    title: "Serene Beachfront...",
    rating: 4.95,
    location: "Phuket, Thailand",
    price: 450,
    period: "night",
  },
  {
    id: 10,
    image: "/parisian-apartment-interior.png",
    type: "entire apartment",
    beds: "1 bed",
    title: "Historic Parisian Fla...",
    rating: 4.81,
    location: "Paris, France",
    price: 210,
    period: "night",
  },
  {
    id: 11,
    image: "/cozy-studio-apartment.png",
    type: "private studio",
    beds: "1 bed",
    title: "Trendy Shoreditch St...",
    rating: 4.9,
    location: "London, United Kingdom",
    price: 140,
    period: "night",
  },
  {
    id: 12,
    image: "/modern-family-house-kitchen.png",
    type: "entire house",
    beds: "5 beds",
    title: "Spacious Family Ho...",
    rating: 4.85,
    location: "Sydney, Australia",
    price: 320,
    period: "night",
  },
  {
    id: 13,
    image: "/japanese-minimalist-bedroom.png",
    type: "entire apartment",
    beds: "2 beds",
    title: "Minimalist Japanes...",
    rating: 4.94,
    location: "Tokyo, Japan",
    price: 180,
    period: "night",
  },
  {
    id: 14,
    image: "/unique-houseboat-on-water.png",
    type: "entire boat",
    beds: "2 beds",
    title: "Unique Houseboat...",
    rating: 4.89,
    location: "Amsterdam, Netherlands",
    price: 250,
    period: "night",
  },
  {
    id: 15,
    image: "/rustic-brick-house-exterior.png",
    type: "entire cabin",
    beds: "1 bed",
    title: "Stargazing Dome H...",
    rating: 4.98,
    location: "Joshua Tree, United States",
    price: 225,
    period: "night",
  },
  {
    id: 16,
    image: "/moroccan-riad-interior.png",
    type: "private room in riad",
    beds: "1 bed",
    title: "Authentic Riad with...",
    rating: 4.91,
    location: "Marrakech, Morocco",
    price: 95,
    period: "night",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-purple-600">eygar</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Places to stay
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Experiences
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Places by Image
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Become A Host
            </a>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              EN
            </Button>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-6 py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
            <div className="flex items-center divide-x divide-gray-200">
              {/* Search Destinations */}
              <div className="flex-1 px-6 py-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">Search Destinations</div>
                <input
                  type="text"
                  placeholder=""
                  className="w-full text-sm text-gray-600 bg-transparent border-none outline-none"
                />
              </div>

              {/* Check-in */}
              <div className="flex-1 px-6 py-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">Check-in</div>
                <div className="text-sm text-gray-600">Add date</div>
              </div>

              {/* Checkout */}
              <div className="flex-1 px-6 py-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">Checkout</div>
                <div className="text-sm text-gray-600">Add date</div>
              </div>

              {/* Guests */}
              <div className="flex-1 px-6 py-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">Guests</div>
                <div className="text-sm text-gray-600">Add guests</div>
              </div>

              {/* Categories */}
              <div className="flex-1 px-6 py-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">Categories</div>
                <div className="text-sm text-gray-600">Any type</div>
              </div>

              {/* Search Button */}
              <div className="px-2">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="rounded-full bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`whitespace-nowrap pb-3 border-b-2 text-sm font-medium ${
                  index === 0
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="group cursor-pointer border-0 shadow-none">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 text-white hover:text-red-500 p-2"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {property.type} • {property.beds}
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-gray-900" />
                      <span className="text-sm text-gray-900 ml-1">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                  <div className="flex items-baseline">
                    <span className="font-semibold text-gray-900">${property.price}</span>
                    <span className="text-sm text-gray-600 ml-1">/ {property.period}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>© 2024 EYGAR, Inc.</span>
              <a href="#" className="hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900">
                & More
              </a>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Globe className="h-4 w-4 mr-1" />
                English (US)
              </button>
              <button className="text-gray-600 hover:text-gray-900">$ USD</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
