import { Heart, Star, Share, MapPin, Wifi, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

// Mock property data - in a real app this would come from a database
const getPropertyById = (id) => {
  const properties = [
    {
      id: 1,
      image: "/modern-bedroom-with-purple-bedding.png",
      images: [
        "/modern-bedroom-with-purple-bedding.png",
        "/cozy-wooden-house-exterior-at-sunset.png",
        "/rustic-cabin-in-green-field.png",
        "/modern-loft.png",
      ],
      type: "private room",
      beds: "1 bed",
      title: "Private Room in Downtown Manhattan",
      rating: 4.8,
      reviewCount: 127,
      location: "New York, United States",
      price: 55,
      period: "night",
      host: "Sarah Johnson",
      hostImage: "/placeholder.svg?height=40&width=40",
      description:
        "Experience the heart of Manhattan in this beautifully designed private room. Located in a charming brownstone, you'll have access to all the amenities while enjoying the privacy of your own space. Perfect for solo travelers or couples looking to explore the city.",
      amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Air conditioning", "Heating"],
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
    },
    {
      id: 2,
      image: "/cozy-wooden-house-exterior-at-sunset.png",
      images: [
        "/cozy-wooden-house-exterior-at-sunset.png",
        "/modern-bedroom-with-purple-bedding.png",
        "/rustic-cabin-in-green-field.png",
      ],
      type: "entire home",
      beds: "5 beds",
      title: "River Laurie in Main Street Historic District",
      rating: 4.9,
      reviewCount: 89,
      location: "Millergin, Ireland",
      price: 750,
      period: "night",
      host: "Michael O'Connor",
      hostImage: "/placeholder.svg?height=40&width=40",
      description:
        "A stunning riverside home in Ireland's most picturesque village. This historic property offers breathtaking views of the River Laurie and is perfectly situated for exploring the local countryside and traditional Irish culture.",
      amenities: ["Wifi", "Kitchen", "Free parking", "Washer", "Fireplace", "Garden"],
      bedrooms: 5,
      bathrooms: 3,
      guests: 10,
    },
    // Add more properties as needed
  ]

  return properties.find((p) => p.id === Number.parseInt(id))
}

export default function PropertyDetailsPage({ params }) {
  const property = getPropertyById(params.id)

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Link href="/">
            <Button>Back to listings</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="text-2xl font-bold text-purple-600">eygar</div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Property Images */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <div className="lg:col-span-1">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-96 lg:h-full object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images?.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-44 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-current text-gray-900" />
                    <span className="text-lg font-semibold ml-1">{property.rating}</span>
                    <span className="text-gray-600 ml-1">({property.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <span>{property.guests} guests</span>
                  <span>{property.bedrooms} bedrooms</span>
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 mb-6">
                <img
                  src={property.hostImage || "/placeholder.svg"}
                  alt={property.host}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Hosted by {property.host}</h3>
                  <p className="text-sm text-gray-600">Superhost • 3 years hosting</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Wifi className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 shadow-lg border border-gray-200 sticky top-6">
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">${property.price}</span>
                    <span className="text-gray-600 ml-1">/ {property.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-semibold text-gray-900 mb-1">CHECK-IN</div>
                      <div className="text-sm text-gray-600">Add date</div>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-semibold text-gray-900 mb-1">CHECKOUT</div>
                      <div className="text-sm text-gray-600">Add date</div>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-900 mb-1">GUESTS</div>
                    <div className="text-sm text-gray-600">1 guest</div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold">
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-600 mt-3">You won't be charged yet</p>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">${property.price} x 5 nights</span>
                    <span className="text-gray-900">${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$67</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${property.price * 5 + 50 + 67}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
