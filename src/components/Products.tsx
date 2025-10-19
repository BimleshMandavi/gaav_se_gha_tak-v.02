import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const productCategories = [
  {
    title: "Fresh Vegetables",
    description: "Farm-fresh vegetables harvested daily",
    image: "https://images.unsplash.com/photo-1635158921967-14be999bc8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGJhc2tldHxlbnwxfHx8fDE3NjA2OTEzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: "50+ Items"
  },
  {
    title: "Organic Grains",
    description: "Traditional varieties of rice, wheat & millets",
    image: "https://images.unsplash.com/photo-1589556165541-4254aa9cfb39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMGZvb2QlMjBncmFpbnN8ZW58MXx8fHwxNzYwNjkxMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: "30+ Items"
  },
  {
    title: "Dairy Products",
    description: "Pure milk, ghee, and traditional dairy items",
    image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGRhaXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYwNjM0NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: "20+ Items"
  },
  {
    title: "Farm Produce",
    description: "Seasonal fruits and organic produce",
    image: "https://images.unsplash.com/photo-1681226298721-88cdb4096e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2MDY5MTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    items: "40+ Items"
  }
];

export function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Our Product Categories
          </h2>
          <p className="text-lg text-gray-600">
            Explore our wide range of fresh, organic products sourced directly from village farmers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {category.items}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-green-600 hover:text-green-700 p-0 h-auto"
                >
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
