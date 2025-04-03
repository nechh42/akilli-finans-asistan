
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, BookMarked, TrendingUp, Bookmark, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ARTICLES = [
  {
    id: 1,
    title: "Finansal Okuryazarlık: Temel Kavramlar",
    category: "temel",
    excerpt: "Temel finans kavramlarını öğrenerek finansal okuryazarlığınızı geliştirin.",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070",
  },
  {
    id: 2,
    title: "Kripto Para Yatırımı Nasıl Yapılır?",
    category: "kripto",
    excerpt: "Kripto para piyasasına giriş yapmak isteyenler için kapsamlı rehber.",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1942",
  },
  {
    id: 3,
    title: "Temel Ekonomik Göstergeler ve Piyasa Analizi",
    category: "analiz",
    excerpt: "Ekonomik göstergeleri anlamak ve piyasa analizlerini yorumlamak.",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?q=80&w=2070",
  },
  {
    id: 4,
    title: "Enflasyondan Korunma Stratejileri",
    category: "strateji",
    excerpt: "Yüksek enflasyon dönemlerinde birikimlerinizi korumak için etkili yöntemler.",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1974",
  },
  {
    id: 5,
    title: "Altın Yatırımı: Fiziki Altın vs. Altın Fonları",
    category: "yatirim",
    excerpt: "Farklı altın yatırım araçlarının karşılaştırılması ve en uygun seçimi yapma.",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070",
  },
  {
    id: 6,
    title: "Döviz Piyasaları ve TRY Stratejileri",
    category: "doviz",
    excerpt: "Türk Lirası odaklı döviz yatırım stratejileri ve risk yönetimi.",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1616261167032-b16d2df8333b?q=80&w=2071",
  }
];

const COURSES = [
  {
    id: 1,
    title: "Finansal Bağımsızlık 101",
    level: "Başlangıç",
    modules: 5,
    duration: "2 saat",
    image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?q=80&w=2070",
  },
  {
    id: 2,
    title: "Teknik Analiz Temelleri",
    level: "Orta",
    modules: 8,
    duration: "3.5 saat",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070",
  },
  {
    id: 3,
    title: "Risk Yönetimi ve Portföy Stratejileri",
    level: "İleri",
    modules: 6,
    duration: "4 saat",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236e3?q=80&w=2070",
  }
];

const FAQ_ITEMS = [
  {
    question: "Nasıl yatırıma başlamalıyım?",
    answer: "Yatırıma başlamak için öncelikle finansal hedeflerinizi belirlemeli, risk toleransınızı değerlendirmeli ve temel finansal eğitiminizi tamamlamalısınız. Ardından, küçük miktarlarla başlayarak deneyim kazanabilirsiniz. Çeşitlendirme prensibini unutmayın ve tüm birikimlerinizi tek bir yatırım aracına yönlendirmekten kaçının."
  },
  {
    question: "Enflasyondan korunmak için hangi yatırım araçları uygundur?",
    answer: "Enflasyondan korunmak için döviz, altın, enflasyona endeksli tahviller, gayrimenkul ve hisse senetleri gibi çeşitli yatırım araçlarını kullanabilirsiniz. Bu araçların her birinin farklı risk ve getiri profilleri vardır, bu nedenle kişisel finansal durumunuza ve risk toleransınıza göre çeşitlendirme yapmanız önemlidir."
  },
  {
    question: "Kripto para yatırımı yapmak güvenli mi?",
    answer: "Kripto para yatırımları yüksek volatilite ve risk içermektedir. Bu nedenle, sadece kaybetmeyi göze alabileceğiniz miktarla yatırım yapmanız önerilir. Kripto para birimi piyasası hakkında eğitim alın, güvenilir borsaları tercih edin ve dijital cüzdanlarınızı korumak için güvenlik önlemlerini alın."
  },
  {
    question: "TL'nin değer kaybı durumunda nasıl önlem alabilirim?",
    answer: "TL'nin değer kaybı durumunda döviz (özellikle USD, EUR), altın, yabancı hisse senetleri veya yabancı para birimi cinsinden tahvil/bono gibi yatırım araçlarına yönelmeniz koruma sağlayabilir. Ayrıca, enflasyona endeksli mevduatlar veya tahviller de bir alternatif olabilir."
  }
];

const Education = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const filteredArticles = searchTerm
    ? ARTICLES.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ARTICLES;

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Finans Eğitimi</h1>
        <p className="text-gray-600">
          Finansal okuryazarlığınızı geliştirin ve daha bilinçli yatırım kararları alın.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Eğitim içeriği ara..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="articles" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="articles">
            <BookOpen className="h-4 w-4 mr-2" />
            Makaleler
          </TabsTrigger>
          <TabsTrigger value="courses">
            <BookMarked className="h-4 w-4 mr-2" />
            Kurslar
          </TabsTrigger>
          <TabsTrigger value="faq">
            <TrendingUp className="h-4 w-4 mr-2" />
            Sık Sorulan Sorular
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden flex flex-col">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="secondary" className="bg-finance-blue-50 text-finance-blue-700 hover:bg-finance-blue-100">
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <span className="mr-1">{article.readTime}</span> dk okuma
                      </span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-0 flex-grow">
                    <p className="text-gray-600">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button variant="ghost" size="sm" className="text-finance-blue-600 hover:text-finance-blue-800">
                      <Bookmark className="h-4 w-4 mr-1" />
                      Kaydet
                    </Button>
                    <Button size="sm">
                      Oku
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Aradığınız kriterlere uygun makale bulunamadı.</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchTerm("")}
                  className="mt-2"
                >
                  Tüm makaleleri göster
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="border-finance-blue-200">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-0 flex-grow space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Modüller:</span>
                    <span className="font-medium">{course.modules} modül</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Süre:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button className="w-full">
                    Kursa Başla
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Daha fazla finans eğitimi içeriği yakında eklenecek. Güncel içeriklerden haberdar olmak için bültenimize abone olabilirsiniz.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input type="email" placeholder="E-posta adresiniz" />
              <Button>Abone Ol</Button>
            </div>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6">
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader 
                  className="py-3 cursor-pointer"
                  onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                >
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{item.question}</span>
                    <span className={`transition-transform transform ${expandedFaqIndex === index ? "rotate-180" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </CardTitle>
                </CardHeader>
                {expandedFaqIndex === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-finance-blue-50 border border-finance-blue-100 rounded-lg p-6 text-center">
            <h3 className="font-medium text-finance-blue-800 mb-2">Başka Sorularınız mı Var?</h3>
            <p className="text-finance-blue-700 mb-4">
              Finans konusundaki tüm sorularınız için destek ekibimize ulaşabilirsiniz.
            </p>
            <Button variant="outline" className="bg-white">
              İletişime Geç
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
