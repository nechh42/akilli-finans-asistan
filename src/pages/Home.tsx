
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, TrendingUp, TrendingDown, DollarSign, Info } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - to be replaced with real API data
const MARKET_DATA = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 68324.5, change: 2.34 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 4287.1, change: -1.27 },
  { id: 3, name: "Dolar", symbol: "USD", price: 32.45, change: 0.45 },
  { id: 4, name: "Euro", symbol: "EUR", price: 35.12, change: 0.12 },
  { id: 5, name: "Altın", symbol: "XAU", price: 2134, change: 1.67 },
];

const formatPrice = (price: number, isCrypto: boolean = false): string => {
  return new Intl.NumberFormat(isCrypto ? "en-US" : "tr-TR", {
    style: "currency",
    currency: isCrypto ? "USD" : "TRY",
    minimumFractionDigits: isCrypto ? 2 : 2,
    maximumFractionDigits: isCrypto ? 2 : 2,
  }).format(price);
};

const Home = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
        " " +
        now.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })
    );
  }, []);

  return (
    <div className="container">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Hoş Geldiniz!
          </h1>
          <span className="text-sm text-gray-500">{currentTime}</span>
        </div>

        <Card className="bg-gradient-to-r from-finance-blue-600 to-finance-blue-800 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  Finansal Danışmanınız Hazır
                </h2>
                <p className="text-finance-blue-100 max-w-md">
                  Kişiselleştirilmiş yatırım önerileri, piyasa analizi ve finansal eğitim içeriği için hazırız.
                </p>
              </div>
              <Button asChild className="bg-white text-finance-blue-800 hover:bg-finance-blue-50">
                <Link to="/recommendations">
                  Önerileri Gör <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Market Overview Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Piyasa Özeti</h2>
          <Button variant="ghost" size="sm" className="text-finance-blue-600 hover:text-finance-blue-800">
            Tümünü Gör
          </Button>
        </div>

        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="crypto">Kripto</TabsTrigger>
            <TabsTrigger value="currency">Döviz</TabsTrigger>
            <TabsTrigger value="metals">Değerli Madenler</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MARKET_DATA.slice(0, 2).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                          {item.symbol.charAt(0)}
                        </div>
                        {item.name}
                      </div>
                      <span className="text-sm font-medium text-gray-500">{item.symbol}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{formatPrice(item.price, true)}</p>
                        <div className={`flex items-center ${item.change >= 0 ? "text-finance-teal-600" : "text-finance-red-600"}`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>
                      </div>
                      {/* Placeholder for mini chart */}
                      <div className="w-24 h-12 bg-gray-100 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MARKET_DATA.slice(2, 4).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                          {item.symbol.charAt(0)}
                        </div>
                        {item.name}
                      </div>
                      <span className="text-sm font-medium text-gray-500">{item.symbol}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{formatPrice(item.price)}</p>
                        <div className={`flex items-center ${item.change >= 0 ? "text-finance-teal-600" : "text-finance-red-600"}`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>
                      </div>
                      {/* Placeholder for mini chart */}
                      <div className="w-24 h-12 bg-gray-100 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MARKET_DATA.slice(4, 5).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                          {item.symbol.charAt(0)}
                        </div>
                        {item.name}
                      </div>
                      <span className="text-sm font-medium text-gray-500">{item.symbol}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{formatPrice(item.price)}</p>
                        <div className={`flex items-center ${item.change >= 0 ? "text-finance-teal-600" : "text-finance-red-600"}`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>
                      </div>
                      {/* Placeholder for mini chart */}
                      <div className="w-24 h-12 bg-gray-100 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Tips Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Günün Finansal İpuçları</h2>
        
        <Card className="bg-finance-blue-50 border-finance-blue-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-finance-blue-600" />
              <CardTitle className="text-finance-blue-800 text-lg">Birikim İpucu</CardTitle>
            </div>
            <CardDescription>
              Döviz ve altın yatırımlarınızı çeşitlendirmek risk yönetimi için önemlidir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Tüm yatırımlarınızı tek bir varlık sınıfına yönlendirmek yerine, farklı varlık sınıflarına dağıtmak, piyasadaki dalgalanmalara karşı portföyünüzü korumaya yardımcı olur.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="text-finance-blue-700 p-0" asChild>
              <Link to="/education">
                Daha Fazla Bilgi <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default Home;
