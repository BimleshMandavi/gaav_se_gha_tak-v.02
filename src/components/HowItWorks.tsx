import { ShoppingCart, Package, Truck, Home } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    title: "Browse & Order",
    description: "Select fresh products from our wide range of farm-fresh items",
    step: "01"
  },
  {
    icon: Package,
    title: "We Pack Fresh",
    description: "Your order is carefully packed with love and hygiene",
    step: "02"
  },
  {
    icon: Truck,
    title: "Quick Delivery",
    description: "Fast and reliable delivery to your doorstep",
    step: "03"
  },
  {
    icon: Home,
    title: "Enjoy Fresh",
    description: "Enjoy farm-fresh goodness with your family",
    step: "04"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting fresh village products is as easy as 1-2-3-4
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-600"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full mb-4 z-10 shadow-lg">
                    <Icon className="w-10 h-10" />
                    <span className="absolute -top-2 -right-2 bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
