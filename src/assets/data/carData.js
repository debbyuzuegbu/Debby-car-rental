import img01 from "../all-images/cars-img/nissan-offer.png";
import img02 from "../all-images/cars-img/offer-toyota.png";
import img03 from "../all-images/cars-img/bmw-offer.png";
import img04 from "../all-images/cars-img/nissan-offer.png";
import img05 from "../all-images/cars-img/offer-toyota.png";
import img06 from "../all-images/cars-img/mercedes-offer.png";
import img07 from "../all-images/cars-img/toyota-offer-2.png";
import img08 from "../all-images/cars-img/mercedes-offer.png";

const carData = [
  {
    id: 1,
    brand: "Tesla",
    rating: 112,
    carName: "Tesla Model 3",
    imgUrl: img01,
    model: "2023",
    price: 85,
    speed: "225 km/h",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    automatic: "Automatic",
    fuelType: "Electric",
    category: "sedan",
    description:
      "The Tesla Model 3 is a fully electric sedan that combines cutting-edge technology with an exhilarating driving experience. With autopilot capabilities, a minimalist interior, and zero emissions, it redefines what a modern car can be. Enjoy over 500 km of range on a single charge.",
  },

  {
    id: 2,
    brand: "Toyota",
    rating: 102,
    carName: "Toyota Camry",
    imgUrl: img02,
    model: "2023",
    price: 55,
    speed: "180 km/h",
    gps: "GPS Navigation",
    seatType: "Comfort seats",
    automatic: "Automatic",
    fuelType: "Petrol",
    category: "sedan",
    description:
      "The Toyota Camry is a refined midsize sedan renowned for its reliability and comfort. Featuring a smooth V6 engine, spacious cabin, and advanced safety features, it's the ideal choice for business trips and family journeys alike.",
  },

  {
    id: 3,
    brand: "BMW",
    rating: 132,
    carName: "BMW X5",
    imgUrl: img03,
    model: "2023",
    price: 110,
    speed: "250 km/h",
    gps: "GPS Navigation",
    seatType: "Heated leather seats",
    automatic: "Automatic",
    fuelType: "Diesel",
    category: "suv",
    description:
      "The BMW X5 is a premium SUV that delivers exhilarating performance without sacrificing luxury. With its powerful TwinPower Turbo engine, xDrive all-wheel drive, and sophisticated interior, it handles every road condition with confidence and elegance.",
  },

  {
    id: 4,
    brand: "Nissan",
    rating: 102,
    carName: "Nissan X-Trail",
    imgUrl: img04,
    model: "2022",
    price: 65,
    speed: "185 km/h",
    gps: "GPS Navigation",
    seatType: "Comfort seats",
    automatic: "Automatic",
    fuelType: "Petrol",
    category: "suv",
    description:
      "The Nissan X-Trail is a versatile and family-friendly SUV offering impressive space, intelligent 4WD, and a host of smart technologies. Its raised driving position and rugged capability make it perfect for weekend adventures and everyday commuting.",
  },

  {
    id: 5,
    brand: "Mercedes",
    rating: 94,
    carName: "Mercedes C-Class",
    imgUrl: img05,
    model: "2023",
    price: 95,
    speed: "240 km/h",
    gps: "GPS Navigation",
    seatType: "Leather seats",
    automatic: "Automatic",
    fuelType: "Petrol",
    category: "luxury",
    description:
      "The Mercedes-Benz C-Class exemplifies premium craftsmanship and sophisticated driving dynamics. Its elegant design, powerful AMG-tuned engine, and intelligent driver assistance systems make every journey an exceptional experience.",
  },

  {
    id: 6,
    brand: "Mercedes",
    rating: 119,
    carName: "Mercedes GLE",
    imgUrl: img06,
    model: "2023",
    price: 130,
    speed: "235 km/h",
    gps: "GPS Navigation",
    seatType: "Heated leather seats",
    automatic: "Automatic",
    fuelType: "Hybrid",
    category: "luxury",
    description:
      "The Mercedes-Benz GLE is the pinnacle of luxury SUVs, blending commanding presence with a whisper-quiet ride. Its E-ACTIVE BODY CONTROL suspension adapts to every surface, while the MBUX infotainment system keeps you connected in style.",
  },

  {
    id: 7,
    brand: "Audi",
    rating: 88,
    carName: "Audi Q7",
    imgUrl: img07,
    model: "2022",
    price: 115,
    speed: "245 km/h",
    gps: "GPS Navigation",
    seatType: "Ventilated seats",
    automatic: "Automatic",
    fuelType: "Diesel",
    category: "suv",
    description:
      "The Audi Q7 is a full-size luxury SUV that seats seven in exceptional comfort. With quattro all-wheel drive, a refined turbocharged engine, and Audi's signature virtual cockpit, it offers an unmatched blend of utility and sophistication.",
  },

  {
    id: 8,
    brand: "Rolls Royce",
    rating: 72,
    carName: "Rolls Royce Ghost",
    imgUrl: img08,
    model: "2023",
    price: 350,
    speed: "250 km/h",
    gps: "GPS Navigation",
    seatType: "Bespoke leather seats",
    automatic: "Automatic",
    fuelType: "Petrol",
    category: "luxury",
    description:
      "The Rolls-Royce Ghost is the ultimate expression of automotive luxury. Handcrafted by master artisans, its sumptuous interior, near-silent cabin, and effortless 6.75-litre V12 power deliver an experience unlike any other car on earth.",
  },
];

export default carData;
