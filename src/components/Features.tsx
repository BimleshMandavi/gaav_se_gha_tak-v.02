import { Leaf, Truck, ShieldCheck, Users, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "All products are grown naturally without harmful pesticides or chemicals",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your fresh produce delivered within 24 hours of harvest",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every product is thoroughly checked for quality and freshness",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Users,
    title: "Support Farmers",
    description: "Direct sourcing ensures fair prices for our village farmers",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Heart,
    title: "Traditional Methods",
    description: "Products grown using time-tested traditional farming practices",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Clock,
    title: "Always Fresh",
    description: "Harvest-to-home in record time to preserve maximum freshness",
    color: "bg-teal-100 text-teal-600"
  }
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Why Choose Gaav Se Ghar tak?
          </h2>
          <p className="text-lg text-gray-600">
            We bridge the gap between rural farmers and urban consumers, bringing you the freshest produce while supporting local agriculture
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
