
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, Info, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// Mock data - to be replaced with real API data
const RECOMMENDATIONS = [
  {
    id: 1,
    type: "Kripto",
    name: "Bitcoin (BTC)",
    recommendation: "Al",
    riskLevel: "Orta",
    price: 683245,
    targetPrice: 750000,
    potentialReturn: 9.8,
    timeFrame: "1-3 ay",
    reasoning: "Bitcoin son dönemde güçlü bir momentum gösteriyor. Kurumsal alımlar ve artan adaptasyon, fiyatı destekleyici faktörler arasında."
  },
  {
    id: 2,
    type: "Döviz",
    name: "Amerikan Doları (USD)",
    recommendation: "Tut",
    riskLevel: "Düşük",
    price: 32.45,
    targetPrice: 33.5,
    potentialReturn: 3.2,
    timeFrame: "2-4 hafta",
    reasoning: "Türkiye'deki yüksek enflasyon ve ekonomik belirsizlik, dolara olan talebi artırıyor. Merkez bankasının faiz politikası değişmedikçe, dolar güçlü kalmaya devam edebilir."
  },
  {
    id: 3,
    type: "Değerli Maden",
    name: "Altın (XAU)",
    recommendation: "Al",
    riskLevel: "Düşük",
    price: 2134,
    targetPrice: 2250,
    potentialReturn: 5.4,
    timeFrame: "3-6 ay",
    reasoning: "Küresel ekonomik belirsizlik ve jeopolitik riskler, güvenli liman olarak altına olan talebi artırıyor. Enflasyonist ortamda altın iyi bir koruma sağlayabilir."
  }
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(price);
};

const Recommendations = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Yatırım Önerileri</h1>
        <p className="text-gray-600">
          Piyasa analizlerine dayalı güncel yatırım önerilerimizi keşfedin.
        </p>
      </div>

      {/* Risk Tolerance Notice */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6 flex items-start">
        <AlertCircle className="text-yellow-500 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-yellow-800">Risk Toleransınızı Belirleyin</h3>
          <p className="text-sm text-yellow-700 mt-1">
            Daha kişiselleştirilmiş öneriler için risk tolerans profilinizi tamamlayın. Bu, size özel yatırım stratejileri sunmamıza yardımcı olacaktır.
          </p>
          <Button variant="outline" className="mt-2 text-yellow-700 border-yellow-200 bg-yellow-50 hover:bg-yellow-100">
            Profili Tamamla
          </Button>
        </div>
      </div>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="all">Tüm Öneriler</TabsTrigger>
          <TabsTrigger value="crypto">Kripto</TabsTrigger>
          <TabsTrigger value="currency">Döviz</TabsTrigger>
          <TabsTrigger value="metals">Değerli Madenler</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {RECOMMENDATIONS.map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "secondary"} className="bg-finance-blue-100 text-finance-blue-800 hover:bg-finance-blue-200">
                        {recommendation.type}
                      </Badge>
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "outline"} className={recommendation.recommendation === "Al" ? "bg-finance-teal-100 text-finance-teal-800 hover:bg-finance-teal-200" : ""}>
                        {recommendation.recommendation}
                      </Badge>
                      <span className="text-xs text-gray-500">Risk: {recommendation.riskLevel}</span>
                    </div>
                    <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(recommendation.price)}</p>
                    <div className="flex items-center justify-end text-finance-teal-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{recommendation.potentialReturn}% potansiyel</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-0">
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Hedef Fiyat</p>
                    <p className="font-medium">{formatPrice(recommendation.targetPrice)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Potansiyel Getiri</p>
                    <p className="font-medium text-finance-teal-600">%{recommendation.potentialReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zaman Dilimi</p>
                    <p className="font-medium">{recommendation.timeFrame}</p>
                  </div>
                </div>
                
                {expandedIds.includes(recommendation.id) && (
                  <div className="mt-4 mb-2">
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-finance-blue-500" />
                      Neden {recommendation.recommendation}?
                    </h4>
                    <p className="text-gray-700">{recommendation.reasoning}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(recommendation.id)}>
                  {expandedIds.includes(recommendation.id) ? "Detayları Gizle" : "Detayları Göster"}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedIds.includes(recommendation.id) ? "transform rotate-180" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="#">
                    Simülasyonda Dene <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4 mt-4">
          {RECOMMENDATIONS.filter(item => item.type === "Kripto").map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              {/* Same card structure as above */}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "secondary"} className="bg-finance-blue-100 text-finance-blue-800 hover:bg-finance-blue-200">
                        {recommendation.type}
                      </Badge>
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "outline"} className={recommendation.recommendation === "Al" ? "bg-finance-teal-100 text-finance-teal-800 hover:bg-finance-teal-200" : ""}>
                        {recommendation.recommendation}
                      </Badge>
                      <span className="text-xs text-gray-500">Risk: {recommendation.riskLevel}</span>
                    </div>
                    <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(recommendation.price)}</p>
                    <div className="flex items-center justify-end text-finance-teal-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{recommendation.potentialReturn}% potansiyel</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-0">
                {/* Same content structure */}
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Hedef Fiyat</p>
                    <p className="font-medium">{formatPrice(recommendation.targetPrice)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Potansiyel Getiri</p>
                    <p className="font-medium text-finance-teal-600">%{recommendation.potentialReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zaman Dilimi</p>
                    <p className="font-medium">{recommendation.timeFrame}</p>
                  </div>
                </div>
                
                {expandedIds.includes(recommendation.id) && (
                  <div className="mt-4 mb-2">
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-finance-blue-500" />
                      Neden {recommendation.recommendation}?
                    </h4>
                    <p className="text-gray-700">{recommendation.reasoning}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(recommendation.id)}>
                  {expandedIds.includes(recommendation.id) ? "Detayları Gizle" : "Detayları Göster"}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedIds.includes(recommendation.id) ? "transform rotate-180" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="#">
                    Simülasyonda Dene <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        {/* Similar structure for Currency and Metals tabs */}
        <TabsContent value="currency" className="space-y-4 mt-4">
          {RECOMMENDATIONS.filter(item => item.type === "Döviz").map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              {/* Same card structure as above */}
              <CardHeader className="pb-3">
                {/* Same header structure */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "secondary"} className="bg-finance-blue-100 text-finance-blue-800 hover:bg-finance-blue-200">
                        {recommendation.type}
                      </Badge>
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "outline"} className={recommendation.recommendation === "Tut" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                        {recommendation.recommendation}
                      </Badge>
                      <span className="text-xs text-gray-500">Risk: {recommendation.riskLevel}</span>
                    </div>
                    <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(recommendation.price)}</p>
                    <div className="flex items-center justify-end text-finance-teal-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{recommendation.potentialReturn}% potansiyel</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-0">
                {/* Same content structure */}
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Hedef Fiyat</p>
                    <p className="font-medium">{formatPrice(recommendation.targetPrice)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Potansiyel Getiri</p>
                    <p className="font-medium text-finance-teal-600">%{recommendation.potentialReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zaman Dilimi</p>
                    <p className="font-medium">{recommendation.timeFrame}</p>
                  </div>
                </div>
                
                {expandedIds.includes(recommendation.id) && (
                  <div className="mt-4 mb-2">
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-finance-blue-500" />
                      Neden {recommendation.recommendation}?
                    </h4>
                    <p className="text-gray-700">{recommendation.reasoning}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(recommendation.id)}>
                  {expandedIds.includes(recommendation.id) ? "Detayları Gizle" : "Detayları Göster"}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedIds.includes(recommendation.id) ? "transform rotate-180" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="#">
                    Simülasyonda Dene <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="metals" className="space-y-4 mt-4">
          {RECOMMENDATIONS.filter(item => item.type === "Değerli Maden").map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              {/* Same card structure as above */}
              <CardHeader className="pb-3">
                {/* Same header structure */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "secondary"} className="bg-finance-blue-100 text-finance-blue-800 hover:bg-finance-blue-200">
                        {recommendation.type}
                      </Badge>
                      <Badge variant={recommendation.recommendation === "Al" ? "default" : "outline"} className={recommendation.recommendation === "Al" ? "bg-finance-teal-100 text-finance-teal-800 hover:bg-finance-teal-200" : ""}>
                        {recommendation.recommendation}
                      </Badge>
                      <span className="text-xs text-gray-500">Risk: {recommendation.riskLevel}</span>
                    </div>
                    <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(recommendation.price)}</p>
                    <div className="flex items-center justify-end text-finance-teal-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{recommendation.potentialReturn}% potansiyel</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-0">
                {/* Same content structure */}
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Hedef Fiyat</p>
                    <p className="font-medium">{formatPrice(recommendation.targetPrice)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Potansiyel Getiri</p>
                    <p className="font-medium text-finance-teal-600">%{recommendation.potentialReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zaman Dilimi</p>
                    <p className="font-medium">{recommendation.timeFrame}</p>
                  </div>
                </div>
                
                {expandedIds.includes(recommendation.id) && (
                  <div className="mt-4 mb-2">
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-finance-blue-500" />
                      Neden {recommendation.recommendation}?
                    </h4>
                    <p className="text-gray-700">{recommendation.reasoning}</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(recommendation.id)}>
                  {expandedIds.includes(recommendation.id) ? "Detayları Gizle" : "Detayları Göster"}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedIds.includes(recommendation.id) ? "transform rotate-180" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="#">
                    Simülasyonda Dene <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Recommendations;
