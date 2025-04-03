
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto py-4 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-full bg-finance-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">FA</span>
            </div>
            <span className="text-sm font-semibold text-finance-blue-800">
              Akıllı Finans
            </span>
          </div>
          <div className="mt-4 md:mt-0 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Akıllı Finans Asistanı. Tüm hakları saklıdır.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-finance-blue-600">
              Gizlilik Politikası
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-finance-blue-600">
              Kullanım Koşulları
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-finance-blue-600">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
