import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { User, Package, MapPin, Phone, Mail, Calendar, Shield } from "lucide-react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, updateProfile, getUserOrders, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2">Not Logged In</h2>
            <p className="text-gray-600 mb-4">Please login to view your profile</p>
            <Button onClick={() => onNavigate("login")} className="bg-green-600 hover:bg-green-700">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userOrders = getUserOrders(user.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-gray-900">My Account</h1>
          <div className="flex gap-2">
            {user.role === "admin" && (
              <Button onClick={() => onNavigate("admin")} variant="outline" className="gap-2">
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Button>
            )}
            <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders ({userOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex gap-2">
                      <User className="w-5 h-5 text-gray-400 mt-2" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2">
                      <Mail className="w-5 h-5 text-gray-400 mt-2" />
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="flex-1 bg-gray-50"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Phone className="w-5 h-5 text-gray-400 mt-2" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex gap-2">
                      <MapPin className="w-5 h-5 text-gray-400 mt-2" />
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {isEditing ? (
                      <>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user.name,
                              phone: user.phone,
                              address: user.address,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  {user.role === "admin" && (
                    <div className="mt-2">
                      <Badge className="bg-purple-600">Admin</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="mb-2 text-gray-900">No Orders Yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                    <Button onClick={() => onNavigate("shop")} className="bg-green-600 hover:bg-green-700">
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-3 pt-3 flex justify-between items-center">
                          <span>Total</span>
                          <span className="text-green-600">₹{order.total}</span>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <p><strong>Delivery Address:</strong></p>
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                          <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
