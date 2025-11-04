
import React from 'react';
import { Business, Stock, Employee, Achievement, GameState, NewsEvent, Loan, Campaign, RealEstateProperty, Car, Location, SocialDeal } from './types';
import { LemonadeStandIcon, NewspaperIcon, CarWashIcon, PizzaIcon, SoftwareIcon, RocketIcon, BusinessIcon } from './components/Icons';

const rawBusinesses: Business[] = [
    // New York Businesses
    { id: 'lemonade_stand', name: 'كشك ليموناضة', description: 'بداية كلاسيكية.', level: 0, baseCost: 10, incomePerSecond: 0.1, clickPower: 0.1, icon: <LemonadeStandIcon />, locationId: 'new_york', upgrades: [
        { id: 'ls1', name: 'سكر إضافي', description: 'الزبائن يحبون الطعم الحلو!', cost: 50, multiplier: 2, purchased: false },
        { id: 'ls2', name: 'لافتة كبيرة', description: 'تجذب المزيد من العيون (والمحافظ).', cost: 250, multiplier: 2.5, purchased: false },
    ] },
    { id: 'newspaper_route', name: 'توزيع الصحف', description: 'وزّع الأخبار، واجمع النقود.', level: 0, baseCost: 100, incomePerSecond: 1, clickPower: 0.5, icon: <NewspaperIcon />, locationId: 'new_york', upgrades: [
        { id: 'nr1', name: 'دراجة أسرع', description: 'توصيل المزيد من الصحف في وقت أقل.', cost: 500, multiplier: 2, purchased: false },
        { id: 'nr2', name: 'عناوين حصرية', description: 'الجميع يريد معرفة آخر الأخبار.', cost: 2000, multiplier: 3, purchased: false },
    ] },
    { id: 'car_wash', name: 'غسيل سيارات', description: 'سيارات نظيفة، أموال وفيرة.', level: 0, baseCost: 1200, incomePerSecond: 10, clickPower: 1, icon: <CarWashIcon />, locationId: 'new_york', upgrades: [
        { id: 'cw1', name: 'صابون فاخر', description: 'لمعان إضافي يعني سعراً إضافياً.', cost: 6000, multiplier: 2, purchased: false },
        { id: 'cw2', name: 'فرش آلية', description: 'زيادة الكفاءة بشكل كبير.', cost: 25000, multiplier: 2.5, purchased: false },
    ] },
    { id: 'pizza_place', name: 'مطعم بيتزا', description: 'الجميع يحب البيتزا!', level: 0, baseCost: 15000, incomePerSecond: 80, clickPower: 5, icon: <PizzaIcon />, locationId: 'new_york', upgrades: [
        { id: 'pp1', name: 'فرن حجري', description: 'طعم لا يقاوم.', cost: 75000, multiplier: 2, purchased: false },
        { id: 'pp2', name: 'خدمة توصيل', description: 'توسيع قاعدة العملاء.', cost: 300000, multiplier: 3, purchased: false },
    ] },
    { id: 'organic_farm', name: 'مزرعة عضوية', description: 'طعام صحي لسوق واعية.', level: 0, baseCost: 60000, incomePerSecond: 320, clickPower: 15, icon: <LemonadeStandIcon />, locationId: 'new_york', upgrades: [
        { id: 'of1', name: 'نظام ري متطور', description: 'محاصيل أكثر، مياه أقل.', cost: 300000, multiplier: 2, purchased: false },
        { id: 'of2', name: 'عقد مع سلسلة متاجر كبرى', description: 'توزيع مضمون في جميع أنحاء البلاد.', cost: 1200000, multiplier: 3, purchased: false },
    ]},
    { id: 'food_truck_festival', name: 'مهرجان شاحنات الطعام', description: 'مجموعة متنوعة من النكهات في مكان واحد.', level: 0, baseCost: 80000, incomePerSecond: 450, clickPower: 20, icon: <PizzaIcon />, locationId: 'new_york', upgrades: [
      { id: 'ftf1', name: 'تصاريح مميزة', description: 'الوصول إلى أفضل المواقع في المدينة.', cost: 400000, multiplier: 2, purchased: false },
      { id: 'ftf2', name: 'طهاة مشهورون', description: 'جذب عشاق الطعام من كل مكان.', cost: 1500000, multiplier: 3, purchased: false },
    ]},
    { id: 'software_startup', name: 'شركة برمجيات', description: 'شق طريقك إلى الثراء بالبرمجة.', level: 0, baseCost: 200000, incomePerSecond: 500, clickPower: 25, icon: <SoftwareIcon />, locationId: 'new_york', upgrades: [
        { id: 'ss1', name: 'توظيف مبرمجين خبراء', description: 'كود أفضل، منتجات أسرع.', cost: 1000000, multiplier: 2, purchased: false },
        { id: 'ss2', name: 'إطلاق تطبيق ناجح', description: 'يصبح حديث المدينة.', cost: 5000000, multiplier: 4, purchased: false },
    ] },
    { id: 'podcast_network', name: 'شبكة بودكاست', description: 'إنشاء محتوى صوتي جذاب للملايين.', level: 0, baseCost: 250000, incomePerSecond: 1300, clickPower: 60, icon: <NewspaperIcon />, locationId: 'new_york', upgrades: [
        { id: 'pn1', name: 'استوديو عالي الجودة', description: 'صوت نقي واحترافي.', cost: 1200000, multiplier: 2, purchased: false },
        { id: 'pn2', name: 'صفقات إعلانية حصرية', description: 'رعاة كبار يدفعون مبالغ طائلة.', cost: 6000000, multiplier: 3.5, purchased: false },
    ]},
    { id: 'game_studio', name: 'استوديو ألعاب', description: 'إنشاء ألعاب فيديو تسبب الإدمان.', level: 0, baseCost: 350000, incomePerSecond: 1800, clickPower: 90, icon: <SoftwareIcon />, locationId: 'new_york', upgrades: [
        { id: 'gs1', name: 'محرك ألعاب خاص', description: 'رسومات أفضل وأداء أسرع.', cost: 1800000, multiplier: 2, purchased: false },
        { id: 'gs2', name: 'لعبة عالمية ناجحة', description: 'ملايين اللاعبين حول العالم.', cost: 8000000, multiplier: 3.5, purchased: false },
    ]},
    { id: 'art_gallery', name: 'معرض فني', description: 'بيع الفن المعاصر لهواة الجمع الأثرياء.', level: 0, baseCost: 500000, incomePerSecond: 2500, clickPower: 120, icon: <NewspaperIcon />, locationId: 'new_york', upgrades: [
      { id: 'ag1', name: 'فنان حصري', description: 'توقيع عقد مع فنان صاعد ومشهور.', cost: 2500000, multiplier: 2.5, purchased: false },
      { id: 'ag2', name: 'مزاد دولي', description: 'الوصول إلى مشترين عالميين.', cost: 10000000, multiplier: 4, purchased: false },
    ]},
    { id: 'space_agency', name: 'وكالة فضاء', description: 'إلى القمر!', level: 0, baseCost: 5000000, incomePerSecond: 10000, clickPower: 100, icon: <RocketIcon />, locationId: 'new_york', upgrades: [
        { id: 'sa1', name: 'عقد مع ناسا', description: 'تمويل ضخم ومصداقية.', cost: 25000000, multiplier: 3, purchased: false },
        { id: 'sa2', name: 'صواريخ قابلة لإعادة الاستخدام', description: 'تقليل التكاليف بشكل هائل.', cost: 100000000, multiplier: 5, purchased: false },
    ]},
    { id: 'space_tourism', name: 'شركة سياحة فضائية', description: 'رحلات إلى حافة الفضاء للأثرياء.', level: 0, baseCost: 100000000, incomePerSecond: 400000, clickPower: 15000, icon: <RocketIcon />, locationId: 'new_york', upgrades: [
        { id: 'st1', name: 'مركبة فضائية قابلة لإعادة الاستخدام', description: 'تقليل تكاليف الإطلاق بشكل كبير.', cost: 500000000, multiplier: 3, purchased: false },
        { id: 'st2', name: 'فندق مداري', description: 'وجهة الإجازة النهائية.', cost: 2000000000, multiplier: 5, purchased: false },
    ]},
    { id: 'cloud_service', name: 'خدمة الحوسبة السحابية', description: 'تأجير خوادم للشركات في جميع أنحاء العالم.', level: 0, baseCost: 250000000, incomePerSecond: 1000000, clickPower: 40000, icon: <SoftwareIcon />, locationId: 'new_york', upgrades: [
        { id: 'cs1', name: 'مراكز بيانات عالمية', description: 'تقليل زمن الوصول وزيادة الموثوقية.', cost: 1200000000, multiplier: 2.5, purchased: false },
        { id: 'cs2', name: 'عقود حكومية ضخمة', description: 'تأمين بيانات دول بأكملها.', cost: 5000000000, multiplier: 4, purchased: false },
    ]},
    { id: 'quantum_lab', name: 'مختبر الحوسبة الكمومية', description: 'حل المشاكل التي لا يستطيع حلها أقوى الحواسيب.', level: 0, baseCost: 1000000000, incomePerSecond: 3500000, clickPower: 150000, icon: <SoftwareIcon />, locationId: 'new_york', upgrades: [
        { id: 'ql1', name: 'معالج كمومي مستقر', description: 'تحقيق اختراق علمي كبير.', cost: 5000000000, multiplier: 3, purchased: false },
        { id: 'ql2', name: 'بيع الخدمات لشركات الأدوية', description: 'تسريع اكتشاف الأدوية الجديدة.', cost: 20000000000, multiplier: 5, purchased: false },
    ]},
    { id: 'asteroid_mining', name: 'شركة تعدين الكويكبات', description: 'جلب المعادن النادرة من الفضاء.', level: 0, baseCost: 50000000000, incomePerSecond: 150000000, clickPower: 5000000, icon: <RocketIcon />, locationId: 'new_york', upgrades: [
        { id: 'am1', name: 'أسطول من مسابير التعدين', description: 'زيادة حجم العمليات بشكل كبير.', cost: 250000000000, multiplier: 4, purchased: false },
        { id: 'am2', name: 'حقوق حصرية على حزام الكويكبات', description: 'احتكار أغنى الموارد في النظام الشمسي.', cost: 1000000000000, multiplier: 8, purchased: false },
    ]},
    
    // Tokyo Businesses
    { id: 'sushi_bar', name: 'مطعم سوشي', description: 'أرز وسمك، لذيذ جداً.', level: 0, baseCost: 25000, incomePerSecond: 150, clickPower: 10, icon: <PizzaIcon />, locationId: 'tokyo', upgrades: [
        { id: 'sb1', name: 'شيف سوشي محترف', description: 'فن في كل قطعة.', cost: 120000, multiplier: 2, purchased: false },
        { id: 'sb2', name: 'توريد سمك تونا فاخر', description: 'طعم يذوب في الفم.', cost: 500000, multiplier: 2.5, purchased: false },
    ] },
    { id: 'manga_cafe', name: 'مقهى مانجا', description: 'قصص مصورة ومشروبات.', level: 0, baseCost: 150000, incomePerSecond: 800, clickPower: 40, icon: <NewspaperIcon />, locationId: 'tokyo', upgrades: [
        { id: 'mc1', name: 'مكتبة نادرة', description: 'مجموعات حصرية تجذب المهووسين.', cost: 700000, multiplier: 2, purchased: false },
        { id: 'mc2', name: 'فعاليات لقاء المؤلفين', description: 'جذب حشود كبيرة.', cost: 3000000, multiplier: 3, purchased: false },
    ] },
    { id: 'vr_arcade', name: 'صالة ألعاب واقع افتراضي', description: 'عوالم جديدة بانتظار اللاعبين.', level: 0, baseCost: 750000, incomePerSecond: 4000, clickPower: 180, icon: <SoftwareIcon />, locationId: 'tokyo', upgrades: [
      { id: 'vra1', name: 'أجهزة محاكاة كاملة', description: 'تجربة غامرة لا مثيل لها.', cost: 3500000, multiplier: 2, purchased: false },
      { id: 'vra2', name: 'بطولات حصرية', description: 'جذب أفضل اللاعبين والمشاهدين.', cost: 15000000, multiplier: 3.5, purchased: false },
    ]},
    { id: 'tech_lab', name: 'مختبر تقني', description: 'ابتكارات المستقبل.', level: 0, baseCost: 1000000, incomePerSecond: 5000, clickPower: 200, icon: <SoftwareIcon />, locationId: 'tokyo', upgrades: [
        { id: 'tl1', name: 'براءات اختراع', description: 'تحويل الأفكار إلى أصول قيمة.', cost: 5000000, multiplier: 2.5, purchased: false },
        { id: 'tl2', name: 'عقد حكومي', description: 'تمويل كبير لمشاريع بحثية.', cost: 20000000, multiplier: 4, purchased: false },
    ] },
    { id: 'ai_consultant', name: 'استشاري ذكاء اصطناعي', description: 'مساعدة الشركات على الأتمتة والتحسين.', level: 0, baseCost: 5000000, incomePerSecond: 25000, clickPower: 1200, icon: <SoftwareIcon />, locationId: 'tokyo', upgrades: [
        { id: 'aic1', name: 'نموذج لغوي خاص', description: 'حلول مخصصة فائقة القوة.', cost: 25000000, multiplier: 2.5, purchased: false },
        { id: 'aic2', name: 'شراكة مع عمالقة التكنولوجيا', description: 'الوصول إلى أحدث الأبحاث.', cost: 100000000, multiplier: 4, purchased: false },
    ]},
    { id: 'robotics_factory', name: 'مصنع روبوتات', description: 'بناء مستقبل الأتمتة.', level: 0, baseCost: 12000000, incomePerSecond: 50000, clickPower: 2000, icon: <RocketIcon />, locationId: 'tokyo', upgrades: [
      { id: 'rf1', name: 'ذراع تجميع آلي', description: 'زيادة سرعة الإنتاج.', cost: 60000000, multiplier: 2.5, purchased: false },
      { id: 'rf2', name: 'عقد ذكاء اصطناعي', description: 'تطوير روبوتات أكثر ذكاءً.', cost: 250000000, multiplier: 4, purchased: false },
    ]},
    { id: 'biotech_lab', name: 'مختبر تكنولوجيا حيوية', description: 'تطوير علاجات وأدوية مبتكرة.', level: 0, baseCost: 75000000, incomePerSecond: 300000, clickPower: 12000, icon: <SoftwareIcon />, locationId: 'tokyo', upgrades: [
        { id: 'bl1', name: 'تقنية كريسبر', description: 'تسريع وتيرة البحث بشكل كبير.', cost: 350000000, multiplier: 2.5, purchased: false },
        { id: 'bl2', name: 'علاج معتمد من إدارة الغذاء والدواء', description: 'إيرادات ضخمة من دواء ناجح.', cost: 1500000000, multiplier: 4, purchased: false },
    ]},
    { id: 'capsule_hotel', name: 'فندق كبسولة', description: 'إقامة مدمجة وفعالة للمسافرين.', level: 0, baseCost: 450000, incomePerSecond: 2200, clickPower: 100, icon: <BusinessIcon />, locationId: 'tokyo', upgrades: [
        { id: 'ch1', name: 'كبسولات فاخرة', description: 'مساحة أكبر وميزات ذكية.', cost: 2200000, multiplier: 2, purchased: false },
        { id: 'ch2', name: 'عقود مع شركات الطيران', description: 'معدل إشغال مضمون من المسافرين.', cost: 9000000, multiplier: 3, purchased: false },
    ]},
    { id: 'anime_studio', name: 'استوديو أنمي', description: 'إنتاج مسلسلات وأفلام الرسوم المتحركة الشهيرة.', level: 0, baseCost: 15000000, incomePerSecond: 70000, clickPower: 3000, icon: <SoftwareIcon />, locationId: 'tokyo', upgrades: [
        { id: 'as1', name: 'مخرج أسطوري', description: 'جذب المواهب والمعجبين.', cost: 75000000, multiplier: 2.5, purchased: false },
        { id: 'as2', name: 'صفقة بث عالمية', description: 'عرض أعمالك لملايين المشاهدين.', cost: 300000000, multiplier: 4, purchased: false },
    ]},

    // London Businesses
    { id: 'tea_house', name: 'مقهى شاي فاخر', description: 'أفضل أنواع الشاي والكعك في المدينة.', level: 0, baseCost: 40000, incomePerSecond: 200, clickPower: 15, icon: <PizzaIcon />, locationId: 'london', upgrades: [
      { id: 'th1', name: 'خلطات شاي حصرية', description: 'استيراد أوراق شاي نادرة.', cost: 200000, multiplier: 2, purchased: false },
      { id: 'th2', name: 'شاي بعد الظهيرة الملكي', description: 'جذب السياح والطبقة الراقية.', cost: 800000, multiplier: 2.5, purchased: false },
    ]},
    { id: 'fashion_boutique', name: 'بوتيك أزياء', description: 'تحديد صيحات الموضة في العاصمة.', level: 0, baseCost: 600000, incomePerSecond: 3000, clickPower: 150, icon: <BusinessIcon />, locationId: 'london', upgrades: [
      { id: 'fb1', name: 'مصمم شهير', description: 'التعاون مع اسم كبير في عالم الموضة.', cost: 3000000, multiplier: 2.5, purchased: false },
      { id: 'fb2', name: 'أسبوع الموضة في لندن', description: 'عرض مجموعتك على المسرح العالمي.', cost: 12000000, multiplier: 4, purchased: false },
    ]},
    { id: 'music_studio', name: 'استوديو موسيقي', description: 'تسجيل الأغاني الناجحة لنجوم البوب.', level: 0, baseCost: 900000, incomePerSecond: 4800, clickPower: 220, icon: <RocketIcon />, locationId: 'london', upgrades: [
      { id: 'ms1', name: 'منتج حائز على جوائز', description: 'صوت مميز يضمن النجاح.', cost: 4500000, multiplier: 2, purchased: false },
      { id: 'ms2', name: 'ملكية حقوق النشر', description: 'كسب المال من كل مرة يتم فيها تشغيل الأغنية.', cost: 20000000, multiplier: 3.5, purchased: false },
    ]},
    { id: 'drone_delivery', name: 'خدمة توصيل بالدرون', description: 'تسليم سريع وفعال من السماء.', level: 0, baseCost: 2000000, incomePerSecond: 9500, clickPower: 450, icon: <RocketIcon />, locationId: 'london', upgrades: [
        { id: 'dd1', name: 'أسطول درون محسن', description: 'سرعة أكبر وحمولة أثقل.', cost: 10000000, multiplier: 2, purchased: false },
        { id: 'dd2', name: 'تصريح طيران وطني', description: 'التوسع إلى مدن جديدة.', cost: 45000000, multiplier: 3, purchased: false },
    ]},
    { id: 'financial_consulting', name: 'شركة استشارات مالية', description: 'مساعدة الشركات على تحقيق أرباح أكبر.', level: 0, baseCost: 2500000, incomePerSecond: 12000, clickPower: 500, icon: <SoftwareIcon />, locationId: 'london', upgrades: [
      { id: 'fc1', name: 'برنامج تحليل بيانات', description: 'تنبؤات دقيقة للسوق.', cost: 12000000, multiplier: 2, purchased: false },
      { id: 'fc2', name: 'عملاء من الشركات الكبرى', description: 'عقود مربحة طويلة الأجل.', cost: 50000000, multiplier: 3, purchased: false },
    ]},
    { id: 'private_bank', name: 'بنك خاص', description: 'إدارة ثروات أغنى أغنياء العالم.', level: 0, baseCost: 85000000, incomePerSecond: 380000, clickPower: 14000, icon: <BusinessIcon />, locationId: 'london', upgrades: [
        { id: 'pb1', name: 'خزنة آمنة للغاية', description: 'أقصى درجات الأمان تجذب كبار العملاء.', cost: 400000000, multiplier: 2.5, purchased: false },
        { id: 'pb2', name: 'قسم الاستثمار الدولي', description: 'مضاعفة أموال العملاء (وأرباحك).', cost: 1800000000, multiplier: 4, purchased: false },
    ]},
    { id: 'esports_team', name: 'فريق رياضات إلكترونية', description: 'الفوز بالبطولات العالمية الكبرى.', level: 0, baseCost: 4000000, incomePerSecond: 19000, clickPower: 800, icon: <SoftwareIcon />, locationId: 'london', upgrades: [
        { id: 'et1', name: 'مركز تدريب متطور', description: 'تحويل اللاعبين الموهوبين إلى أبطال.', cost: 20000000, multiplier: 2, purchased: false },
        { id: 'et2', name: 'عقود رعاية ضخمة', description: 'علامات تجارية كبرى تدفع لرؤية اسمها على قمصانك.', cost: 80000000, multiplier: 3.5, purchased: false },
    ]},
];

export const ALL_BUSINESSES: Business[] = rawBusinesses.sort((a, b) => a.baseCost - b.baseCost);

export const INITIAL_STOCKS: Stock[] = [
    { id: 'techcorp', name: 'TechCorp', price: 150, history: [150] },
    { id: 'foodies', name: 'Foodies United', price: 80, history: [80] },
    { id: 'ecopower', name: 'EcoPower Inc.', price: 220, history: [220] },
    { id: 'globocars', name: 'GloboCars', price: 55, history: [55] },
];

export const INITIAL_EMPLOYEES: Employee[] = [
    { id: 'intern', name: 'متدرب', description: 'يقوم بالأعمال الصغيرة ويزيد دخلك قليلاً.', level: 0, baseCost: 50, mpsBoost: 0.2, mpcBoost: 0 },
    { id: 'marketer', name: 'مسوّق', description: 'يجذب المزيد من العملاء بنقراتك.', level: 0, baseCost: 500, mpsBoost: 0, mpcBoost: 2 },
    { id: 'manager', name: 'مدير', description: 'يحسّن كفاءة العمل ويزيد الدخل التلقائي.', level: 0, baseCost: 2000, mpsBoost: 10, mpcBoost: 0 },
    { id: 'engineer', name: 'مهندس', description: 'يطوّر منتجاتك لزيادة الدخل والنقرات.', level: 0, baseCost: 10000, mpsBoost: 25, mpcBoost: 10 },
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
    { id: 'first_dollar', name: 'الدولار الأول', description: 'اكسب أول دولار لك', unlocked: false, condition: (state: GameState) => state.money >= 1 },
    { id: 'grand', name: 'الألف الأولى', description: 'اجمع 1,000 دولار', unlocked: false, condition: (state: GameState) => state.money >= 1000 },
    { id: 'millionaire', name: 'مليونير', description: 'اجمع مليون دولار', unlocked: false, condition: (state: GameState) => state.money >= 1000000 },
    { id: 'first_business', name: 'رائد أعمال', description: 'اشترِ أول مشروع لك', unlocked: false, condition: (state: GameState) => state.businesses.some(b => b.level > 0) },
    { id: 'tycoon', name: 'قطب أعمال', description: 'امتلك كل أنواع المشاريع', unlocked: false, condition: (state: GameState) => state.businesses.every(b => b.level > 0) },
    { id: 'investor', name: 'مستثمر مبتدئ', description: 'اشترِ أول سهم لك', unlocked: false, condition: (state: GameState) => state.playerStocks.some(s => s.shares > 0) },
];

type NewsEventTemplate = Omit<NewsEvent, 'id' | 'timestamp' | 'expires'> & { duration: number };

export const NEWS_EVENT_TEMPLATES: NewsEventTemplate[] = [
    { headline: 'طفرة تكنولوجية! أسهم شركات البرمجيات ترتفع!', duration: 60000, effect: { type: 'business_income_modifier', payload: { businessId: 'software_startup', multiplier: 2 }}},
    { headline: 'موسم سياحي قوي! مطاعم البيتزا تشهد إقبالاً كبيراً.', duration: 45000, effect: { type: 'business_income_modifier', payload: { businessId: 'pizza_place', multiplier: 1.5 }}},
];

export const AVAILABLE_LOANS: Loan[] = [
    { id: 'starter', name: 'قرض البداية', amount: 500, interest: 100, termSeconds: 60, requiredAssets: 0 },
    { id: 'expansion', name: 'قرض التوسع', amount: 10000, interest: 2500, termSeconds: 120, requiredAssets: 5000 },
    { id: 'mogul', name: 'قرض الحوت', amount: 100000, interest: 30000, termSeconds: 300, requiredAssets: 50000 },
];

export const MARKETING_CAMPAIGNS: Campaign[] = [
    { id: 'social_media', name: 'حملة تواصل اجتماعي', description: 'تزيد الدخل من النقرات 2x لمدة دقيقة', cost: 1000, duration: 60000, effect: { type: 'global_mpc_multiplier', multiplier: 2 }},
    { id: 'tv_ad', name: 'إعلان تلفزيوني', description: 'يزيد الدخل لكل ثانية 1.5x لمدة 5 دقائق', cost: 25000, duration: 300000, effect: { type: 'global_mps_multiplier', multiplier: 1.5 }},
    { id: 'global_blitz', name: 'حملة عالمية', description: 'تضاعف كل شيء! (2x) لمدة دقيقتين', cost: 100000, duration: 120000, effect: { type: 'global_mps_multiplier', multiplier: 2 }},
];

const rawRealEstate: RealEstateProperty[] = [
    { id: 'apartment', name: 'شقة استوديو', level: 0, cost: 50000, incomePerSecond: 100, upgrades: [
        { id: 'ap1', name: 'أثاث حديث', description: 'زيادة قيمة الإيجار.', cost: 25000, multiplier: 1.5, purchased: false },
        { id: 'ap2', name: 'شرفة بإطلالة', description: 'المستأجرون يدفعون أكثر مقابل الإطلالة.', cost: 75000, multiplier: 2, purchased: false },
    ]},
    { id: 'villa', name: 'فيلا فاخرة', level: 0, cost: 250000, incomePerSecond: 600, upgrades: [
        { id: 'vi1', name: 'حمام سباحة خاص', description: 'عنصر جذب أساسي للأثرياء.', cost: 125000, multiplier: 1.8, purchased: false },
        { id: 'vi2', name: 'سينما منزلية', description: 'رفاهية لا مثيل لها.', cost: 500000, multiplier: 2.2, purchased: false },
    ]},
    { id: 'mountain_cabin', name: 'شاليه جبلي', level: 0, cost: 400000, incomePerSecond: 900, upgrades: [
      { id: 'mc1_re', name: 'مدفأة حجرية', description: 'أجواء دافئة ومريحة.', cost: 200000, multiplier: 1.6, purchased: false },
      { id: 'mc2_re', name: 'منتجع صحي خاص', description: 'الاسترخاء في قلب الطبيعة.', cost: 800000, multiplier: 2, purchased: false },
    ]},
    { id: 'beach_house', name: 'منزل على الشاطئ', level: 0, cost: 750000, incomePerSecond: 1500, upgrades: [
      { id: 'bh1', name: 'وصول خاص للشاطئ', description: 'الخصوصية تساوي المال.', cost: 350000, multiplier: 1.7, purchased: false },
      { id: 'bh2', name: 'مرسى لليخوت', description: 'جذب أصحاب اليخوت الأثرياء.', cost: 1500000, multiplier: 2.5, purchased: false },
    ]},
    { id: 'skyscraper', name: 'ناطحة سحاب', level: 0, cost: 2000000, incomePerSecond: 4000, upgrades: [
        { id: 'ss1_re', name: 'مهبط طائرات هليكوبتر', description: 'للمديرين التنفيذيين المشغولين.', cost: 1000000, multiplier: 2, purchased: false },
        { id: 'ss2_re', name: 'مكاتب تجارية فاخرة', description: 'تأجير طوابق كاملة للشركات الكبرى.', cost: 8000000, multiplier: 3, purchased: false },
    ]},
    { id: 'eco_dome', name: 'قبة بيئية', level: 0, cost: 3000000, incomePerSecond: 6500, upgrades: [
        { id: 'ed1', name: 'الألواح الشمسية', description: 'اكتفاء ذاتي من الطاقة.', cost: 1500000, multiplier: 1.8, purchased: false },
        { id: 'ed2', name: 'نظام إعادة تدوير المياه', description: 'استدامة تزيد من القيمة.', cost: 6000000, multiplier: 2.2, purchased: false },
    ]},
    { id: 'penthouse', name: 'بنتهاوس', level: 0, cost: 5000000, incomePerSecond: 10000, upgrades: [
      { id: 'ph1', name: 'تراس على السطح', description: 'حفلات وإطلالات بانورامية.', cost: 2500000, multiplier: 2, purchased: false },
      { id: 'ph2', name: 'خدمة كونسيرج 24/7', description: 'تلبية كل نزوات المستأجرين.', cost: 10000000, multiplier: 2.8, purchased: false },
    ]},
    { id: 'vineyard_estate', name: 'ضيعة عنب', level: 0, cost: 8000000, incomePerSecond: 18000, upgrades: [
      { id: 've1', name: 'قبو نبيذ حديث', description: 'إنتاج نبيذ حائز على جوائز.', cost: 4000000, multiplier: 2.2, purchased: false },
      { id: 've2', name: 'جولات تذوق حصرية', description: 'مصدر دخل إضافي كبير.', cost: 15000000, multiplier: 2.8, purchased: false },
    ]},
    { id: 'underground_bunker', name: 'ملجأ تحت الأرض', level: 0, cost: 10000000, incomePerSecond: 20000, upgrades: [
      { id: 'ub1', name: 'نظام تنقية هواء متطور', description: 'البقاء على قيد الحياة بأناقة.', cost: 5000000, multiplier: 1.8, purchased: false },
      { id: 'ub2', name: 'مخزون طعام فاخر لمدة عام', description: 'لا حاجة للتضحية بالذوق.', cost: 20000000, multiplier: 2.5, purchased: false },
    ]},
    { id: 'historic_castle', name: 'قلعة تاريخية', level: 0, cost: 15000000, incomePerSecond: 35000, upgrades: [
      { id: 'hc1', name: 'ترميم كامل', description: 'استعادة المجد القديم.', cost: 7500000, multiplier: 2, purchased: false },
      { id: 'hc2', name: 'فندق بوتيك فاخر', description: 'تجربة ملكية للسياح الأثرياء.', cost: 50000000, multiplier: 3, purchased: false },
    ]},
    { id: 'private_island', name: 'جزيرة خاصة', level: 0, cost: 25000000, incomePerSecond: 50000, upgrades: [
      { id: 'pi1', name: 'مهبط طائرات خاص', description: 'وصول سهل للمشاهير.', cost: 12000000, multiplier: 2.5, purchased: false },
      { id: 'pi2', name: 'منتجع فاخر متكامل', description: 'جنة على الأرض.', cost: 100000000, multiplier: 4, purchased: false },
    ]},
    { id: 'ski_resort', name: 'منتجع تزلج', level: 0, cost: 40000000, incomePerSecond: 90000, upgrades: [
      { id: 'sr1', name: 'مصاعد تزلج عالية السرعة', description: 'المزيد من التزلج، وقت انتظار أقل.', cost: 20000000, multiplier: 2, purchased: false },
      { id: 'sr2', name: 'شاليهات فاخرة على المنحدرات', description: 'إقامة مميزة للمتزلجين.', cost: 80000000, multiplier: 3, purchased: false },
    ]},
    { id: 'luxury_yacht', name: 'يخت فاخر', level: 0, cost: 60000000, incomePerSecond: 150000, upgrades: [
        { id: 'ly1', name: 'طاقم كامل', description: 'خدمة خمس نجوم في عرض البحر.', cost: 30000000, multiplier: 2, purchased: false },
        { id: 'ly2', name: 'تأجير للمشاهير', description: 'إيجارات بمبالغ فلكية.', cost: 120000000, multiplier: 3, purchased: false },
    ]},
    { id: 'theme_park', name: 'متنزه', level: 0, cost: 150000000, incomePerSecond: 400000, upgrades: [
        { id: 'tp1', name: 'أفعوانية قياسية', description: 'تجذب الباحثين عن الإثارة من جميع أنحاء العالم.', cost: 75000000, multiplier: 2.5, purchased: false },
        { id: 'tp2', name: 'عقود أفلام', description: 'ألعاب ومناطق جذب مبنية على أفلام شهيرة.', cost: 300000000, multiplier: 4, purchased: false },
    ]},
    { id: 'sports_stadium', name: 'ملعب رياضي', level: 0, cost: 300000000, incomePerSecond: 800000, upgrades: [
        { id: 'ss_re1', name: 'استضافة نهائي كبير', description: 'حقوق بث وإيرادات تذاكر ضخمة.', cost: 150000000, multiplier: 3, purchased: false },
        { id: 'ss_re2', name: 'حقوق تسمية', description: 'شركة كبرى تدفع الملايين لوضع اسمها على الملعب.', cost: 600000000, multiplier: 5, purchased: false },
    ]},
    { id: 'oil_rig', name: 'منصة نفط بحرية', level: 0, cost: 700000000, incomePerSecond: 1800000, upgrades: [
        { id: 'or1', name: 'تقنية حفر متطورة', description: 'الوصول إلى احتياطيات نفط أعمق.', cost: 350000000, multiplier: 2.8, purchased: false },
        { id: 'or2', name: 'خط أنابيب مباشر', description: 'تقليل تكاليف النقل وزيادة الأرباح.', cost: 1500000000, multiplier: 4.5, purchased: false },
    ]},
    { id: 'moon_base', name: 'قاعدة على سطح القمر', level: 0, cost: 1000000000, incomePerSecond: 2000000, upgrades: [
        { id: 'mb1', name: 'مرصد فلكي', description: 'إيجار للوكالات الفضائية.', cost: 500000000, multiplier: 2.5, purchased: false },
        { id: 'mb2', name: 'منجم هيليوم-3', description: 'توفير وقود المستقبل.', cost: 5000000000, multiplier: 5, purchased: false },
    ]},
    { id: 'underwater_hotel', name: 'فندق تحت الماء', level: 0, cost: 450000000, incomePerSecond: 1200000, upgrades: [
        { id: 'uh1', name: 'جولات بالغواصات', description: 'تجربة فريدة للضيوف الأثرياء.', cost: 220000000, multiplier: 2.5, purchased: false },
        { id: 'uh2', name: 'أجنحة بانورامية', description: 'نوم مع الأسماك (بشكل فاخر).', cost: 900000000, multiplier: 4, purchased: false },
    ]},
    { id: 'volcano_lair', name: 'مخبأ في بركان', level: 0, cost: 800000000, incomePerSecond: 2200000, upgrades: [
        { id: 'vl1', name: 'طاقة حرارية أرضية', description: 'مصدر طاقة لا ينضب (ومجاني).', cost: 400000000, multiplier: 3, purchased: false },
        { id: 'vl2', name: 'قاعدة إطلاق صواريخ سرية', description: '(لأغراض سلمية، بالطبع).', cost: 2000000000, multiplier: 5, purchased: false },
    ]},
    { id: 'space_elevator', name: 'مصعد فضائي', level: 0, cost: 20000000000, incomePerSecond: 50000000, upgrades: [
        { id: 'se1', name: 'سبيكة نانو كربونية', description: 'كابل أقوى وأخف وزنًا.', cost: 10000000000, multiplier: 4, purchased: false },
        { id: 'se2', name: 'عقد نقل حصري', description: 'الكل يدفع لك للوصول إلى المدار.', cost: 80000000000, multiplier: 8, purchased: false },
    ]},
];

export const REAL_ESTATE_PROPERTIES: RealEstateProperty[] = rawRealEstate.sort((a, b) => a.cost - b.cost);

export const AVAILABLE_CARS: Car[] = [
    { id: 'sedan', name: 'سيارة سيدان', cost: 20000, effect: { type: 'global_mps_multiplier', multiplier: 1.05 }},
    { id: 'delivery_truck', name: 'شاحنة توصيل', cost: 75000, effect: { type: 'global_mps_multiplier', multiplier: 1.10 }},
    { id: 'sports_car', name: 'سيارة رياضية', cost: 300000, effect: { type: 'global_mps_multiplier', multiplier: 1.15 }},
    { id: 'limousine', name: 'سيارة ليموزين', cost: 800000, effect: { type: 'global_mps_multiplier', multiplier: 1.20 }},
    { id: 'monster_truck', name: 'شاحنة عملاقة', cost: 1500000, effect: { type: 'global_mps_multiplier', multiplier: 1.25 }},
    { id: 'electric_supercar', name: 'سيارة خارقة كهربائية', cost: 5000000, effect: { type: 'global_mps_multiplier', multiplier: 1.30 }},
    { id: 'private_jet', name: 'طائرة خاصة', cost: 20000000, effect: { type: 'global_mps_multiplier', multiplier: 1.40 }},
    { id: 'helicopter', name: 'طائرة هليكوبتر', cost: 8000000, effect: { type: 'global_mps_multiplier', multiplier: 1.35 }},
    { id: 'armored_limo', name: 'ليموزين مصفحة', cost: 12000000, effect: { type: 'global_mps_multiplier', multiplier: 1.38 }},
    { id: 'hypercar', name: 'سيارة هايبر', cost: 50000000, effect: { type: 'global_mps_multiplier', multiplier: 1.50 }},
    { id: 'superyacht', name: 'يخت عملاق', cost: 150000000, effect: { type: 'global_mps_multiplier', multiplier: 1.65 }},
    { id: 'bullet_train', name: 'قطار طلقة', cost: 400000000, effect: { type: 'global_mps_multiplier', multiplier: 1.80 }},
    { id: 'b_2_bomber', name: 'قاذفة B-2', cost: 1000000000, effect: { type: 'global_mps_multiplier', multiplier: 2.00 }},
    { id: 'space_shuttle', name: 'مكوك فضاء', cost: 5000000000, effect: { type: 'global_mps_multiplier', multiplier: 2.50 }},
    { id: 'flying_car', name: 'سيارة طائرة', cost: 75000000, effect: { type: 'global_mps_multiplier', multiplier: 1.60 }},
    { id: 'submarine', name: 'غواصة شخصية', cost: 25000000, effect: { type: 'global_mps_multiplier', multiplier: 1.45 }},
    { id: 'airship', name: 'منطاد فاخر', cost: 180000000, effect: { type: 'global_mps_multiplier', multiplier: 1.70 }},
    { id: 'formula_1_car', name: 'سيارة فورمولا 1', cost: 90000000, effect: { type: 'global_mps_multiplier', multiplier: 1.62 }},
    { id: 'tank', name: 'دبابة', cost: 60000000, effect: { type: 'global_mps_multiplier', multiplier: 1.55 }},
    { id: 'gold_plated_lambo', name: 'لامبورغيني مطلية بالذهب', cost: 10000000, effect: { type: 'global_mps_multiplier', multiplier: 1.36 }},
    { id: 'hovercraft', name: 'حوامة', cost: 3000000, effect: { type: 'global_mps_multiplier', multiplier: 1.28 }},
];

export const LOCATIONS: Location[] = [
    { id: 'new_york', name: 'نيويورك', travelCost: 0 },
    { id: 'tokyo', name: 'طوكيو', travelCost: 50000 },
    { id: 'london', name: 'لندن', travelCost: 75000 },
];

export const SOCIAL_DEALS: SocialDeal[] = [
    { id: 'investor_tip', npc: 'وارن بافيت المزيف', title: 'نصيحة استثمارية', description: 'يقولون أن التكنولوجيا هي المستقبل! دخلك من المشاريع سيتضاعف لمدة 30 ثانية!', duration: 30000, effect: { type: 'global_mps_multiplier', multiplier: 2 }},
    { id: 'marketing_genius', npc: 'ستيف جوبز المزيف', title: 'عبقري تسويق', description: 'لدي فكرة لحملة إعلانية ستجعل نقراتك أقوى 5 مرات! لمدة دقيقة واحدة فقط.', duration: 60000, effect: { type: 'global_mpc_multiplier', multiplier: 5 }},
];
