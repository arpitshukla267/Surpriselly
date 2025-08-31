const dummyProducts = [
  { slug: "mens-wallet", title: "Men's Wallet", category: "Fashion & Accessories", shop: "Men", price: 999, image: "https://i.pinimg.com/1200x/f9/80/d9/f980d9fa83a13fed52e352889555c9cb.jpg" },
  { slug: "women-scarf", title: "Women's Scarf", category: "Fashion & Accessories", shop: "Women", price: 799, image: "https://i.pinimg.com/736x/bd/99/60/bd99609bc07e0ca3a3641afd56d04ea3.jpg" },
  { slug: "silver-earrings", title: "Silver Earrings", category: "Fashion & Accessories", shop: "Jewelry", price: 1299, image: "https://i.pinimg.com/736x/76/0d/53/760d532d8d7c1f73caadbad8b7b62a9c.jpg" },
  { slug: "modern-wall-clock", title: "Modern Wall Clock", category: "Home & Decor", shop: "Wall Art", price: 1499, image: "https://i.pinimg.com/736x/e0/3a/02/e03a02c9a56051dcb4a0c55e85fc1fa7.jpg" },
  { slug: "led-lights", title: "LED String Lights", category: "Home & Decor", shop: "Lighting", price: 699, image: "https://i.pinimg.com/1200x/09/87/1d/09871d710d9960f6caba1bb17764f8bd.jpg" },
  { slug: "coffee-table", title: "Wooden Coffee Table", category: "Home & Decor", shop: "Furniture", price: 4999, image: "https://i.pinimg.com/1200x/5f/b6/0a/5fb60ab915d964aeb347db8b74485bff.jpg" },
  { slug: "chocolate-cake", title: "Chocolate Cake", category: "Food & Beverages", shop: "Cakes", price: 599, image: "https://i.pinimg.com/736x/ff/9f/45/ff9f451fc6246cdcdd67313e10c27586.jpg" },
  { slug: "potato-chips", title: "Potato Chips", category: "Food & Beverages", shop: "Snacks", price: 99, image: "https://i.pinimg.com/736x/53/18/d3/5318d33fa7759dfc925aa76290b39737.jpg" },
  { slug: "fruit-juice", title: "Fruit Juice", category: "Food & Beverages", shop: "Drinks", price: 149, image: "https://i.pinimg.com/736x/f7/6e/f9/f76ef9a7d770433a3714a8383a38060e.jpg" },
  { slug: "iphone-15-pro", title: "Iphone 15 Pro", category: "Electronics & Gadgets", shop: "Mobile", price: 934, image: "https://i.pinimg.com/736x/cb/2a/d0/cb2ad0bbc24149758f88797d22b54ab7.jpg" },
  { slug: "asus-vivobook-16", title: "Asus Vivobook 16", category: "Electronics & Gadgets", shop: "Laptop", price: 6999, image: "https://i.pinimg.com/1200x/0f/4a/56/0f4a56f0588a7722a1e992c1d7097ee2.jpg" },
  { slug: "bluetooth-earbuds", title: "Bluetooth Earbuds", category: "Electronics & Gadgets", shop: "Accessories", price: 2999, image: "https://i.pinimg.com/1200x/3b/55/9f/3b559fafd9cf32a9064e5f1104cdf11d.jpg" },
  { slug: "toy-train", title: "Red Toy Train Set for Kids", category: "Toys & Games", shop: "Kids", price: 799, image: "https://i.pinimg.com/1200x/12/d2/4a/12d24ae04a21e8417d4f33d3781f2e1f.jpg" },
  { slug: "puzzle-set", title: "Puzzle Set", category: "Toys & Games", shop: "Educational", price: 499, image: "https://i.pinimg.com/1200x/ea/2f/18/ea2f1862f5a7c1f31dc40a5de1ed5dcf.jpg" },
  { slug: "frisbee", title: "Frisbee", category: "Toys & Games", shop: "Outdoor", price: 199, image: "https://i.pinimg.com/736x/58/fa/31/58fa317d443f520a004acb15b5978598.jpg" },
  { slug: "protein-powder", title: "Protein Powder", category: "Wellness & Selfcare", shop: "Skincare", price: 500, image: "https://i.pinimg.com/1200x/ac/74/17/ac74179f9e137790bf16a957e141daa5.jpg" },
  { slug: "fitness-dumbbells", title: "Fitness Dumbbells", category: "Wellness & Selfcare", shop: "Fitness", price: 999, image: "https://i.pinimg.com/1200x/e5/79/59/e579598ddbcc110af87d7091fdb909c9.jpg" },
  { slug: "aroma-oil", title: "Aroma Oil", category: "Wellness & Selfcare", shop: "Relaxation", price: 499, image: "https://i.pinimg.com/1200x/be/cc/c5/beccc5721d19b94b6cf9181f29c90d5c.jpg" },
  { slug: "custom-mug", title: "Custom Mug", category: "Personalized Gifts", shop: "Custom", price: 299, image: "https://i.pinimg.com/1200x/0b/9d/ea/0b9dea674a5058a82ddd8348c7408caa.jpg" },
  { slug: "engraved-pen", title: "Engraved Pen", category: "Personalized Gifts", shop: "Engraved", price: 399, image: "https://i.pinimg.com/1200x/bd/c0/0a/bdc00adbcae795be94c3e256b84cc4a9.jpg" },
  { slug: "photo-frame", title: "Custom Photo Frame", category: "Personalized Gifts", shop: "Photo Gifts", price: 899, image: "https://i.pinimg.com/736x/0e/f1/ff/0ef1ff548bfc3076d34ff82e2bb6a0b5.jpg" },

  // 🌸 Flowers
  { slug: "rose-bouquet", title: "Rose Bouquet", category: "Flowers", shop: "Bouquets", price: 699, image: "https://i.pinimg.com/736x/2b/ac/5f/2bac5f79e5d7a87a2e4c0a072998ffc7.jpg" },
  { slug: "orchid-basket", title: "Orchid Basket", category: "Flowers", shop: "Baskets", price: 1499, image: "https://i.pinimg.com/736x/9b/d3/77/9bd377738e3a53d32e771d9af4a0e4d4.jpg" },

  // 🌿 Plants
  { slug: "bonsai-plant", title: "Mini Bonsai Plant", category: "Plants", shop: "Indoor", price: 1199, image: "https://i.pinimg.com/736x/04/a9/ee/04a9eeed20a370d5527f755072dac034.jpg" },
  { slug: "succulent-trio", title: "Succulent Trio Set", category: "Plants", shop: "Decorative", price: 799, image: "https://i.pinimg.com/1200x/17/e3/39/17e339779f8ed116d1f91a82de6e6281.jpg" },

  // 🎁 Hampers
  { slug: "chocolate-hamper", title: "Chocolate Gift Hamper", category: "Hampers", shop: "Sweet Treats", price: 1999, image: "https://i.pinimg.com/736x/15/57/ff/1557ffa28a3be78581310d43d1831d0a.jpg" },
  { slug: "wellness-hamper", title: "Wellness Spa Hamper", category: "Hampers", shop: "Luxury", price: 2499, image: "https://i.pinimg.com/1200x/61/11/4a/61114a2be350b29ada6624ab5accaa37.jpg" },

  // 🧶 Handmade
  { slug: "handmade-candle", title: "Handmade Scented Candle", category: "Handmade", shop: "Decor", price: 599, image: "https://i.pinimg.com/736x/65/31/31/6531318bee9242efe0a05417a393b41c.jpg" },
  { slug: "knitted-scarf", title: "Knitted Wool Scarf", category: "Handmade", shop: "Fashion", price: 899, image: "https://i.pinimg.com/1200x/93/1a/a6/931aa6fd2d0c87bbb431a251336c1a74.jpg" },
];

export { dummyProducts };
