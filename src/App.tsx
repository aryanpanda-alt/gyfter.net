import { useState } from "react";
import {
  Gift, Search, Heart, Star, MapPin, Phone, Mail,
  MessageCircle, ChevronRight, Sparkles, ArrowRight, ArrowLeft,
  Clock, Shield, Zap, Menu, X, Instagram, Twitter,
  Check, CreditCard, User, Send, Calendar, IndianRupee,
  Tag, Percent, Globe, TrendingUp, Smartphone, Monitor, Gamepad2, Utensils, Plane
} from "lucide-react";

type Page = "home" | "detail" | "recipient" | "greeting" | "checkout" | "confirmation" | "privacy" | "terms" | "refund";

interface OrderState {
  brand: Brand | null;
  amount: number;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  senderName: string;
  deliveryMethod: "whatsapp" | "email" | "both";
  deliveryDate: string;
  message: string;
  cardDesign: string;
  cardEmoji: string;
  cardGradient: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  category: string;
  validAmounts: number[];
  minAmount: number;
  maxAmount: number;
  brandColor: string;
  discount?: string;
  popular?: boolean;
}

const brandCategories = [
  { name: "Shopping", icon: "🛒", color: "from-orange-400 to-red-500", brands: 6 },
  { name: "Entertainment", icon: "🎬", color: "from-red-500 to-rose-700", brands: 6 },
  { name: "Gaming", icon: "🎮", color: "from-violet-500 to-purple-700", brands: 7 },
  { name: "Food & Dining", icon: "🍕", color: "from-amber-400 to-orange-600", brands: 7 },
  { name: "Travel", icon: "✈️", color: "from-sky-400 to-blue-600", brands: 5 },
  { name: "Fashion", icon: "👗", color: "from-pink-400 to-fuchsia-600", brands: 5 },
  { name: "Tech & Apps", icon: "📱", color: "from-slate-500 to-zinc-700", brands: 3 },
  { name: "Music", icon: "🎵", color: "from-green-400 to-emerald-600", brands: 3 },
  { name: "Lifestyle", icon: "🌿", color: "from-emerald-400 to-teal-600", brands: 5 },
  { name: "Education", icon: "📚", color: "from-blue-400 to-indigo-600", brands: 4 },
];

const brands: Brand[] = [
  { id: "amazon", name: "Amazon", logo: "https://www.google.com/s2/favicons?sz=128&domain=amazon.com", tagline: "The Everything Store", description: "Shop from millions of products — electronics, fashion, books, home essentials, and more. Amazon gift cards can be used across all categories on Amazon.in.", category: "Shopping", validAmounts: [200, 500, 1000, 2000, 5000], minAmount: 100, maxAmount: 10000, brandColor: "#FF9900", popular: true },
  { id: "flipkart", name: "Flipkart", logo: "https://www.google.com/s2/favicons?sz=128&domain=flipkart.com", tagline: "India's Ka Apna Store", description: "India's leading e-commerce marketplace. Use Flipkart gift cards for electronics, fashion, home appliances, and everything in between.", category: "Shopping", validAmounts: [250, 500, 1000, 2000, 5000], minAmount: 100, maxAmount: 10000, brandColor: "#2874F0", popular: true },
  { id: "myntra", name: "Myntra", logo: "https://www.google.com/s2/favicons?sz=128&domain=myntra.com", tagline: "Fashion for Everyone", description: "India's largest fashion e-commerce platform. Shop from 5000+ brands for clothing, footwear, accessories, and beauty.", category: "Fashion", validAmounts: [500, 1000, 2000, 3000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#FF3F6C", popular: true },
  { id: "ajio", name: "Ajio", logo: "https://www.google.com/s2/favicons?sz=128&domain=ajio.com", tagline: "Reliance Fashion Store", description: "Premium and affordable fashion from Reliance. Discover exclusive brands and trending styles at great prices.", category: "Fashion", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#3B3B3B" },
  { id: "nykaa", name: "Nykaa", logo: "https://www.google.com/s2/favicons?sz=128&domain=nykaa.com", tagline: "Beauty & Wellness", description: "India's leading beauty and wellness destination. Over 5 lakh products from 2000+ brands — makeup, skincare, haircare, and more.", category: "Fashion", validAmounts: [250, 500, 1000, 2000, 5000], minAmount: 100, maxAmount: 10000, brandColor: "#F8A5C2", popular: true },
  { id: "meesho", name: "Meesho", logo: "https://www.google.com/s2/favicons?sz=128&domain=meesho.com", tagline: "Lowest Prices, Best Value", description: "India's most affordable online shopping app. Trending fashion, home décor, electronics and daily essentials at wholesale prices.", category: "Shopping", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#570A57" },
  { id: "netflix", name: "Netflix", logo: "https://www.google.com/s2/favicons?sz=128&domain=netflix.com", tagline: "Stories that Move You", description: "Stream unlimited movies, TV shows, and documentaries on any device. Enjoy ad-free entertainment with Netflix gift subscriptions.", category: "Entertainment", validAmounts: [500, 1000, 2000, 3000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#E50914", popular: true },
  { id: "hotstar", name: "Disney+ Hotstar", logo: "https://www.google.com/s2/favicons?sz=128&domain=hotstar.com", tagline: "Disney, Marvel, Star Wars & More", description: "Stream Disney+ originals, Marvel, Star Wars, National Geographic, live sports including IPL and cricket.", category: "Entertainment", validAmounts: [299, 599, 999, 1499], minAmount: 100, maxAmount: 5000, brandColor: "#1F2937" },
  { id: "primevideo", name: "Prime Video", logo: "https://www.google.com/s2/favicons?sz=128&domain=primevideo.com", tagline: "Included with Prime", description: "Thousands of movies, TV shows, and Amazon Originals. Includes content in Hindi, Tamil, Telugu, and more.", category: "Entertainment", validAmounts: [500, 1000, 2000, 3000], minAmount: 200, maxAmount: 5000, brandColor: "#00A8E1" },
  { id: "sonyliv", name: "SonyLIV", logo: "https://www.google.com/s2/favicons?sz=128&domain=sonyliv.com", tagline: "Entertainment ka Dose", description: "Watch SonyLIV originals, live sports, movies, and TV shows. Stream in Hindi, English, and regional languages.", category: "Entertainment", validAmounts: [299, 599, 999], minAmount: 100, maxAmount: 5000, brandColor: "#004B93" },
  { id: "zee5", name: "ZEE5", logo: "https://www.google.com/s2/favicons?sz=128&domain=zee5.com", tagline: "Aaj Ki Zindagi", description: "India's largest homegrown OTT platform with 4500+ films, 200+ TV shows, and 90+ live TV channels.", category: "Entertainment", validAmounts: [299, 599, 999], minAmount: 100, maxAmount: 5000, brandColor: "#8236CB" },
  { id: "jiocinema", name: "JioCinema", logo: "https://www.google.com/s2/favicons?sz=128&domain=jiocinema.com", tagline: "Free Entertainment for All", description: "Stream movies, TV shows, sports, and originals for free. Premium plans available for ad-free viewing.", category: "Entertainment", validAmounts: [299, 599, 999], minAmount: 100, maxAmount: 3000, brandColor: "#0A2463" },
  { id: "googleplay", name: "Google Play", logo: "https://www.google.com/s2/favicons?sz=128&domain=play.google.com", tagline: "Apps, Games & More", description: "Redeem for apps, games, movies, books, and subscriptions on the Google Play Store. Works across Android devices.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 100, maxAmount: 10000, brandColor: "#34A853", popular: true },
  { id: "steam", name: "Steam", logo: "https://www.google.com/s2/favicons?sz=128&domain=steampowered.com", tagline: "Ultimate Gaming Platform", description: "The world's largest PC gaming platform. Buy games, DLCs, in-game items, and software. 50,000+ games available.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#1B2838", popular: true },
  { id: "playstation", name: "PlayStation", logo: "https://www.google.com/s2/favicons?sz=128&domain=playstation.com", tagline: "Play Has No Limits", description: "Redeem for PlayStation Store games, add-ons, subscriptions (PS Plus), and more on PS4 and PS5.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#00439C", popular: true },
  { id: "xbox", name: "Xbox", logo: "https://www.google.com/s2/favicons?sz=128&domain=xbox.com", tagline: "Power Your Dreams", description: "Use for Xbox games, Game Pass subscriptions, add-ons, and entertainment on Xbox consoles and Windows PC.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#107C10" },
  { id: "nintendo", name: "Nintendo", logo: "https://www.google.com/s2/favicons?sz=128&domain=nintendo.com", tagline: "Here We Go!", description: "Redeem for Nintendo eShop games on Nintendo Switch. Access 1000+ titles including Mario, Zelda, and Pokémon.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#E60012" },
  { id: "roblox", name: "Roblox", logo: "https://www.google.com/s2/favicons?sz=128&domain=roblox.com", tagline: "Powering Imagination", description: "Purchase Robux for the Roblox platform. Create, play, and explore millions of immersive experiences.", category: "Gaming", validAmounts: [400, 800, 1500, 3000], minAmount: 200, maxAmount: 10000, brandColor: "#E2231A" },
  { id: "riotgames", name: "Riot Games", logo: "https://www.google.com/s2/favicons?sz=128&domain=riotgames.com", tagline: "League of Legends & Valorant", description: "Riot Points for League of Legends, Valorant Points, and more. The ultimate gift for competitive gamers.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#D32936" },
  { id: "epicgames", name: "Epic Games", logo: "https://www.google.com/s2/favicons?sz=128&domain=epicgames.com", tagline: "Fortnite & Beyond", description: "V-Bucks for Fortnite and credits for the Epic Games Store. Play and gift games from a massive library.", category: "Gaming", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#2A2A2A" },
  { id: "swiggy", name: "Swiggy", logo: "https://www.google.com/s2/favicons?sz=128&domain=swiggy.com", tagline: "Delivering Happiness", description: "Order food from 50,000+ restaurants across 500+ cities in India. Also use on Swiggy Instamart and Swiggy Genie.", category: "Food & Dining", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#FC8019", popular: true },
  { id: "zomato", name: "Zomato", logo: "https://www.google.com/s2/favicons?sz=128&domain=zomato.com", tagline: "Food Delivery & Dining", description: "Order food from top restaurants, book tables, and get dining out deals. Available in 1000+ cities across India.", category: "Food & Dining", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#E23744", popular: true },
  { id: "dominos", name: "Domino's", logo: "https://www.google.com/s2/favicons?sz=128&domain=dominos.co.in", tagline: "Yeh Hai Rishton Ka Time", description: "India's most loved pizza brand. Use gift cards for online ordering, takeaway, or dine-in across 1800+ outlets.", category: "Food & Dining", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#006491" },
  { id: "kfc", name: "KFC", logo: "https://www.google.com/s2/favicons?sz=128&domain=kfc.com", tagline: "Finger Lickin' Good", description: "Enjoy crispy fried chicken, burgers, wraps, and more. KFC gift cards work across 500+ outlets in India.", category: "Food & Dining", validAmounts: [250, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#E4002B" },
  { id: "starbucks", name: "Starbucks", logo: "https://www.google.com/s2/favicons?sz=128&domain=starbucks.com", tagline: "Crafted with Care", description: "Premium coffee, tea, and refreshers. Gift cards work at 390+ Starbucks stores across India.", category: "Food & Dining", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#00704A", popular: true },
  { id: "mcdonalds", name: "McDonald's", logo: "https://www.google.com/s2/favicons?sz=128&domain=mcdonalds.com", tagline: "I'm Lovin' It", description: "The world's favourite fast food. Use gift cards for burgers, fries, McCafé, and more at 400+ outlets in India.", category: "Food & Dining", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#FFC72C" },
  { id: "burgerking", name: "Burger King", logo: "https://www.google.com/s2/favicons?sz=128&domain=burgerking.com", tagline: "Have It Your Way", description: "Flame-grilled burgers, fries, and shakes. BK gift cards valid at all Burger King restaurants across India.", category: "Food & Dining", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#D62300" },
  { id: "makemytrip", name: "MakeMyTrip", logo: "https://www.google.com/s2/favicons?sz=128&domain=makemytrip.com", tagline: "India's #1 Travel Site", description: "Book flights, hotels, holidays, and more. MakeMyTrip gift cards can be used for all travel bookings across India and worldwide.", category: "Travel", validAmounts: [1000, 2000, 5000, 10000], minAmount: 500, maxAmount: 50000, brandColor: "#E4181D", popular: true },
  { id: "uber", name: "Uber", logo: "https://www.google.com/s2/favicons?sz=128&domain=uber.com", tagline: "Move the Way You Want", description: "Ride-hailing and food delivery. Use Uber gift cards for Uber Go, Uber Auto, Uber Premium, and Uber Eats.", category: "Travel", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#000000" },
  { id: "ola", name: "Ola", logo: "https://www.google.com/s2/favicons?sz=128&domain=olacabs.com", tagline: "India's Own Ride", description: "Book auto, cab, bike taxi, and more. Ola gift cards work for rides across 250+ cities in India.", category: "Travel", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#377C18" },
  { id: "goibibo", name: "Goibibo", logo: "https://www.google.com/s2/favicons?sz=128&domain=goibibo.com", tagline: "Travel Made Easy", description: "Book flights, hotels, buses, and cabs at the best prices. Goibibo gift cards are perfect for any travel plan.", category: "Travel", validAmounts: [1000, 2000, 5000], minAmount: 500, maxAmount: 25000, brandColor: "#FF4F4F" },
  { id: "oyo", name: "OYO", logo: "https://www.google.com/s2/favicons?sz=128&domain=oyorooms.com", tagline: "India's Largest Hotel Chain", description: "Affordable hotels across 800+ cities in India. OYO gift cards for comfortable stays at budget-friendly prices.", category: "Travel", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#E31E24" },
  { id: "sephora", name: "Sephora", logo: "https://www.google.com/s2/favicons?sz=128&domain=sephora.com", tagline: "Beauty Unleashed", description: "World's leading beauty retailer. Premium makeup, skincare, fragrance, and haircare from 300+ brands.", category: "Fashion", validAmounts: [1000, 2000, 5000], minAmount: 500, maxAmount: 25000, brandColor: "#000000" },
  { id: "hm", name: "H&M", logo: "https://www.google.com/s2/favicons?sz=128&domain=hm.com", tagline: "Fashion & Quality at Best Price", description: "Global fashion brand with sustainable styles. Shop clothing, accessories, and home products for men, women, and kids.", category: "Fashion", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#CC0000", popular: true },
  { id: "zara", name: "Zara", logo: "https://www.google.com/s2/favicons?sz=128&domain=zara.com", tagline: "Fashion Forward", description: "World-renowned fashion brand known for trendy, fast-fashion clothing and accessories for all ages.", category: "Fashion", validAmounts: [1000, 2000, 5000], minAmount: 500, maxAmount: 25000, brandColor: "#000000" },
  { id: "levis", name: "Levi's", logo: "https://www.google.com/s2/favicons?sz=128&domain=levi.com", tagline: "Quality Never Goes Out of Style", description: "Iconic denim and casual wear brand. Original jeans, jackets, and apparel known worldwide for quality.", category: "Fashion", validAmounts: [1000, 2000, 5000], minAmount: 500, maxAmount: 15000, brandColor: "#D01202" },
  { id: "titan", name: "Titan", logo: "https://www.google.com/s2/favicons?sz=128&domain=titan.co.in", tagline: "India's Watchmaker", description: "India's leading watch and accessories brand. Choose from Titan, Fastrack, Sonata, and more.", category: "Fashion", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 20000, brandColor: "#8B0000" },
  { id: "apple", name: "Apple", logo: "https://www.google.com/s2/favicons?sz=128&domain=apple.com", tagline: "Think Different", description: "Apple Gift Cards for the App Store, iTunes, iCloud, Apple Music, Apple TV+, and accessories at Apple Store.", category: "Tech & Apps", validAmounts: [1000, 2000, 3000, 5000], minAmount: 500, maxAmount: 25000, brandColor: "#555555", popular: true },
  { id: "microsoft", name: "Microsoft", logo: "https://www.google.com/s2/favicons?sz=128&domain=microsoft.com", tagline: "Empower Every Person", description: "Redeem for Microsoft 365, Xbox games, Windows apps, and more. Works across Microsoft products and services.", category: "Tech & Apps", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 15000, brandColor: "#00A4EF" },
  { id: "samsung", name: "Samsung", logo: "https://www.google.com/s2/favicons?sz=128&domain=samsung.com", tagline: "Galaxy of Possibilities", description: "Samsung Shop gift cards for smartphones, TVs, home appliances, and accessories. India's most trusted tech brand.", category: "Tech & Apps", validAmounts: [1000, 2000, 5000, 10000], minAmount: 500, maxAmount: 50000, brandColor: "#1428A0" },
  { id: "spotify", name: "Spotify", logo: "https://www.google.com/s2/favicons?sz=128&domain=spotify.com", tagline: "Music for Everyone", description: "Stream 100 million+ songs and 5 million+ podcasts ad-free. Spotify gift cards for Premium subscriptions worldwide.", category: "Music", validAmounts: [500, 1000, 2000], minAmount: 100, maxAmount: 5000, brandColor: "#1DB954", popular: true },
  { id: "applemusic", name: "Apple Music", logo: "https://www.google.com/s2/favicons?sz=128&domain=apple.com", tagline: "100M+ Songs. Zero Ads.", description: "Stream 100 million songs, spatial audio, and exclusive content. Gift cards work for individual or family plans.", category: "Music", validAmounts: [500, 1000, 2000], minAmount: 200, maxAmount: 10000, brandColor: "#FA2D48" },
  { id: "wynk", name: "Wynk Music", logo: "https://www.google.com/s2/favicons?sz=128&domain=wynk.in", tagline: "Made in India", description: "India's own music streaming app by Airtel. Over 3 million songs in Hindi, English, and regional languages.", category: "Music", validAmounts: [199, 399, 599], minAmount: 100, maxAmount: 2000, brandColor: "#FF5F00" },
  { id: "bigbasket", name: "BigBasket", logo: "https://www.google.com/s2/favicons?sz=128&domain=bigbasket.com", tagline: "India's Largest Grocery Store", description: "Online grocery delivery for fresh produce, staples, household items, and more. Available in 300+ cities.", category: "Lifestyle", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#84C225" },
  { id: "croma", name: "Croma", logo: "https://www.google.com/s2/favicons?sz=128&domain=croma.com", tagline: "We Believe in Quality", description: "India's first omni-channel electronics retailer. Premium electronics, appliances, and gadgets from top brands.", category: "Lifestyle", validAmounts: [1000, 2000, 5000, 10000], minAmount: 500, maxAmount: 50000, brandColor: "#004C8F" },
  { id: "decathlon", name: "Decathlon", logo: "https://www.google.com/s2/favicons?sz=128&domain=decathlon.com", tagline: "Sport for All", description: "The world's largest sports retailer. Equipment for 80+ sports — fitness, cycling, hiking, and team sports.", category: "Lifestyle", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 15000, brandColor: "#0066CC" },
  { id: "cultfit", name: "Cult.fit", logo: "https://www.google.com/s2/favicons?sz=128&domain=cult.fit", tagline: "Make Fitness a Habit", description: "India's leading fitness platform. Gym workouts, yoga, boxing, HRX training, and more at 200+ centres.", category: "Lifestyle", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 10000, brandColor: "#FFE500" },
  { id: "apollo", name: "Apollo Pharmacy", logo: "https://www.google.com/s2/favicons?sz=128&domain=apollopharmacy.in", tagline: "Your Health Partner", description: "India's largest pharmacy chain. Buy medicines, health products, personal care, and wellness items.", category: "Lifestyle", validAmounts: [200, 500, 1000, 2000], minAmount: 100, maxAmount: 10000, brandColor: "#00529B" },
  { id: "coursera", name: "Coursera", logo: "https://www.google.com/s2/favicons?sz=128&domain=coursera.org", tagline: "Learn Without Limits", description: "Access 7,000+ courses from world-class universities and companies. Advance your career with professional certificates.", category: "Education", validAmounts: [1000, 2000, 5000, 10000], minAmount: 500, maxAmount: 50000, brandColor: "#0056D2" },
  { id: "udemy", name: "Udemy", logo: "https://www.google.com/s2/favicons?sz=128&domain=udemy.com", tagline: "Learn Anything", description: "200,000+ courses on every topic imaginable. The world's largest online learning marketplace.", category: "Education", validAmounts: [500, 1000, 2000, 5000], minAmount: 200, maxAmount: 15000, brandColor: "#A435F0" },
  { id: "skillshare", name: "Skillshare", logo: "https://www.google.com/s2/favicons?sz=128&domain=skillshare.com", tagline: "Creativity Starts Here", description: "Thousands of classes in illustration, design, photography, video, freelancing, and more.", category: "Education", validAmounts: [1000, 2000, 5000], minAmount: 500, maxAmount: 10000, brandColor: "#00FF84" },
  { id: "byjus", name: "BYJU'S", logo: "https://www.google.com/s2/favicons?sz=128&domain=byjus.com", tagline: "Fall in Love with Learning", description: "India's largest edtech company. Interactive learning programs for K-12, competitive exams, and skill development.", category: "Education", validAmounts: [1000, 2000, 5000, 10000], minAmount: 500, maxAmount: 50000, brandColor: "#9C27B0" },
];

const greetingCards = [
  { title: "Birthday Bash", desc: "Colorful confetti & cake", gradient: "from-pink-400 via-purple-400 to-indigo-400", emoji: "🎂" },
  { title: "Congratulations", desc: "Celebrate every milestone", gradient: "from-yellow-300 via-amber-400 to-orange-500", emoji: "🎉" },
  { title: "Thank You", desc: "Warm & heartfelt thanks", gradient: "from-emerald-300 via-teal-400 to-cyan-500", emoji: "💝" },
  { title: "Best Wishes", desc: "Send love & good vibes", gradient: "from-rose-300 via-pink-400 to-fuchsia-500", emoji: "🌟" },
  { title: "Just Because", desc: "Random acts of kindness", gradient: "from-violet-400 via-purple-400 to-indigo-500", emoji: "✨" },
  { title: "Festive Cheers", desc: "Celebrate the season", gradient: "from-amber-400 via-orange-500 to-red-500", emoji: "🥂" },
];

const howItWorks = [
  { step: "01", title: "Choose a Brand", desc: "Browse 100+ brands across shopping, entertainment, gaming, food, travel, and more", icon: Globe, color: "brand" },
  { step: "02", title: "Pick Your Amount", desc: "Select from ₹100 to ₹50,000 — choose preset amounts or enter a custom value", icon: IndianRupee, color: "accent" },
  { step: "03", title: "Get Your Voucher", desc: "Receive your brand voucher code instantly via WhatsApp or email. Redeem directly on the brand's website or app", icon: Zap, color: "emerald" },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [order, setOrder] = useState<OrderState>({
    brand: null, amount: 500,
    recipientName: "", recipientPhone: "", recipientEmail: "", senderName: "",
    deliveryMethod: "whatsapp", deliveryDate: "", message: "",
    cardDesign: "Birthday Bash", cardEmoji: "🎂", cardGradient: "from-pink-400 via-purple-400 to-indigo-400",
  });

  const navigate = (p: Page) => { setPage(p); window.scrollTo(0, 0); };
  const selectBrand = (b: Brand) => { setOrder(o => ({ ...o, brand: b, amount: b.validAmounts[0] || 500 })); navigate("detail"); };
  const selectCard = (c: typeof greetingCards[0]) => { setOrder(o => ({ ...o, cardDesign: c.title, cardEmoji: c.emoji, cardGradient: c.gradient })); };

  return (
    <div className="min-h-screen bg-white">
      <Navbar page={page} navigate={navigate} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      {page === "home" && <HomePage selectBrand={selectBrand} navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
      {page === "detail" && order.brand && <DetailPage order={order} setOrder={setOrder} navigate={navigate} />}
      {page === "recipient" && <RecipientPage order={order} setOrder={setOrder} navigate={navigate} />}
      {page === "greeting" && <GreetingPage order={order} setOrder={setOrder} selectCard={selectCard} navigate={navigate} />}
      {page === "checkout" && <CheckoutPage order={order} navigate={navigate} />}
      {page === "confirmation" && <ConfirmationPage order={order} navigate={navigate} />}
      {page === "privacy" && <PrivacyPolicyPage navigate={navigate} />}
      {page === "terms" && <TermsOfServicePage navigate={navigate} />}
      {page === "refund" && <RefundPolicyPage navigate={navigate} />}
      {(page === "home" || page === "privacy" || page === "terms" || page === "refund") && <Footer navigate={navigate} />}
    </div>
  );
}

function Navbar({ page, navigate, mobileMenu, setMobileMenu }: { page: Page; navigate: (p: Page) => void; mobileMenu: boolean; setMobileMenu: (v: boolean) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight">
              Gyfter<span className="text-brand-500">.net</span>
            </span>
          </button>
          {page === "home" && (
            <div className="hidden md:flex items-center gap-8">
              <a href="#brands" className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">All Brands</a>
              <a href="#popular" className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Popular</a>
              <a href="#categories" className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Categories</a>
              <a href="#how" className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">How It Works</a>
              <a href="#greeting" className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">Gift Cards</a>
            </div>
          )}
          <div className="flex items-center gap-3">
            {page !== "home" && (
              <button onClick={() => navigate("home")} className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-fade-in">
          {page === "home" && (
            <>
              <a href="#brands" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenu(false)}>All Brands</a>
              <a href="#popular" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenu(false)}>Popular</a>
              <a href="#categories" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenu(false)}>Categories</a>
              <a href="#how" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenu(false)}>How It Works</a>
            </>
          )}
          <button onClick={() => { navigate("home"); setMobileMenu(false); }} className="w-full text-sm font-semibold text-white bg-brand-500 px-5 py-2.5 rounded-xl">Home</button>
        </div>
      )}
    </nav>
  );
}

function Hero({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (v: string) => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-amber-50" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute top-40 left-1/3 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-float" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-200 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span className="text-xs sm:text-sm font-medium text-brand-700">100+ Brands • Instant Delivery • All Prices in ₹</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up animate-delay-100">
          Buy Brand Vouchers<br />
          <span className="gradient-text">&amp; Gift Cards</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up animate-delay-200">
          Choose from 100+ worldwide brands — Amazon, Netflix, Spotify, Steam, and many more. Buy in INR, deliver instantly.
        </p>
        <div className="max-w-xl mx-auto mb-8 animate-fade-in-up animate-delay-300">
          <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-200 p-2">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search brands — Amazon, Netflix, Steam..." className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder-gray-400 font-medium" />
            <button onClick={() => {
              const el = document.getElementById('brands');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 text-sm">Search</button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 animate-fade-in-up animate-delay-400 flex-wrap">
          {brands.filter(b => b.popular).slice(0, 6).map(b => (
            <img key={b.id} src={b.logo} alt={b.name} className="h-6 sm:h-8 opacity-40 hover:opacity-100 transition-opacity duration-300" loading="lazy" />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in-up animate-delay-400">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500"><Shield className="w-4 h-4 text-emerald-500" /> 100% Genuine</div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500"><Zap className="w-4 h-4 text-amber-500" /> Instant Delivery</div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500"><Globe className="w-4 h-4 text-blue-500" /> 100+ Brands</div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ selectBrand, navigate, searchQuery, setSearchQuery, activeCategory, setActiveCategory }: {
  selectBrand: (b: Brand) => void; navigate: (p: Page) => void;
  searchQuery: string; setSearchQuery: (v: string) => void;
  activeCategory: string; setActiveCategory: (v: string) => void;
}) {
  const filteredBrands = brands.filter(b => {
    const matchesSearch = !searchQuery || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!searchQuery && <BrandCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
      {!searchQuery && <PopularBrands selectBrand={selectBrand} />}
      <AllBrands brands={filteredBrands} selectBrand={selectBrand} activeCategory={activeCategory} searchQuery={searchQuery} />
      <HowItWorks />
      <GreetingCardsSection />
      <DeliverySection />
      <CTASection navigate={navigate} />
      <Footer />
    </>
  );
}

function BrandCategories({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (v: string) => void }) {
  return (
    <section id="categories" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-gray-500 text-lg">Find the perfect gift card for every interest</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory("All")}
            className={"px-5 py-2.5 rounded-full text-sm font-semibold transition-all " + (activeCategory === "All" ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600")}
          >
            All Brands ({brands.length})
          </button>
          {brandCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={"px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 " + (activeCategory === cat.name ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600")}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularBrands({ selectBrand }: { selectBrand: (b: Brand) => void }) {
  const popular = brands.filter(b => b.popular);
  return (
    <section id="popular" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">Most Popular Gift Cards</h2>
            <p className="text-gray-500 text-lg">India's most-loved brand vouchers</p>
          </div>
          <a href="#brands" className="hidden sm:inline-flex items-center gap-1 text-brand-500 font-semibold text-sm hover:text-brand-600 transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popular.map((brand) => (
            <button key={brand.id} onClick={() => selectBrand(brand)}
              className="group flex flex-col items-center p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 hover-lift">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 overflow-hidden bg-gray-50 p-2">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-brand-600 transition-colors text-sm">{brand.name}</span>
              <span className="text-xs text-gray-400 mt-0.5">{brand.tagline}</span>
              {brand.discount && <span className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{brand.discount}</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllBrands({ brands: brandList, selectBrand, activeCategory, searchQuery }: { brands: Brand[]; selectBrand: (b: Brand) => void; activeCategory: string; searchQuery: string }) {
  return (
    <section id="brands" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            {activeCategory === "All" ? "All Brand Gift Cards" : activeCategory}
          </h2>
          <p className="text-gray-500 text-lg">
            {searchQuery ? "Showing results for \"" + searchQuery + "\"" : brandList.length + " gift cards available"}
          </p>
        </div>
        {brandList.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No brands found matching your search.</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {brandList.map((brand) => (
              <button key={brand.id} onClick={() => selectBrand(brand)}
                className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300 text-left w-full">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center p-2">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 group-hover:text-brand-500 transition-colors truncate">{brand.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{brand.tagline}</p>
                  <p className="text-xs text-brand-500 mt-1">{brand.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-gray-500">{brand.validAmounts.map(a => "₹" + a).join(" ")}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-500 text-lg">Buy a brand voucher in 3 simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {howItWorks.map((item) => {
            const Icon = item.icon;
            const colorMap: Record<string, string> = { brand: "bg-brand-100 text-brand-600", accent: "bg-accent-100 text-accent-600", emerald: "bg-emerald-100 text-emerald-600" };
            const colors = colorMap[item.color] || colorMap.brand;
            return (
              <div key={item.step} className="text-center group">
                <div className={"inline-flex items-center justify-center w-16 h-16 rounded-2xl " + colors + " mb-5 transition-transform group-hover:scale-110"}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-gray-300 mb-3 tracking-widest">STEP {item.step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GreetingCardsSection() {
  return (
    <section id="greeting" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Add a Personal Touch</h2>
          <p className="text-gray-500 text-lg">Pair your gift card with a personalised greeting — free with every order</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {greetingCards.map((card) => (
            <div key={card.title} className="group rounded-2xl overflow-hidden hover-lift cursor-pointer">
              <div className={"relative h-48 bg-gradient-to-br " + card.gradient + " flex items-center justify-center"}>
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{card.emoji}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <div className="bg-white p-4 border border-gray-100 border-t-0 rounded-b-2xl">
                <h3 className="font-display font-bold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverySection() {
  return (
    <section className="section-padding bg-white text-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 border border-emerald-200 rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-emerald-100 rounded-full" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Instant Voucher Delivery via<br /><span className="text-emerald-600">WhatsApp &amp; Email</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
          No waiting for shipping. Your brand voucher code arrives in seconds — ready to redeem on the brand's website or app.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-lg mx-auto mb-10">
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-500/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold text-gray-800">WhatsApp</h3><p className="text-sm text-gray-500">Voucher code in their chat</p></div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold text-gray-800">Email</h3><p className="text-sm text-gray-500">Beautiful e-card with code</p></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">Delivered in seconds</span></div>
          <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">100% genuine codes</span></div>
          <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">Free greeting card</span></div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Buy a Brand <span className="gradient-text">Gift Card</span> Today
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          100+ worldwide brands • Prices from ₹100 • Instant digital delivery • Personalise with a greeting card.
        </p>
        <a href="#brands" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-brand-500/25 text-base">
          <Gift className="w-5 h-5" /> Browse Brand Gift Cards
        </a>
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">Gyfter<span className="text-brand-400">.net</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">India's #1 platform for buying brand vouchers &amp; gift cards. 100+ worldwide brands, prices in INR, instant digital delivery.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-500 flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-500 flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-500 flex items-center justify-center transition-colors"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>
          {[
            { title: "Popular Brands", links: [{ label: "Amazon" }, { label: "Netflix" }, { label: "Spotify" }, { label: "Steam" }, { label: "Google Play" }, { label: "Apple" }, { label: "Flipkart" }, { label: "Swiggy" }] },
            { title: "Categories", links: [{ label: "Shopping" }, { label: "Entertainment" }, { label: "Gaming" }, { label: "Food & Dining" }, { label: "Travel" }, { label: "Fashion" }, { label: "Tech & Apps" }, { label: "Music" }] },
            { title: "Support", links: [{ label: "How It Works" }, { label: "FAQ" }, { label: "Contact Us" }, { label: "Privacy Policy", page: "privacy" as Page }, { label: "Terms of Service", page: "terms" as Page }, { label: "Refund Policy", page: "refund" as Page }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.page ? (
                      <button onClick={() => navigate(l.page)} className="text-sm hover:text-brand-400 transition-colors text-left">{l.label}</button>
                    ) : (
                      <a href="#" className="text-sm hover:text-brand-400 transition-colors">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Gyfter.net — All rights reserved. Made with ❤️ in India</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-xs text-gray-500"><Shield className="w-3.5 h-3.5 text-emerald-500" /> SSL Encrypted</span>
            <span className="flex items-center gap-1 text-xs text-gray-500"><Phone className="w-3.5 h-3.5" /> 24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DetailPage({ order, setOrder, navigate }: { order: OrderState; setOrder: React.Dispatch<React.SetStateAction<OrderState>>; navigate: (p: Page) => void }) {
  const b = order.brand!;
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("home")} className="hover:text-brand-500">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">{b.name}</span>
        </div>
        <div className="relative rounded-3xl overflow-hidden mb-8 p-8 sm:p-12" style={{ backgroundColor: b.brandColor }}>
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-2xl p-3 sm:p-4 shadow-xl">
              <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-center sm:text-left text-white">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{b.category}</span>
                {b.popular && <span className="text-xs font-bold bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Popular</span>}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-1">{b.name}</h1>
              <p className="text-white/80 text-lg">{b.tagline}</p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold mb-2">About This Gift Card</h2>
              <p className="text-gray-600 leading-relaxed">{b.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs font-medium bg-brand-50 text-brand-600 px-3 py-1 rounded-full">{b.category}</span>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Digital Delivery</span>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">No Expiry</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "100% Genuine", color: "text-emerald-600 bg-emerald-50" },
                { icon: Zap, label: "Instant Delivery", color: "text-amber-600 bg-amber-50" },
                { icon: Heart, label: "Free E-Card", color: "text-red-500 bg-red-50" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <badge.icon className={"w-6 h-6 " + badge.color.split(" ")[0] + " mb-2"} />
                  <span className="text-xs font-semibold text-gray-700">{badge.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-bold text-gray-800 mb-4">How to Redeem</h3>
              <div className="space-y-3">
                {[
                  "You'll receive a unique voucher code via WhatsApp or email",
                  "Visit " + b.name + "'s website or app",
                  "Enter the voucher code at checkout or in your wallet"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-24">
              <h3 className="font-display text-lg font-bold mb-1">Gift Card Amount</h3>
              <p className="text-sm text-gray-400 mb-5">Choose how much to load (₹{b.minAmount} – ₹{b.maxAmount.toLocaleString("en-IN")})</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {b.validAmounts.map((a) => (
                  <button key={a} onClick={() => setOrder(o => ({ ...o, amount: a }))}
                    className={"py-3 rounded-xl text-sm font-bold border-2 transition-all " + (order.amount === a ? "border-brand-500 bg-brand-50 text-brand-600" : "border-gray-200 text-gray-600 hover:border-brand-300")}>
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Or enter custom amount</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" min={b.minAmount} max={b.maxAmount} value={order.amount}
                    onChange={(e) => setOrder(o => ({ ...o, amount: Math.max(b.minAmount, Math.min(b.maxAmount, Number(e.target.value) || 0)) }))}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-bold focus:border-brand-500 focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-5">
                <span className="text-sm text-gray-500">Gift Card Value</span>
                <span className="text-xl font-bold text-gray-900">₹{order.amount.toLocaleString("en-IN")}</span>
              </div>
              <button onClick={() => navigate("recipient")}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 text-base flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipientPage({ order, setOrder, navigate }: { order: OrderState; setOrder: React.Dispatch<React.SetStateAction<OrderState>>; navigate: (p: Page) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const b = order.brand!;
  const validate = () => {
    const e: Record<string, string> = {};
    if (!order.recipientName.trim()) e.recipientName = "Recipient name is required";
    if (order.deliveryMethod !== "email" && !order.recipientPhone.trim()) e.recipientPhone = "Phone number is required";
    if (order.recipientPhone && !/^[6-9]\d{9}$/.test(order.recipientPhone.replace(/\s/g, ""))) e.recipientPhone = "Enter a valid 10-digit Indian number";
    if (order.deliveryMethod !== "whatsapp" && !order.recipientEmail.trim()) e.recipientEmail = "Email is required";
    if (order.recipientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.recipientEmail)) e.recipientEmail = "Enter a valid email";
    if (!order.senderName.trim()) e.senderName = "Your name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleNext = () => { if (validate()) navigate("greeting"); };
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-8">
          {["Amount", "Recipient", "Greeting", "Pay"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (i <= 1 ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-500")}>
                {i <= 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={"text-xs font-medium hidden sm:inline " + (i <= 1 ? "text-brand-600" : "text-gray-400")}>{step}</span>
              {i < 3 && <div className={"flex-1 h-0.5 " + (i < 1 ? "bg-brand-500" : "bg-gray-200")} />}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center"><User className="w-6 h-6 text-brand-500" /></div>
            <div><h1 className="font-display text-2xl font-bold">Who is this for?</h1><p className="text-sm text-gray-400">We'll deliver the gift card to them</p></div>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Recipient's Name *</label>
              <input type="text" value={order.recipientName} onChange={(e) => setOrder(o => ({ ...o, recipientName: e.target.value }))}
                className={"w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors " + (errors.recipientName ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-brand-500")}
                placeholder="e.g., Priya Sharma" />
              {errors.recipientName && <p className="text-xs text-red-500 mt-1">{errors.recipientName}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Delivery Method *</label>
              <div className="grid grid-cols-3 gap-3">
                {(["whatsapp", "email", "both"] as const).map((m) => (
                  <button key={m} onClick={() => setOrder(o => ({ ...o, deliveryMethod: m }))}
                    className={"py-3 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-1.5 " + (order.deliveryMethod === m ? "border-brand-500 bg-brand-50 text-brand-600" : "border-gray-200 text-gray-500 hover:border-brand-300")}>
                    {m === "whatsapp" && <MessageCircle className="w-4 h-4" />}
                    {m === "email" && <Mail className="w-4 h-4" />}
                    {m === "both" && <Send className="w-4 h-4" />}
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {(order.deliveryMethod === "whatsapp" || order.deliveryMethod === "both") && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">WhatsApp Number {order.deliveryMethod === "both" ? "" : "*"}</label>
                <div className="flex">
                  <span className="flex items-center px-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm font-medium text-gray-500">+91</span>
                  <input type="tel" value={order.recipientPhone} onChange={(e) => setOrder(o => ({ ...o, recipientPhone: e.target.value }))}
                    className={"flex-1 px-4 py-3 border-2 rounded-r-xl focus:outline-none transition-colors " + (errors.recipientPhone ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-brand-500")}
                    placeholder="9876543210" maxLength={10} />
                </div>
                {errors.recipientPhone && <p className="text-xs text-red-500 mt-1">{errors.recipientPhone}</p>}
              </div>
            )}
            {(order.deliveryMethod === "email" || order.deliveryMethod === "both") && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address {order.deliveryMethod === "both" ? "" : "*"}</label>
                <input type="email" value={order.recipientEmail} onChange={(e) => setOrder(o => ({ ...o, recipientEmail: e.target.value }))}
                  className={"w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors " + (errors.recipientEmail ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-brand-500")}
                  placeholder="friend@email.com" />
                {errors.recipientEmail && <p className="text-xs text-red-500 mt-1">{errors.recipientEmail}</p>}
              </div>
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Delivery Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="date" value={order.deliveryDate} onChange={(e) => setOrder(o => ({ ...o, deliveryDate: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none transition-colors" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Leave empty for instant delivery</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Name *</label>
              <input type="text" value={order.senderName} onChange={(e) => setOrder(o => ({ ...o, senderName: e.target.value }))}
                className={"w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors " + (errors.senderName ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-brand-500")}
                placeholder="e.g., Rahul" />
              {errors.senderName && <p className="text-xs text-red-500 mt-1">{errors.senderName}</p>}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center p-2">
              <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1"><h3 className="font-semibold text-gray-800">{b.name}</h3><p className="text-sm text-gray-400">{b.category}</p></div>
            <div className="text-right"><p className="text-lg font-bold text-brand-600">₹{order.amount.toLocaleString("en-IN")}</p></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate("detail")} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleNext} className="flex-[2] py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2">
              Add Greeting Card <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GreetingPage({ order, setOrder, selectCard, navigate }: { order: OrderState; setOrder: React.Dispatch<React.SetStateAction<OrderState>>; selectCard: (c: typeof greetingCards[0]) => void; navigate: (p: Page) => void }) {
  const b = order.brand!;
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-8">
          {["Amount", "Recipient", "Greeting", "Pay"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (i <= 2 ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-500")}>
                {i <= 2 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={"text-xs font-medium hidden sm:inline " + (i <= 2 ? "text-brand-600" : "text-gray-400")}>{step}</span>
              {i < 3 && <div className={"flex-1 h-0.5 " + (i < 2 ? "bg-brand-500" : "bg-gray-200")} />}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center"><Sparkles className="w-6 h-6 text-accent-600" /></div>
            <div><h1 className="font-display text-2xl font-bold">Add a Greeting Card</h1><p className="text-sm text-gray-400">Free with every gift card</p></div>
          </div>
          <div className={"relative rounded-2xl overflow-hidden bg-gradient-to-br " + order.cardGradient + " p-8 text-center text-white mb-6"}>
            <span className="text-6xl mb-4 block">{order.cardEmoji}</span>
            <h2 className="font-display text-2xl font-bold mb-2">{order.cardDesign}</h2>
            <p className="text-sm text-white/80 mb-4">{b.name} Gift Card · ₹{order.amount.toLocaleString("en-IN")}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm italic">"{order.message || "Dear " + (order.recipientName || "Friend") + ", Here's a " + b.name + " gift card just for you! Enjoy! With love, " + (order.senderName || "Your Friend") + "."}"</p>
              <p className="text-xs mt-2 text-white/70">— {order.senderName || "Your Friend"}</p>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose a Card Design</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {greetingCards.map((card) => (
              <button key={card.title} onClick={() => selectCard(card)}
                className={"rounded-xl overflow-hidden border-2 transition-all " + (order.cardDesign === card.title ? "border-brand-500 ring-2 ring-brand-200" : "border-gray-200 hover:border-brand-300")}>
                <div className={"h-20 bg-gradient-to-br " + card.gradient + " flex items-center justify-center"}>
                  <span className="text-3xl">{card.emoji}</span>
                </div>
                <div className="p-2 text-center"><span className="text-xs font-medium text-gray-700">{card.title}</span></div>
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Personal Message</label>
            <textarea value={order.message} onChange={(e) => setOrder(o => ({ ...o, message: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none transition-colors resize-none"
              rows={3} placeholder="Write something heartfelt..." />
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate("recipient")} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => navigate("checkout")} className="flex-[2] py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2">
              Review &amp; Pay <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckoutPage({ order, navigate }: { order: OrderState; navigate: (p: Page) => void }) {
  const b = order.brand!;
  const [processing, setProcessing] = useState(false);
  const handlePay = () => { setProcessing(true); setTimeout(() => navigate("confirmation"), 2000); };
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-8">
          {["Amount", "Recipient", "Greeting", "Pay"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (i === 3 ? "bg-brand-500 text-white animate-pulse" : "bg-brand-500 text-white")}>
                <Check className="w-4 h-4" />
              </div>
              <span className={"text-xs font-medium hidden sm:inline " + (i === 3 ? "text-brand-600 font-bold" : "text-brand-600")}>{step}</span>
              {i < 3 && <div className="flex-1 h-0.5 bg-brand-500" />}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold mb-6">Order Summary</h1>
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 border border-gray-100">
                <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{b.name}</h3>
                <p className="text-sm text-gray-400">{b.category}</p>
                <p className="text-xs text-brand-500 mt-1">Gift Card · ₹{order.amount.toLocaleString("en-IN")}</p>
              </div>
              <span className="font-bold text-gray-900">₹{order.amount.toLocaleString("en-IN")}</span>
            </div>
            <div className={"flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r " + order.cardGradient + " text-white"}>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-2xl">{order.cardEmoji}</span></div>
              <div className="flex-1">
                <h3 className="font-semibold">{order.cardDesign} Card</h3>
                <p className="text-sm text-white/80">Personalised greeting</p>
              </div>
              <span className="font-bold">FREE</span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6 space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Deliver To</h3>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <div><span className="font-semibold text-gray-800">{order.recipientName}</span>
                <span className="text-sm text-gray-400 ml-2">
                  {order.deliveryMethod === "whatsapp" && "· " + order.recipientPhone}
                  {order.deliveryMethod === "email" && "· " + order.recipientEmail}
                  {order.deliveryMethod === "both" && "· " + order.recipientPhone + " / " + order.recipientEmail}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Send className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Via {order.deliveryMethod === "both" ? "WhatsApp & Email" : order.deliveryMethod === "whatsapp" ? "WhatsApp" : "Email"}
                {order.deliveryDate && " · on " + new Date(order.deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                {!order.deliveryDate && " · Instant delivery"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">From {order.senderName}</span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Method</h3>
            <div className="space-y-2">
              {[
                { icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                { icon: MessageCircle, label: "UPI / Google Pay", sub: "Pay via any UPI app" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3 p-3 border-2 border-brand-500 bg-brand-50 rounded-xl cursor-pointer">
                  <p.icon className="w-5 h-5 text-brand-600" />
                  <div><span className="text-sm font-semibold text-brand-700">{p.label}</span><p className="text-xs text-brand-500/70">{p.sub}</p></div>
                  <div className="ml-auto w-5 h-5 rounded-full border-2 border-brand-500 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-brand-500" /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">{b.name} Gift Card</span>
              <span className="text-gray-700">₹{order.amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">Greeting Card</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">Platform Fee</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-brand-600">₹{order.amount.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("greeting")} className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handlePay} disabled={processing}
              className="flex-[2] py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {processing ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                <>Pay ₹{order.amount.toLocaleString("en-IN")} <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSL Encrypted</span>
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPage({ order, navigate }: { order: OrderState; navigate: (p: Page) => void }) {
  const b = order.brand!;
  const orderId = "GLY" + Date.now().toString(36).toUpperCase();
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Gift Card Purchased! 🎉</h1>
        <p className="text-gray-500 text-lg mb-2">Your {b.name} voucher is on its way to {order.recipientName}</p>
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-8">
          <span className="text-sm font-medium text-emerald-700">Order #{orderId}</span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 text-left">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-brand-500" /> Delivery Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">To</span>
              <span className="text-sm font-semibold text-gray-800">{order.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Via</span>
              <span className="text-sm font-semibold text-gray-800">
                {order.deliveryMethod === "both" ? "WhatsApp & Email" : order.deliveryMethod === "whatsapp" ? "WhatsApp" : "Email"}
              </span>
            </div>
            {order.deliveryDate && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Scheduled</span>
                <span className="text-sm font-semibold text-gray-800">
                  {new Date(order.deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            )}
            {!order.deliveryDate && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-semibold text-emerald-600">Delivered Instantly ✓</span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="relative h-36 p-6 flex items-center gap-5" style={{ backgroundColor: b.brandColor }}>
            <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-xl">
              <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-left text-white">
              <p className="font-bold text-lg">{b.name}</p>
              <p className="text-white/70 text-sm">{b.tagline}</p>
              <p className="text-white/50 text-xs mt-1">{b.category} Gift Card</p>
            </div>
            <div className="ml-auto bg-white rounded-xl px-4 py-2 shadow-lg">
              <p className="text-xl font-bold text-brand-600">₹{order.amount.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{order.cardEmoji}</span>
              <span className="text-sm font-medium text-gray-600">{order.cardDesign} Card</span>
            </div>
            <span className="text-xs text-gray-400">From {order.senderName}</span>
          </div>
        </div>
        <div className="space-y-3">
          <button onClick={() => navigate("home")}
            className="w-full py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-brand-500/25 flex items-center justify-center gap-2">
            <Gift className="w-5 h-5" /> Buy Another Gift Card
          </button>
          <button className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
            Share on Social Media
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          A confirmation has been sent to your email. You can track your order from your account dashboard.
        </p>
      </div>
    </div>
  );
}
function PrivacyPolicyPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: March 31, 2026</p>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              At Gyfter.net (operated by Rafasa technology private limited), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Site includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your account.</li>
              <li>Process your transactions and deliver the gift cards and vouchers you purchase.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Respond to product and customer service requests.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Rafasa technology private limited</strong><br />
              Email: support@gyfter.net
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsOfServicePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: March 31, 2026</p>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Welcome to Gyfter.net. These Terms of Service ("Terms") govern your use of the Gyfter.net website and services operated by Rafasa technology private limited.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Site, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you may not use our services.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p>
              Gyfter.net provides a platform for purchasing digital gift cards and vouchers for various third-party brands. We act as an intermediary between you and the brands. The gift cards are subject to the terms and conditions of the respective issuing brands.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <p>
              You may be required to create an account to use certain features of the Site. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Purchases and Payments</h2>
            <p>
              All purchases made through the Site are subject to our acceptance. We reserve the right to refuse or cancel any order for any reason. Prices for gift cards are subject to change without notice. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Rafasa technology private limited, its directors, employees, or agents be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at support@gyfter.net.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefundPolicyPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6">Refund Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: March 31, 2026</p>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Thank you for shopping at Gyfter.net, operated by Rafasa technology private limited. We want to ensure you have a rewarding experience while exploring, evaluating, and purchasing our digital gift cards and vouchers.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Digital Products</h2>
            <p>
              Due to the nature of digital gift cards and vouchers, all sales are final. Once a digital gift card or voucher has been purchased and the code has been delivered to you or your designated recipient, we cannot offer a refund or exchange.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Exceptions</h2>
            <p>
              Refunds may be considered under the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Non-Delivery:</strong> If you have not received the digital gift card code due to a technical issue on our end, and we are unable to deliver it within a reasonable timeframe.</li>
              <li><strong>Invalid Codes:</strong> If the delivered code is proven to be invalid or already redeemed prior to your purchase. You must report this issue within 24 hours of receiving the code. We will investigate the matter with the issuing brand before processing any refund or replacement.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How to Request a Refund</h2>
            <p>
              If you believe you are eligible for a refund based on the exceptions above, please contact our support team immediately at support@gyfter.net with your order number and a detailed explanation of the issue.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Processing Time</h2>
            <p>
              If your refund request is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days, depending on your bank or credit card issuer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
