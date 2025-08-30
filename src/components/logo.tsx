import { FaShieldAlt, FaChartLine } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 text-blue-600">
      <FaShieldAlt size={28} />
      <FaChartLine size={24} />
      <span className="font-bold text-lg">MarketSafe Lite</span>
    </div>
  );
};

export default Logo;

