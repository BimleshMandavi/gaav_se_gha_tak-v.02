import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Package, ShoppingBag, Users, BarChart3, Plus, Edit, Trash2, Download, Eye } from "lucide-react";

export function AdminGuide() {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "View revenue trends, order statistics, and category performance with interactive charts",
      color: "text-blue-600"
    },
    {
      icon: ShoppingBag,
      title: "Order Management",
      description: "Track all orders, update status (pending → processing → shipped → delivered), view detailed order information, and export data",
      color: "text-purple-600"
    },
    {
      icon: Package,
      title: "Product Management",
      description: "Add new products, edit existing items, update prices and descriptions, manage categories, and delete products",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "User Management",
      description: "View all registered users, manage user roles (user/admin), and delete user accounts with their associated orders",
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Add Product", description: "Click 'Add Product' in Products tab" },
    { icon: Eye, label: "View Order Details", description: "Click eye icon in Orders table" },
    { icon: Edit, label: "Update Order Status", description: "Use dropdown in Actions column" },
    { icon: Download, label: "Export Orders", description: "Click 'Export CSV' button" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle>Welcome to Admin Dashboard</CardTitle>
          <CardDescription>
            Comprehensive tools to manage your e-commerce platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 p-4 bg-white rounded-lg shadow-sm">
                <feature.icon className={`w-6 h-6 ${feature.color} flex-shrink-0 mt-1`} />
                <div>
                  <h4 className="text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions Guide</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex items-start gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <action.icon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="text-gray-900 mb-2">Pro Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Monitor pending orders regularly to ensure timely processing</li>
                <li>• Use filters and search to quickly find specific orders or products</li>
                <li>• Export order data for accounting and inventory management</li>
                <li>• Update product information seasonally to reflect availability</li>
                <li>• Check analytics to understand customer preferences and bestsellers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
