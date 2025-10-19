import { Button } from "./ui/button";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
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
              <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
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
