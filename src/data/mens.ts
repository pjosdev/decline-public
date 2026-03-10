import { PRODUCT_ID_PREFIX } from "@/data/constants";
import { ProductType } from "@/data/types";

import armyBootsBottom from "@/assets/products/mens/3-4/m_army-boots_bottom_3-4.webp";
import armyBootsFull from "@/assets/products/mens/3-4/m_army-boots_full_3-4.webp";
import bagFull from "@/assets/products/mens/3-4/m_bag_full_3-4.webp";
import bagTorso from "@/assets/products/mens/3-4/m_bag_torso_3-4.webp";
import beltFull from "@/assets/products/mens/3-4/m_belt_full_3-4.webp";
import beltTorso from "@/assets/products/mens/3-4/m_belt_torso_3-4.webp";
import bootsBottom from "@/assets/products/mens/3-4/m_boots_bottom_3-4.webp";
import bootsFull from "@/assets/products/mens/3-4/m_boots_full_3-4.webp";
import cargoPantsBottoms from "@/assets/products/mens/3-4/m_cargo-pants_bottoms_3-4.webp";
import cargoPantsFull from "@/assets/products/mens/3-4/m_cargo-pants_full_3-4.webp";
import hoodieFull from "@/assets/products/mens/3-4/m_hoodie_full_3-4.webp";
import hoodieSide from "@/assets/products/mens/3-4/m_hoodie_side_3-4.webp";
import hoodieTorso from "@/assets/products/mens/3-4/m_hoodie_torso_3-4.webp";
import jacketFull from "@/assets/products/mens/3-4/m_jacket_full_3-4.webp";
import jacketSide from "@/assets/products/mens/3-4/m_jacket_side_3-4.webp";
import jacketTorso from "@/assets/products/mens/3-4/m_jacket_torso_3-4.webp";
import jeansBottom from "@/assets/products/mens/3-4/m_jeans_bottom_3-4.webp";
import jeansFull from "@/assets/products/mens/3-4/m_jeans_full_3-4.webp";
import leatherJacketFull from "@/assets/products/mens/3-4/m_leather-jacket_full_3-4.webp";
import leatherJacketSide from "@/assets/products/mens/3-4/m_leather-jacket_side_3-4.webp";
import leatherJacketTorso from "@/assets/products/mens/3-4/m_leather-jacket_torso_3-4.webp";
import michiganFull from "@/assets/products/mens/3-4/m_michigan_full_3-4.webp";
import michiganSide from "@/assets/products/mens/3-4/m_michigan_side_3-4.webp";
import michiganTorso from "@/assets/products/mens/3-4/m_michigan_torso_3-4.webp";
import necklaceClose from "@/assets/products/mens/3-4/m_necklace_close_3-4.webp";
import necklaceTorso from "@/assets/products/mens/3-4/m_necklace_torso_3-4.webp";
import puffinFull from "@/assets/products/mens/3-4/m_puffin_full_3-4.webp";
import puffinSide from "@/assets/products/mens/3-4/m_puffin_side_3-4.webp";
import puffinTorso from "@/assets/products/mens/3-4/m_puffin_torso_3-4.webp";
import sneakersBottom from "@/assets/products/mens/3-4/m_sneakers_bottom_3-4.webp";
import sneakersFull from "@/assets/products/mens/3-4/m_sneakers_3-4.webp";
import armyBootsFullCart from "@/assets/products/mens/cart/m_army-boots_full_3-4.webp";
import bagTorsoCart from "@/assets/products/mens/cart/m_bag_torso_3-4.webp";
import beltTorsoCart from "@/assets/products/mens/cart/m_belt_torso_3-4.webp";
import bootsFullCart from "@/assets/products/mens/cart/m_boots_full_3-4.webp";
import cargoPantsFullCart from "@/assets/products/mens/cart/m_cargo-pants_full_3-4.webp";
import hoodieTorsoCart from "@/assets/products/mens/cart/m_hoodie_torso_3-4.webp";
import jacketTorsoCart from "@/assets/products/mens/cart/m_jacket_torso_3-4.webp";
import jeansFullCart from "@/assets/products/mens/cart/m_jeans_full_3-4.webp";
import leatherJacketTorsoCart from "@/assets/products/mens/cart/m_leather-jacket_torso_3-4.webp";
import michiganTorsoCart from "@/assets/products/mens/cart/m_michigan_torso_3-4.webp";
import necklaceTorsoCart from "@/assets/products/mens/cart/m_necklace_torso_3-4.webp";
import puffinTorsoCart from "@/assets/products/mens/cart/m_puffin_torso_3-4.webp";
import sneakersFullCart from "@/assets/products/mens/cart/m_sneakers_3-4.webp";

const MENS_PRODUCTS_BASE: ProductType[] = [
  {
    id: `${PRODUCT_ID_PREFIX}m001`,
    slug: "michigan-wool-blend-coat",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m001_img_001`,
        image: michiganTorso,
        alt: "Michigan wool blend coat - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m001_img_002`,
        image: michiganSide,
        alt: "Michigan wool blend coat - side view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m001_img_003`,
        image: michiganFull,
        alt: "Michigan wool blend coat - full view"
      }
    ],
    name: "Michigan Wool Blend Coat",
    price: 68500,
    description: "Luxurious wool-blend overcoat with architectural silhouette. Crafted from Italian wool with cashmere touch, featuring structured shoulders and concealed button closure. An investment piece for the modern gentleman's wardrobe.",
    availableSizes: ["sm", "md", "lg", "xl"],
    information: [
      "80% Italian wool, 20% cashmere blend",
      "Relaxed oversized fit",
      "Concealed button front closure",
      "Full satin lining",
      "Dual side pockets with welt detailing",
      "Professional dry clean only"
    ],
    reviews: [
      {
        reviewId: "rev_m001_001",
        reviewText: ["Absolutely stunning coat! The quality is exceptional and it fits perfectly. Worth every penny."],
        author: "James Mitchell",
        reviewDate: new Date("2024-11-15"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m001_002",
        reviewText: ["Beautiful craftsmanship, but the sizing runs a bit large. I had to exchange for a smaller size."],
        author: "Michael Chen",
        reviewDate: new Date("2024-10-22"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m001_003",
        reviewText: ["Great coat for winter, very warm and stylish."],
        author: "David Thompson",
        reviewDate: new Date("2024-09-10"),
        rating: 5,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m002`,
    slug: "commander-leather-jacket",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m002_img_001`,
        image: leatherJacketTorso,
        alt: "Commander leather jacket - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m002_img_002`,
        image: leatherJacketSide,
        alt: "Commander leather jacket - side view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m002_img_003`,
        image: leatherJacketFull,
        alt: "Commander leather jacket - full view"
      }
    ],
    name: "Commander Leather Jacket",
    price: 89500,
    description: "Premium full-grain leather jacket with vintage-inspired moto detailing. Handcrafted from ethically sourced leather that develops a unique patina over time. Features asymmetric zip closure and quilted shoulder panels.",
    availableSizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    information: [
      "100% full-grain Italian leather",
      "Regular fit with slight taper",
      "Asymmetric YKK zip closure",
      "Quilted viscose lining",
      "Zippered cuffs and pockets",
      "Professional leather care recommended"
    ],
    reviews: [
      {
        reviewId: "rev_m002_001",
        reviewText: ["This jacket is incredible! The leather quality is top-notch and it's breaking in beautifully."],
        author: "Robert Anderson",
        reviewDate: new Date("2024-12-01"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m002_002",
        reviewText: ["Good jacket but quite heavy. The leather is thick which is great for durability but takes time to soften."],
        author: "William Park",
        reviewDate: new Date("2024-10-15"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m002_003",
        reviewText: ["Returned it. The fit wasn't right for my body type."],
        author: "Thomas Wright",
        reviewDate: new Date("2024-09-20"),
        rating: 2,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m003`,
    slug: "arctic-puffer-jacket",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m003_img_001`,
        image: puffinTorso,
        alt: "Arctic puffer jacket - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m003_img_002`,
        image: puffinSide,
        alt: "Arctic puffer jacket - side view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m003_img_003`,
        image: puffinFull,
        alt: "Arctic puffer jacket - full view"
      }
    ],
    name: "Arctic Down Puffer Jacket",
    price: 59500,
    description: "Technical down-filled puffer jacket engineered for extreme conditions. Water-resistant shell with responsibly sourced down insulation. Features a sculptural oversized silhouette with ribbed knit collar and cuffs.",
    availableSizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    information: [
      "Water-resistant nylon shell",
      "90% down, 10% feather fill (RDS certified)",
      "Oversized boxy fit",
      "Standing ribbed knit collar",
      "Side zip pockets with storm flaps",
      "Machine wash cold, tumble dry low"
    ],
    reviews: [
      {
        reviewId: "rev_m003_001",
        reviewText: ["Amazing warmth! I've worn this in sub-zero temperatures and stayed toasty. Highly recommend."],
        author: "Christopher Lee",
        reviewDate: new Date("2024-11-28"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m003_002",
        reviewText: ["Warm and stylish, but the fit is very oversized. Order a size down if you want a more fitted look."],
        author: "Daniel Kim",
        reviewDate: new Date("2024-10-30"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m003_003",
        reviewText: ["A few feathers came out initially, but stopped after a couple of weeks. Warm jacket overall."],
        author: "Matthew Johnson",
        reviewDate: new Date("2024-09-15"),
        rating: 4,
        verified: false
      },
      {
        reviewId: "rev_m003_004",
        reviewText: ["Too puffy for my taste, returned it."],
        author: "Andrew Davis",
        reviewDate: new Date("2024-08-22"),
        rating: 3,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m004`,
    slug: "urban-technical-jacket",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m004_img_001`,
        image: jacketTorso,
        alt: "Urban technical jacket - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m004_img_002`,
        image: jacketSide,
        alt: "Urban technical jacket - side view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m004_img_003`,
        image: jacketFull,
        alt: "Urban technical jacket - full view"
      }
    ],
    name: "Urban Technical Jacket",
    price: 42500,
    description: "Contemporary technical jacket with minimalist design language. Constructed from water-repellent cotton-nylon blend with hidden seam detailing. Perfect for transitional weather with its lightweight yet protective construction.",
    availableSizes: ["xs", "sm", "md", "lg", "xl"],
    information: [
      "65% cotton, 35% nylon blend",
      "Regular fit with drop shoulders",
      "Water-repellent DWR coating",
      "Hidden snap button closure",
      "Interior phone pocket",
      "Machine wash cold"
    ],
    reviews: [
      {
        reviewId: "rev_m004_001",
        reviewText: ["Perfect jacket for spring and fall. Lightweight but keeps the rain out. Love the minimalist design."],
        author: "Jonathan Miller",
        reviewDate: new Date("2024-11-10"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m004_002",
        reviewText: ["Nice jacket, good quality. The hidden pockets are a nice touch."],
        author: "Ryan Garcia",
        reviewDate: new Date("2024-10-05"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m004_003",
        reviewText: ["The material feels a bit thin for the price point."],
        author: "Kevin Martinez",
        reviewDate: new Date("2024-09-01"),
        rating: 3,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m005`,
    slug: "essential-oversized-hoodie",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m005_img_001`,
        image: hoodieTorso,
        alt: "Essential oversized hoodie - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m005_img_002`,
        image: hoodieSide,
        alt: "Essential oversized hoodie - side view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m005_img_003`,
        image: hoodieFull,
        alt: "Essential oversized hoodie - full view"
      }
    ],
    name: "Essential Oversized Hoodie",
    price: 24500,
    description: "Luxury heavyweight hoodie in premium organic cotton fleece. Designed with an exaggerated oversized silhouette and kangaroo pocket. The brushed interior provides exceptional softness and warmth.",
    availableSizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    information: [
      "100% organic cotton fleece (500gsm)",
      "Oversized relaxed fit",
      "Brushed interior for warmth",
      "Double-layered hood",
      "Ribbed cuffs and hem",
      "Machine wash cold, hang dry"
    ],
    reviews: [
      {
        reviewId: "rev_m005_001",
        reviewText: ["Best hoodie I've ever owned! So thick and cozy. The oversized fit is perfect for lounging."],
        author: "Brandon Taylor",
        reviewDate: new Date("2024-12-05"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m005_002",
        reviewText: ["Amazing quality, super soft inside. Worth the investment."],
        author: "Justin Brown",
        reviewDate: new Date("2024-11-20"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m005_003",
        reviewText: ["Good hoodie but shrank a bit after first wash. Follow the care instructions carefully!"],
        author: "Nicholas Wilson",
        reviewDate: new Date("2024-10-12"),
        rating: 3,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m006`,
    slug: "tactical-cargo-pants",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m006_img_001`,
        image: cargoPantsFull,
        alt: "Tactical cargo pants - full view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m006_img_002`,
        image: cargoPantsBottoms,
        alt: "Tactical cargo pants - bottom view"
      }
    ],
    name: "Tactical Cargo Pants",
    price: 28500,
    description: "Precision-engineered cargo pants with modern utilitarian aesthetics. Crafted from Japanese cotton twill with articulated knee construction. Features multiple cargo pockets with concealed snap closures and adjustable ankle cuffs.",
    availableSizes: ["xs", "sm", "md", "lg", "xl"],
    information: [
      "100% Japanese cotton twill",
      "Relaxed tapered fit",
      "Articulated knee panels",
      "Multiple cargo pockets",
      "Adjustable ankle cuffs",
      "Machine wash cold"
    ],
    reviews: [
      {
        reviewId: "rev_m006_001",
        reviewText: ["These cargo pants are phenomenal. The fit is perfect and the material feels premium. Great attention to detail."],
        author: "Alexander White",
        reviewDate: new Date("2024-11-25"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m006_002",
        reviewText: ["Love the utilitarian look. Pockets are functional and the adjustable cuffs are a great feature."],
        author: "Jacob Moore",
        reviewDate: new Date("2024-10-18"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m006_003",
        reviewText: ["Too baggy for my taste, but quality is good."],
        author: "Ethan Clark",
        reviewDate: new Date("2024-09-28"),
        rating: 3,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m007`,
    slug: "selvedge-tapered-jeans",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m007_img_001`,
        image: jeansFull,
        alt: "Selvedge tapered jeans - full view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m007_img_002`,
        image: jeansBottom,
        alt: "Selvedge tapered jeans - bottom view"
      }
    ],
    name: "Selvedge Tapered Jeans",
    price: 32500,
    description: "Premium selvedge denim jeans with authentic vintage character. Woven on traditional shuttle looms in Okayama, Japan. Features a modern tapered fit with raw finish that ages beautifully with wear.",
    availableSizes: ["xs", "sm", "md", "lg", "xl"],
    information: [
      "14oz Japanese selvedge denim",
      "Modern tapered fit",
      "Button fly closure",
      "Red selvedge ID detail",
      "Raw finish - will fade with wear",
      "Wash sparingly, inside out"
    ],
    reviews: [
      {
        reviewId: "rev_m007_001",
        reviewText: ["Incredible denim quality! You can feel the Japanese craftsmanship. Breaking in nicely."],
        author: "Benjamin Scott",
        reviewDate: new Date("2024-11-30"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m007_002",
        reviewText: ["Great jeans but took a while to soften up. The raw denim is stiff at first."],
        author: "Lucas Adams",
        reviewDate: new Date("2024-10-25"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m007_003",
        reviewText: ["Too expensive for what you get. The fit is good but not amazing."],
        author: "Henry Lewis",
        reviewDate: new Date("2024-09-12"),
        rating: 3,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m008`,
    slug: "utility-leather-belt",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m008_img_001`,
        image: beltTorso,
        alt: "Utility leather belt - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m008_img_002`,
        image: beltFull,
        alt: "Utility leather belt - full view"
      }
    ],
    name: "Utility Leather Belt",
    price: 16500,
    description: "Handcrafted full-grain leather belt with brushed metal buckle. Designed with a substantial 4cm width and clean lines. The vegetable-tanned leather develops a rich patina with each wear.",
    availableSizes: ["sm", "md", "lg", "xl"],
    information: [
      "100% vegetable-tanned full-grain leather",
      "4cm width",
      "Brushed stainless steel buckle",
      "Hand-stitched detailing",
      "Made in Italy",
      "Treat with leather conditioner"
    ],
    reviews: [
      {
        reviewId: "rev_m008_001",
        reviewText: ["Beautiful belt! The leather is thick and the buckle feels substantial. Great Italian craftsmanship."],
        author: "Sebastian Hall",
        reviewDate: new Date("2024-12-03"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m008_002",
        reviewText: ["Good quality belt, worth the price."],
        author: "Jack Young",
        reviewDate: new Date("2024-11-08"),
        rating: 4,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m009`,
    slug: "weekender-canvas-bag",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m009_img_001`,
        image: bagTorso,
        alt: "Weekender canvas bag - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m009_img_002`,
        image: bagFull,
        alt: "Weekender canvas bag - full view"
      }
    ],
    name: "Weekender Canvas Bag",
    price: 38500,
    description: "Spacious weekend bag crafted from heavy-duty waxed canvas with leather trim. Perfect for short trips with its generous interior compartment and multiple pockets. Features adjustable shoulder strap and leather handles.",
    availableSizes: ["md"],
    information: [
      "18oz waxed cotton canvas",
      "Full-grain leather trim",
      "Brass hardware",
      "Interior zip pocket and laptop sleeve",
      "Adjustable shoulder strap",
      "Wipe clean with damp cloth"
    ],
    reviews: [
      {
        reviewId: "rev_m009_001",
        reviewText: ["Perfect weekend bag! The waxed canvas is water-resistant and the leather trim is beautiful. Fits everything I need."],
        author: "Oliver King",
        reviewDate: new Date("2024-11-18"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m009_002",
        reviewText: ["Great bag for short trips. Quality construction and nice details."],
        author: "Leo Wright",
        reviewDate: new Date("2024-10-14"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m009_003",
        reviewText: ["A bit smaller than expected, but good quality."],
        author: "Theo Robinson",
        reviewDate: new Date("2024-09-05"),
        rating: 3,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m010`,
    slug: "signet-chain-necklace",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m010_img_001`,
        image: necklaceTorso,
        alt: "Signet chain necklace - torso view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m010_img_002`,
        image: necklaceClose,
        alt: "Signet chain necklace - close up"
      }
    ],
    name: "Signet Chain Necklace",
    price: 14500,
    description: "Bold sterling silver chain necklace with matte finish. Features substantial link construction with a contemporary signet pendant. A statement piece that elevates any ensemble with understated luxury.",
    availableSizes: ["md"],
    information: [
      "925 sterling silver",
      "55cm chain length",
      "Matte brushed finish",
      "Lobster clasp closure",
      "Polish with silver cloth"
    ],
    reviews: [
      {
        reviewId: "rev_m010_001",
        reviewText: ["Excellent quality necklace! The matte finish is subtle and elegant. Great statement piece."],
        author: "Max Harris",
        reviewDate: new Date("2024-11-22"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m010_002",
        reviewText: ["Nice chain, feels solid. The signet pendant is a good size."],
        author: "Adam Green",
        reviewDate: new Date("2024-10-20"),
        rating: 4,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m011`,
    slug: "combat-leather-boots",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m011_img_001`,
        image: bootsFull,
        alt: "Combat leather boots - full view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m011_img_002`,
        image: bootsBottom,
        alt: "Combat leather boots - bottom view"
      }
    ],
    name: "Combat Leather Boots",
    price: 48500,
    description: "Handcrafted combat boots in premium full-grain leather with commando sole. Features Goodyear welt construction for durability and resoling capability. The padded collar and leather lining ensure all-day comfort.",
    availableSizes: ["sm", "md", "lg", "xl"],
    information: [
      "Full-grain Italian leather upper",
      "Leather lining and insole",
      "Goodyear welt construction",
      "Commando rubber lug sole",
      "Waxed cotton laces",
      "Professional leather care recommended"
    ],
    reviews: [
      {
        reviewId: "rev_m011_001",
        reviewText: ["These boots are incredible! The leather quality is top-tier and they're comfortable right out of the box."],
        author: "Samuel Baker",
        reviewDate: new Date("2024-11-28"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m011_002",
        reviewText: ["Beautiful boots but took a few wears to break in. Now they're perfect."],
        author: "Dylan Nelson",
        reviewDate: new Date("2024-10-30"),
        rating: 4,
        verified: true
      },
      {
        reviewId: "rev_m011_003",
        reviewText: ["Too heavy for my taste, returned them."],
        author: "Carter Hill",
        reviewDate: new Date("2024-09-18"),
        rating: 2,
        verified: false
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m012`,
    slug: "field-army-boots",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m012_img_001`,
        image: armyBootsFull,
        alt: "Field army boots - full view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m012_img_002`,
        image: armyBootsBottom,
        alt: "Field army boots - bottom view"
      }
    ],
    name: "Field Army Boots",
    price: 44500,
    description: "Military-inspired field boots crafted from durable leather with canvas panels. Features speed hook lacing system and cushioned midsole for urban exploration. The rugged construction meets refined aesthetics.",
    availableSizes: ["sm", "md", "lg", "xl"],
    information: [
      "Leather and canvas upper",
      "Padded collar and tongue",
      "Speed hook lacing",
      "Cushioned EVA midsole",
      "Vibram rubber outsole",
      "Treat leather with conditioner"
    ],
    reviews: [
      {
        reviewId: "rev_m012_001",
        reviewText: ["Love the military aesthetic! These boots are rugged yet stylish. The Vibram sole is great for traction."],
        author: "Mason Cooper",
        reviewDate: new Date("2024-11-15"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m012_002",
        reviewText: ["Good boots, comfortable for all-day wear."],
        author: "Logan Reed",
        reviewDate: new Date("2024-10-10"),
        rating: 4,
        verified: true
      }
    ]
  },
  {
    id: `${PRODUCT_ID_PREFIX}m013`,
    slug: "court-premium-sneakers",
    gender: "mens",
    images: [
      {
        id: `${PRODUCT_ID_PREFIX}m013_img_001`,
        image: sneakersFull,
        alt: "Court premium sneakers - full view"
      },
      {
        id: `${PRODUCT_ID_PREFIX}m013_img_002`,
        image: sneakersBottom,
        alt: "Court premium sneakers - bottom view"
      }
    ],
    name: "Court Premium Sneakers",
    price: 29500,
    description: "Elevated court sneakers crafted from premium Italian leather with minimalist design. Features cushioned leather insole and durable rubber cupsole. The clean silhouette pairs effortlessly with both casual and refined looks.",
    availableSizes: ["sm", "md", "lg", "xl"],
    information: [
      "Full-grain Italian leather upper",
      "Leather lining and cushioned insole",
      "Rubber cupsole construction",
      "Waxed cotton laces",
      "Made in Portugal",
      "Clean with leather cleaner"
    ],
    reviews: [
      {
        reviewId: "rev_m013_001",
        reviewText: ["Perfect minimalist sneakers! The leather is buttery soft and they look great with everything."],
        author: "Nathan Cook",
        reviewDate: new Date("2024-12-01"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m013_002",
        reviewText: ["Great quality sneakers, comfortable for daily wear. The leather ages beautifully."],
        author: "Isaac Morgan",
        reviewDate: new Date("2024-11-12"),
        rating: 5,
        verified: true
      },
      {
        reviewId: "rev_m013_003",
        reviewText: ["Good sneakers but a bit pricey."],
        author: "Gabriel Bell",
        reviewDate: new Date("2024-10-08"),
        rating: 4,
        verified: false
      }
    ]
  }
];

const MENS_CART_IMAGE_BY_ID: Record<string, ProductType["cartImage"]> = {
  [`${PRODUCT_ID_PREFIX}m001`]: michiganTorsoCart,
  [`${PRODUCT_ID_PREFIX}m002`]: leatherJacketTorsoCart,
  [`${PRODUCT_ID_PREFIX}m003`]: puffinTorsoCart,
  [`${PRODUCT_ID_PREFIX}m004`]: jacketTorsoCart,
  [`${PRODUCT_ID_PREFIX}m005`]: hoodieTorsoCart,
  [`${PRODUCT_ID_PREFIX}m006`]: cargoPantsFullCart,
  [`${PRODUCT_ID_PREFIX}m007`]: jeansFullCart,
  [`${PRODUCT_ID_PREFIX}m008`]: beltTorsoCart,
  [`${PRODUCT_ID_PREFIX}m009`]: bagTorsoCart,
  [`${PRODUCT_ID_PREFIX}m010`]: necklaceTorsoCart,
  [`${PRODUCT_ID_PREFIX}m011`]: bootsFullCart,
  [`${PRODUCT_ID_PREFIX}m012`]: armyBootsFullCart,
  [`${PRODUCT_ID_PREFIX}m013`]: sneakersFullCart,
};

export const MENS_PRODUCTS: ProductType[] = MENS_PRODUCTS_BASE.map((product) => ({
  ...product,
  cartImage: MENS_CART_IMAGE_BY_ID[product.id] ?? product.images[0]?.image,
}));
