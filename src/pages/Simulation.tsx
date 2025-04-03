
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Wallet, ArrowRight, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const INITIAL_BALANCE = 10000; // 10,000 TRY

// Mock data - to be replaced with real API data
const ASSETS = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 683245, change: 2.34 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 42871, change: -1.27 },
  { id: 3, name: "Dolar", symbol: "USD", price: 32.45, change: 0.45 },
  { id: 4, name: "Euro", symbol: "EUR", price: 35.12, change: 0.12 },
  { id: 5, name: "Altın", symbol: "XAU", price: 2134, change: 1.67 },
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(price);
};

const Simulation = () => {
  const [portfolio, setPortfolio] = useState<{
    balance: number;
    assets: { assetId: number; amount: number; avgPrice: number }[];
    transactions: { assetId: number; type: "buy" | "sell"; amount: number; price: number; timestamp: Date }[];
  }>({
    balance: INITIAL_BALANCE,
    assets: [],
    transactions: [],
  });

  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>("");

  const handleAssetSelect = (assetId: number) => {
    setSelectedAsset(assetId);
    setAmount("");
  };

  const handleBuy = () => {
    if (!selectedAsset || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return;

    const asset = ASSETS.find((a) => a.id === selectedAsset);
    if (!asset) return;

    const amountValue = parseFloat(amount);
    const totalCost = asset.price * amountValue;

    if (totalCost > portfolio.balance) {
      alert("Yetersiz bakiye! Satın alma işlemi gerçekleştirilemiyor.");
      return;
    }

    // Check if asset already exists in portfolio
    const existingAssetIndex = portfolio.assets.findIndex(
      (a) => a.assetId === selectedAsset
    );

    const newPortfolio = { ...portfolio };

    // Update balance
    newPortfolio.balance -= totalCost;

    // Add transaction
    newPortfolio.transactions = [
      ...newPortfolio.transactions,
      {
        assetId: selectedAsset,
        type: "buy",
        amount: amountValue,
        price: asset.price,
        timestamp: new Date(),
      },
    ];

    // Update or add asset to portfolio
    if (existingAssetIndex >= 0) {
      // Asset exists, update it
      const existingAsset = portfolio.assets[existingAssetIndex];
      const newTotalAmount = existingAsset.amount + amountValue;
      const newAvgPrice =
        (existingAsset.amount * existingAsset.avgPrice + totalCost) / newTotalAmount;

      newPortfolio.assets = [...portfolio.assets];
      newPortfolio.assets[existingAssetIndex] = {
        ...existingAsset,
        amount: newTotalAmount,
        avgPrice: newAvgPrice,
      };
    } else {
      // Asset doesn't exist, add it
      newPortfolio.assets = [
        ...portfolio.assets,
        {
          assetId: selectedAsset,
          amount: amountValue,
          avgPrice: asset.price,
        },
      ];
    }

    setPortfolio(newPortfolio);
    setAmount("");
  };

  const handleSell = () => {
    if (!selectedAsset || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return;

    const asset = ASSETS.find((a) => a.id === selectedAsset);
    if (!asset) return;

    const amountValue = parseFloat(amount);
    
    // Check if user has the asset and enough amount
    const existingAssetIndex = portfolio.assets.findIndex(
      (a) => a.assetId === selectedAsset
    );

    if (existingAssetIndex < 0 || portfolio.assets[existingAssetIndex].amount < amountValue) {
      alert("Yetersiz varlık! Satış işlemi gerçekleştirilemiyor.");
      return;
    }

    const totalSale = asset.price * amountValue;
    const newPortfolio = { ...portfolio };

    // Update balance
    newPortfolio.balance += totalSale;

    // Add transaction
    newPortfolio.transactions = [
      ...newPortfolio.transactions,
      {
        assetId: selectedAsset,
        type: "sell",
        amount: amountValue,
        price: asset.price,
        timestamp: new Date(),
      },
    ];

    // Update asset in portfolio
    const existingAsset = portfolio.assets[existingAssetIndex];
    const newAmount = existingAsset.amount - amountValue;

    if (newAmount > 0) {
      // Still have some amount left
      newPortfolio.assets = [...portfolio.assets];
      newPortfolio.assets[existingAssetIndex] = {
        ...existingAsset,
        amount: newAmount,
      };
    } else {
      // No amount left, remove from portfolio
      newPortfolio.assets = portfolio.assets.filter(
        (a) => a.assetId !== selectedAsset
      );
    }

    setPortfolio(newPortfolio);
    setAmount("");
  };

  const calculateTotalValue = () => {
    return portfolio.assets.reduce((total, asset) => {
      const currentPrice = ASSETS.find((a) => a.id === asset.assetId)?.price || 0;
      return total + currentPrice * asset.amount;
    }, 0);
  };

  const calculateProfitLoss = () => {
    return portfolio.assets.reduce((total, asset) => {
      const currentPrice = ASSETS.find((a) => a.id === asset.assetId)?.price || 0;
      const investedValue = asset.avgPrice * asset.amount;
      const currentValue = currentPrice * asset.amount;
      return total + (currentValue - investedValue);
    }, 0);
  };

  const totalValue = calculateTotalValue();
  const profitLoss = calculateProfitLoss();
  const totalPortfolioValue = portfolio.balance + totalValue;

  const getAssetName = (assetId: number) => {
    return ASSETS.find((a) => a.id === assetId)?.name || "Bilinmeyen Varlık";
  };

  const getAssetSymbol = (assetId: number) => {
    return ASSETS.find((a) => a.id === assetId)?.symbol || "???";
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Simülasyon Modu</h1>
        <p className="text-gray-600">
          Risk almadan yatırım stratejilerinizi test edin.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-finance-blue-50 border border-finance-blue-100 rounded-lg p-4 mb-6 flex items-start">
        <AlertCircle className="text-finance-blue-500 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-finance-blue-800">Simülasyon Hakkında</h3>
          <p className="text-sm text-finance-blue-700 mt-1">
            Bu simülasyon modunda {formatPrice(INITIAL_BALANCE)} sanal bakiye ile risk almadan yatırım yapabilirsiniz. Şu an bu özellik yapım aşamasındadır ve fiyatlar gerçek zamanlı değildir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Portföy Özeti
              </CardTitle>
              <CardDescription>
                Simülasyon portföyünüzün güncel durumu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Nakit Bakiye:</span>
                <span className="font-semibold">{formatPrice(portfolio.balance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Varlık Değeri:</span>
                <span className="font-semibold">{formatPrice(totalValue)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-gray-500">Toplam Değer:</span>
                <span className="font-bold text-lg">{formatPrice(totalPortfolioValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kâr/Zarar:</span>
                <span className={`font-semibold flex items-center ${profitLoss >= 0 ? "text-finance-teal-600" : "text-finance-red-600"}`}>
                  {profitLoss >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {formatPrice(profitLoss)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button variant="outline" size="sm" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Sıfırla
              </Button>
            </CardFooter>
          </Card>

          {/* Portfolio Assets */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Varlıklarım</CardTitle>
              <CardDescription>
                Sahip olduğunuz varlıklar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portfolio.assets.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  Henüz varlığınız bulunmamaktadır.
                </div>
              ) : (
                <div className="space-y-3">
                  {portfolio.assets.map((asset, index) => {
                    const assetInfo = ASSETS.find((a) => a.id === asset.assetId);
                    if (!assetInfo) return null;

                    const currentValue = assetInfo.price * asset.amount;
                    const investedValue = asset.avgPrice * asset.amount;
                    const profitLoss = currentValue - investedValue;
                    const profitLossPercentage = (profitLoss / investedValue) * 100;

                    return (
                      <div
                        key={asset.assetId}
                        className={`flex justify-between p-3 rounded-lg ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs">
                              {getAssetSymbol(asset.assetId).charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">
                                {getAssetName(asset.assetId)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {asset.amount.toLocaleString("tr-TR", {
                                  maximumFractionDigits: 6,
                                })}{" "}
                                {getAssetSymbol(asset.assetId)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatPrice(currentValue)}
                          </p>
                          <p
                            className={`text-xs flex items-center justify-end ${
                              profitLoss >= 0
                                ? "text-finance-teal-600"
                                : "text-finance-red-600"
                            }`}
                          >
                            {profitLoss >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {profitLoss >= 0 ? "+" : ""}
                            {profitLossPercentage.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Alım Satım</CardTitle>
              <CardDescription>
                Varlık seçin ve işlem yapın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column - Asset Selection */}
                <div>
                  <h3 className="font-medium mb-3">Varlık Seçin</h3>
                  <div className="space-y-2">
                    {ASSETS.map((asset) => (
                      <div
                        key={asset.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedAsset === asset.id
                            ? "border-finance-blue-500 bg-finance-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleAssetSelect(asset.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 mr-2 flex items-center justify-center">
                              {asset.symbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(asset.price)}</p>
                            <p
                              className={`text-xs flex items-center ${
                                asset.change >= 0
                                  ? "text-finance-teal-600"
                                  : "text-finance-red-600"
                              }`}
                            >
                              {asset.change >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {asset.change >= 0 ? "+" : ""}
                              {asset.change}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Trading Form */}
                <div>
                  <h3 className="font-medium mb-3">İşlem Yap</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Miktar</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          disabled={!selectedAsset}
                          className="flex-1"
                          min="0"
                          step="0.000001"
                        />
                        <span className="ml-2 text-gray-500 w-16">
                          {selectedAsset
                            ? ASSETS.find((a) => a.id === selectedAsset)?.symbol
                            : "???"}
                        </span>
                      </div>
                    </div>

                    {selectedAsset && (
                      <div className="border-t pt-3 mt-3 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Fiyat</span>
                          <span>
                            {formatPrice(
                              ASSETS.find((a) => a.id === selectedAsset)?.price || 0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Toplam</span>
                          <span className="font-medium">
                            {formatPrice(
                              (ASSETS.find((a) => a.id === selectedAsset)?.price || 0) *
                                (parseFloat(amount) || 0)
                            )}
                          </span>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <Button
                            onClick={handleBuy}
                            className="flex-1 bg-finance-teal-600 hover:bg-finance-teal-700"
                            disabled={!selectedAsset || !amount}
                          >
                            Satın Al
                          </Button>
                          <Button
                            onClick={handleSell}
                            variant="outline"
                            className="flex-1 text-finance-red-600 border-finance-red-200 hover:bg-finance-red-50"
                            disabled={!selectedAsset || !amount}
                          >
                            Sat
                          </Button>
                        </div>
                      </div>
                    )}

                    {!selectedAsset && (
                      <div className="flex items-center justify-center h-[120px] text-gray-400 border rounded-lg border-dashed">
                        Lütfen bir varlık seçin
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>İşlem Geçmişi</CardTitle>
              <CardDescription>
                Son işlemleriniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portfolio.transactions.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  Henüz işlem yapmadınız.
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Varlık
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlem
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Miktar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fiyat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Toplam
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {portfolio.transactions
                        .slice()
                        .reverse()
                        .map((tx, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {tx.timestamp.toLocaleString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {getAssetName(tx.assetId)}
                                </div>
                                <span className="ml-1 text-xs text-gray-500">
                                  ({getAssetSymbol(tx.assetId)})
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  tx.type === "buy"
                                    ? "bg-finance-teal-100 text-finance-teal-800"
                                    : "bg-finance-red-100 text-finance-red-800"
                                }`}
                              >
                                {tx.type === "buy" ? "Alım" : "Satım"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {tx.amount.toLocaleString("tr-TR", {
                                maximumFractionDigits: 6,
                              })}{" "}
                              {getAssetSymbol(tx.assetId)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatPrice(tx.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {formatPrice(tx.price * tx.amount)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
