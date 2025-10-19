import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Products } from "../components/Products";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Button } from "../components/ui/button";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

function HeroWithNav({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section id="home" className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <Leaf className="w-4 h-4" />
              <span className="text-sm">100% Organic & Fresh</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900">
              Fresh from the <span className="text-green-600">Village</span> to Your Doorstep
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Experience the authentic taste of rural India. Get farm-fresh vegetables, organic grains, and traditional products delivered directly from villages to your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 gap-2"
                onClick={() => onNavigate("shop")}
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("about")}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <div className="text-sm">
                  <div className="text-gray-900">100%</div>
                  <div className="text-gray-500">Organic</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <div className="text-sm">
                  <div className="text-gray-900">Free</div>
                  <div className="text-gray-500">Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <div className="text-sm">
                  <div className="text-gray-900">Quality</div>
                  <div className="text-gray-500">Assured</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1609252509102-aa73ff792667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwZmFybSUyMGZyZXNofGVufDF8fHx8MTc2MDY5MTM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fresh farm produce"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Daily Delivery</div>
                  <div className="text-gray-900">10,000+ Orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsWithNav({ onNavigate }: { onNavigate: (page: string) => void }) {
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
                  onClick={() => onNavigate("shop")}
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

export function HomePage({ onNavigate }: HomePageProps) {
  const handleNavigate = onNavigate || (() => {});
  
  return (
    <>
      <HeroWithNav onNavigate={handleNavigate} />
      <Features />
      <ProductsWithNav onNavigate={handleNavigate} />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
