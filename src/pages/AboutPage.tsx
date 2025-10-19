import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Leaf, Heart, Users, Target, Award, TrendingUp } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
              About Gaav Se Ghartak
            </h1>
            <p className="text-xl text-gray-600">
              Connecting Villages to Homes, One Fresh Product at a Time
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded with a vision to bridge the gap between rural farmers and urban consumers, 
                Gaav Se Ghartak has been revolutionizing the way fresh, organic products reach your home.
              </p>
              <p>
                We work directly with village farmers across India, ensuring they get fair prices 
                for their produce while you receive the freshest, most authentic products possible.
              </p>
              <p>
                Every product that reaches your doorstep carries with it the dedication of our farmers, 
                the richness of traditional farming methods, and our commitment to quality and sustainability.
              </p>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhcm1lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDY2MzQxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Happy farmer"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-green-50 p-8 rounded-2xl">
            <Target className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create a sustainable ecosystem where rural farmers thrive and urban families 
              enjoy access to fresh, organic products while preserving traditional farming practices 
              and supporting local agriculture.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl">
            <Award className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become India's most trusted platform for farm-fresh products, empowering 
              thousands of farmers and bringing the authentic taste of village life to every 
              home across the nation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Sustainability</h4>
              <p className="text-gray-600 text-sm">
                Committed to eco-friendly practices and sustainable farming
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Quality First</h4>
              <p className="text-gray-600 text-sm">
                Every product meets our strict quality standards
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Farmer First</h4>
              <p className="text-gray-600 text-sm">
                Fair prices and direct support to our farming partners
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Modern logistics with traditional farming wisdom
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl mb-12 text-center">Our Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">500+</div>
              <div className="text-green-100">Farmers Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">50,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">100+</div>
              <div className="text-green-100">Villages Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">10M+</div>
              <div className="text-green-100">Products Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
