import { Product } from "../context/CartContext";

export const products: Product[] = [
  // Vegetables
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 40,
    image: "https://images.unsplash.com/photo-1586640167802-8af12bf651fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMHZlZ2V0YWJsZXMlMjBmcmVzaHxlbnwxfHx8fDE3NjA2OTIxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Vegetables",
    unit: "kg",
    description: "Fresh organic tomatoes from local farms"
  },
  {
    id: "2",
    name: "Fresh Carrots",
    price: 35,
    image: "https://images.unsplash.com/photo-1554223745-ad862492c213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3RzJTIwb3JnYW5pYyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzYwNjkyMTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Vegetables",
    unit: "kg",
    description: "Crunchy organic carrots rich in nutrients"
  },
  {
    id: "3",
    name: "Fresh Potatoes",
    price: 25,
    image: "https://images.unsplash.com/photo-1594885270227-c61f9bc1383d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG9lcyUyMHZlZ2V0YWJsZXMlMjBmcmVzaHxlbnwxfHx8fDE3NjA2OTIxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Vegetables",
    unit: "kg",
    description: "Farm-fresh potatoes perfect for all dishes"
  },
  {
    id: "4",
    name: "Leafy Greens",
    price: 30,
    image: "https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFmeSUyMGdyZWVucyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzYwNjExNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Vegetables",
    unit: "bunch",
    description: "Fresh leafy vegetables packed with vitamins"
  },
  {
    id: "5",
    name: "Mixed Vegetables",
    price: 60,
    image: "https://images.unsplash.com/photo-1635158921967-14be999bc8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMGJhc2tldHxlbnwxfHx8fDE3NjA2OTEzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Vegetables",
    unit: "kg",
    description: "Assorted fresh vegetables bundle"
  },

  // Grains
  {
    id: "6",
    name: "Organic Rice",
    price: 80,
    image: "https://images.unsplash.com/photo-1704916029542-da6fa7bc34e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZ3JhaW5zJTIwYm93bHxlbnwxfHx8fDE3NjA2OTIxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Grains",
    unit: "kg",
    description: "Premium organic rice from local farms"
  },
  {
    id: "7",
    name: "Whole Wheat",
    price: 45,
    image: "https://images.unsplash.com/photo-1654856453392-e59c00596781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWlucyUyMG9yZ2FuaWN8ZW58MXx8fHwxNzYwNjkyMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Grains",
    unit: "kg",
    description: "Stone-ground whole wheat flour"
  },
  {
    id: "8",
    name: "Mixed Lentils",
    price: 90,
    image: "https://images.unsplash.com/photo-1737735633629-f9ed8408a176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW50aWxzJTIwcHVsc2VzJTIwZ3JhaW5zfGVufDF8fHx8MTc2MDY5MjExNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Grains",
    unit: "kg",
    description: "Protein-rich mixed lentils and pulses"
  },
  {
    id: "9",
    name: "Traditional Grains",
    price: 100,
    image: "https://images.unsplash.com/photo-1589556165541-4254aa9cfb39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMGZvb2QlMjBncmFpbnN8ZW58MXx8fHwxNzYwNjkxMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Grains",
    unit: "kg",
    description: "Heritage grains and millets variety pack"
  },

  // Dairy
  {
    id: "10",
    name: "Fresh Dairy Products",
    price: 150,
    image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGRhaXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYwNjM0NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Dairy",
    unit: "pack",
    description: "Pure farm-fresh dairy products bundle"
  },

  // Spices
  {
    id: "11",
    name: "Traditional Spices",
    price: 120,
    image: "https://images.unsplash.com/photo-1653379316270-49c7b3d70110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYwNjcxOTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Spices",
    unit: "pack",
    description: "Authentic Indian spice collection"
  },
  {
    id: "12",
    name: "Farm Fresh Produce",
    price: 85,
    image: "https://images.unsplash.com/photo-1681226298721-88cdb4096e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc2MDY5MTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Farm Produce",
    unit: "kg",
    description: "Seasonal farm-fresh produce selection"
  },
];
