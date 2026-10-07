import NavBar from "@/components/layout/NavBar";
import Hero from "@/components/home/Hero";
import { MdOutlineRestaurant } from "react-icons/md";
import { FiHome, FiUser, FiMapPin, FiPhone } from "react-icons/fi";
import { restaurantConfig } from "@/config/restaurant";
const navLinks = [
    { icon: <FiHome />, label: "الرئيسية", href: "/" },
    { icon: <MdOutlineRestaurant />, label: "القائمة", href: "/menu" },
    { icon: <FiUser />, label: "من نحن", href: "/#about" },
    { icon: <FiMapPin />, label: "موقعنا", href: "/#location" },
    { icon: <FiPhone />, label: "تواصل معنا", href: "/#contact" },
];

const Home = () => {
    return (
        <main className="min-h-screen">
            <div
                style={{
                    backgroundImage: `url(${restaurantConfig.hero.background})`,
                }}
                className="min-h-screen bg-cover bg-center bg-no-repeat px-0 md:px-[8vw] md:grid md:grid-cols-1 md:grid-rows-[auto_1fr]"
            >
                <div className="md:z-10 md:col-start-1 md:row-start-1">
                    <NavBar navbarItems={navLinks} />
                </div>

                <div className="md:col-start-1 md:row-start-1 md:row-end-3">
                    <Hero />
                </div>
            </div>
        </main>
    );
}

export default Home;
