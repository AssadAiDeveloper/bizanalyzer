'use client';
// =============================================================
// src/pages/BlogPage.jsx
// Blog page with 10 articles (800+ words each in Arabic)
// =============================================================
import { useState } from "react";
import { ORANGE, DARK, GREEN, BLUE, PURPLE, RED, GOLD } from "../lib/constants.js";
import { PageFooter } from "./SharedComponents.jsx";

export const BLOG_POSTS = [
  {
    id:"kvk-registratie-migranten",
    date:"2025-01-15", readTime:8, image:"🏢", color:ORANGE,
    category:{ ar:"تسجيل الشركات", nl:"KVK Registratie", en:"Business Registration" },
    title:{
      ar:"كيف تسجل شركتك في KVK كمهاجر في هولندا — دليل شامل 2025",
      nl:"KVK inschrijven als buitenlander: stap voor stap gids 2025",
      en:"How to Register Your Business at KVK as a Migrant in the Netherlands 2025"
    },
    excerpt:{
      ar:"كل ما تحتاج معرفته عن تسجيل نشاطك التجاري في هولندا، من اختيار الشكل القانوني حتى الحصول على رقم KVK والبدء الفعلي في العمل.",
      nl:"Alles wat u moet weten over het inschrijven bij de Kamer van Koophandel als buitenlander in Nederland.",
      en:"Everything you need to know about registering your business in the Netherlands as a migrant or foreigner."
    },
    content:{
      ar:`<h2>مقدمة — لماذا KVK؟</h2>
<p>إذا كنت تفكر في بدء مشروعك التجاري في هولندا، فإن التسجيل في KVK (Kamer van Koophandel) هو الخطوة الأولى والأساسية. KVK هي غرفة التجارة الهولندية، وهي الجهة الرسمية الوحيدة المخولة بتسجيل جميع الشركات والنشاطات التجارية في البلاد. بدون رقم KVK، لا يمكنك إصدار فواتير قانونية، ولا التسجيل في نظام الضرائب، ولا التعامل الرسمي مع البنوك والمؤسسات الحكومية.</p>
<p>الخبر الجيد هو أن هولندا تفتح أبوابها للمهاجرين من جميع الجنسيات الراغبين في ممارسة الأعمال التجارية. سواء كنت لاجئاً حصلت على وضع قانوني، أو مقيماً بتصريح عمل، أو مواطناً أوروبياً، فإن حق العمل المستقل مكفول لك بموجب القانون الهولندي.</p>

<h2>من يحق له التسجيل في KVK؟</h2>
<p>يحق لكل شخص يقيم في هولندا بصورة قانونية تسجيل شركته في KVK. وهذا يشمل:</p>
<p><strong>المواطنون الهولنديون والأوروبيون:</strong> يحق لهم العمل والتسجيل التجاري بشكل مباشر دون قيود.</p>
<p><strong>المقيمون بتصريح إقامة (verblijfsvergunning):</strong> يحق لهم التسجيل بشرط أن يتضمن تصريحهم إذناً بالعمل المستقل. تحقق من شروط تصريحك لدى IND (دائرة الهجرة والتجنيس).</p>
<p><strong>حاملو وضع اللاجئ (statushouders):</strong> لهم كامل الحق في ممارسة النشاط التجاري المستقل، تماماً كالمواطنين الهولنديين.</p>
<p><strong>المقيمون بتصريح الإقامة الدائمة:</strong> لهم نفس حقوق المواطنين الأوروبيين في العمل والتجارة.</p>

<h2>الأشكال القانونية للشركات في هولندا</h2>
<p>قبل التسجيل، يجب عليك اختيار الشكل القانوني المناسب لنشاطك التجاري. هذا القرار مهم لأنه يحدد مسؤوليتك القانونية، وكيفية فرض الضرائب عليك، ومتطلبات رأس المال.</p>
<p><strong>Eenmanszaak / ZZP (الملكية الفردية / العمل الحر):</strong> هو الشكل الأبسط والأكثر شيوعاً بين المهاجرين والمستقلين. لا يوجد حد أدنى لرأس المال، ولا تحتاج محامياً أو كاتب عدل. ميزته الكبرى هي السهولة والسرعة في التسجيل. العيب الوحيد هو أنك مسؤول شخصياً عن ديون الشركة، أي أن أصولك الشخصية معرضة للخطر في حالة الإفلاس.</p>
<p><strong>BV (شركة ذات مسؤولية محدودة):</strong> مناسبة إذا كان دخلك المتوقع يتجاوز €100,000 سنوياً، أو إذا كنت تريد حماية أصولك الشخصية. تحتاج على الأقل €0.01 كرأس مال، وتحتاج إلى كاتب عدل لإنشائها. تُفرض عليها ضريبة شركات بدلاً من ضريبة الدخل الشخصي.</p>
<p><strong>VOF (شراكة عامة):</strong> مناسبة إذا كنت ستعمل مع شريك أو أكثر. كل شريك مسؤول بشكل كامل عن ديون الشراكة. لا يوجد حد أدنى لرأس المال.</p>
<p><strong>Stichting (مؤسسة غير ربحية):</strong> مناسبة للأنشطة الاجتماعية والخيرية. لا تهدف للربح، وأرباحها تُستثمر في تحقيق أهداف المؤسسة.</p>

<h2>خطوات التسجيل في KVK — بالتفصيل</h2>
<p><strong>الخطوة الأولى — التحضير والتخطيط:</strong> قبل حجز الموعد، اجمع المعلومات الأساسية عن شركتك. ستحتاج إلى: اسم الشركة (تحقق من توفره على kvk.nl/zoeken)، وصف النشاط التجاري، رمز SBI (كود القطاع الاقتصادي الرسمي)، عنوان الشركة (يمكن أن يكون عنوان منزلك).</p>
<p><strong>الخطوة الثانية — حجز الموعد:</strong> اذهب إلى kvk.nl واحجز موعداً في أقرب مكتب KVK منك. يوجد مكاتب في جميع المدن الهولندية الرئيسية. رسوم التسجيل هي €75.50 (2025). يمكن دفعها بالبطاقة البنكية في المكتب.</p>
<p><strong>الخطوة الثالثة — الوثائق المطلوبة:</strong> احضر معك: جواز سفرك أو بطاقة هويتك السارية، إثبات عنوانك في هولندا (عقد إيجار، فاتورة بنكية، أو شهادة من البلدية)، تصريح الإقامة إذا لم تكن مواطناً أوروبياً.</p>
<p><strong>الخطوة الرابعة — موعد التسجيل:</strong> سيستغرق الموعد حوالي 30-45 دقيقة. ستملأ نموذج التسجيل بمساعدة موظف KVK، وستوقع على وثيقة رسمية. في نهاية الموعد، ستحصل على رقم KVK الخاص بك (8 أرقام).</p>
<p><strong>الخطوة الخامسة — ما بعد التسجيل:</strong> بعد التسجيل في KVK، ستتلقى تلقائياً رقم BTW (ضريبة القيمة المضافة) من Belastingdienst (مصلحة الضرائب) خلال أسبوع إلى أسبوعين. ستتلقى أيضاً دعوة للتسجيل في نظام الضرائب الإلكتروني.</p>

<h2>اختيار اسم الشركة</h2>
<p>اختيار الاسم المناسب لشركتك خطوة مهمة. الاسم يجب أن يكون فريداً ولا يشبه شركة موجودة. يمكنك التحقق من توفر الاسم مجاناً على kvk.nl/zoeken. الاسم يمكن أن يكون بأي لغة، بما في ذلك العربية، لكن يُنصح باختيار اسم سهل النطق باللغة الهولندية لسهولة التواصل مع العملاء المحليين.</p>

<h2>التكاليف المرتبطة بالتسجيل</h2>
<p>التسجيل في KVK يكلف €75.50 مرة واحدة. بعد ذلك، قد تحتاج إلى: محاسب (€50-200/شهر)، تأمين مهني (€20-100/شهر)، برنامج محاسبة (€15-50/شهر). كثير من المبتدئين يستخدمون برامج مجانية في البداية مثل Wave Accounting أو Bokio.</p>

<h2>نصائح مهمة للمهاجرين</h2>
<p>من المهم جداً معرفة أن التسجيل في KVK لا يلغي تلقائياً استحقاقاتك من الخدمات الاجتماعية. إذا كنت تتلقى bijstand (مساعدة اجتماعية)، يجب إبلاغ البلدية قبل بدء نشاطك التجاري. يمكن الجمع بين العمل المستقل والبحث عن عمل في كثير من الحالات، لكن تحقق دائماً من شروطك الخاصة مع Sociale Dienst أو UWV.</p>`,
      nl:`<h2>Wat is de KVK?</h2><p>De Kamer van Koophandel (KVK) is het officiële handelsregister van Nederland. Inschrijving is verplicht voor iedereen die een bedrijf of zelfstandige activiteit wil uitoefenen. Zonder KVK-nummer kunt u geen rechtsgeldige facturen sturen of een zakelijke bankrekening openen.</p><h2>Wie mag zich inschrijven?</h2><p>Iedereen met legaal verblijf in Nederland kan zich inschrijven: EU-burgers, houders van een verblijfsvergunning, en statushouders. Controleer altijd of uw verblijfsvergunning zelfstandig ondernemerschap toestaat bij de IND.</p><h2>Rechtsvormen</h2><p><strong>Eenmanszaak:</strong> Eenvoudigste vorm. Geen minimumkapitaal. U bent persoonlijk aansprakelijk voor schulden.</p><p><strong>BV:</strong> Minimaal €0,01 kapitaal. Beperkte aansprakelijkheid. Geschikt bij omzet boven €100.000/jaar.</p><p><strong>VOF:</strong> Samenwerking met meerdere partners. Alle partners hoofdelijk aansprakelijk.</p><h2>Stappen voor inschrijving</h2><p>1. Bereid uw bedrijfsnaam voor en controleer beschikbaarheid op kvk.nl/zoeken</p><p>2. Maak een afspraak via kvk.nl — kosten €75,50</p><p>3. Neem mee: geldig ID, adresbewijs in Nederland, verblijfsvergunning indien van toepassing</p><p>4. Na inschrijving ontvangt u automatisch een BTW-nummer van de Belastingdienst</p>`,
      en:`<h2>What is the KVK?</h2><p>The Kamer van Koophandel (KVK) is the Dutch Chamber of Commerce and official business register. Registration is mandatory for anyone conducting business in the Netherlands. Without a KVK number, you cannot issue legal invoices or open a business bank account.</p><h2>Who Can Register?</h2><p>Anyone with legal residence in the Netherlands can register: EU citizens, residence permit holders, and status holders (refugees with residence permits). Always check if your residence permit allows self-employment with the IND.</p><h2>Legal Structures</h2><p><strong>Eenmanszaak (Sole Proprietorship):</strong> Simplest structure. No minimum capital. You are personally liable for debts.</p><p><strong>BV (Private Limited Company):</strong> Minimum €0.01 capital. Limited liability. Suitable when revenue exceeds €100,000/year.</p><h2>Registration Steps</h2><p>1. Prepare your business name and check availability at kvk.nl/zoeken</p><p>2. Book an appointment at kvk.nl — cost €75.50</p><p>3. Bring: valid ID, Dutch address proof, residence permit if applicable</p><p>4. After registration, you automatically receive a VAT number from the tax authority</p>`
    }
  },
  {
    id:"zzp-tarieven-nederland",
    date:"2025-01-22", readTime:7, image:"💼", color:PURPLE,
    category:{ ar:"العمل الحر", nl:"ZZP Tarieven", en:"Freelance Rates" },
    title:{
      ar:"أجور المستقلين في هولندا 2025 — كم تطلب كـ ZZP؟",
      nl:"ZZP Tarieven Nederland 2025 — Wat moet je vragen als zzp'er?",
      en:"Freelance Rates Netherlands 2025 — How Much Should You Charge as a ZZP?"
    },
    excerpt:{
      ar:"دليل شامل لأجور المستقلين في هولندا حسب التخصص، مع نصائح عملية لتحديد السعر الصحيح وتجنب الأخطاء الشائعة.",
      nl:"Compleet overzicht van ZZP-tarieven per sector met praktische tips voor het bepalen van uw uurtarief.",
      en:"Complete guide to freelance rates in the Netherlands by specialty, with practical tips for setting the right price."
    },
    content:{
      ar:`<h2>لماذا تحديد السعر الصحيح أمر حاسم؟</h2>
<p>السعر الذي تطلبه كمستقل في هولندا يحدد ليس فقط دخلك، بل أيضاً كيف ينظر إليك العملاء. السعر المنخفض جداً يرسل رسالة خاطئة: يجعل العملاء يشككون في جودة خدمتك وخبرتك. بينما السعر المرتفع جداً دون مبرر يفقدك فرصاً قيمة. الهدف هو إيجاد التوازن الذي يعكس قيمتك الحقيقية ويضمن استدامة نشاطك.</p>
<p>في هولندا، سوق العمل الحر متطور للغاية. الشركات الهولندية معتادة على التعامل مع المستقلين وتقدّر الاحترافية والشفافية في التسعير. لا تخجل من طلب السعر العادل لعملك.</p>

<h2>متوسط أجور المستقلين في هولندا حسب التخصص (2025)</h2>
<p><strong>تكنولوجيا المعلومات والبرمجة:</strong></p>
<p>Full Stack Developer: €65-120/ساعة. هذا المجال شهد نمواً كبيراً خاصة مع تزايد الطلب على المطورين المتخصصين في React, Node.js, وCloud technologies. المطورون ذوو الخبرة 5+ سنوات يطلبون €100-120/ساعة بسهولة.</p>
<p>خبير ذكاء اصطناعي / Machine Learning: €95-175/ساعة. هذا أعلى أجر في السوق حالياً. الطلب يفوق العرض بنسبة 3:1. إذا كان لديك خبرة في Python, TensorFlow, أو PyTorch، فأنت في موقع ممتاز.</p>
<p>متخصص أمن المعلومات (Cybersecurity): €85-155/ساعة. بعد ارتفاع الهجمات الإلكترونية في هولندا بنسبة 40%، الطلب على خبراء الأمن في أعلى مستوياته.</p>
<p>Backend Developer: €70-130/ساعة. المتخصصون في Java, Python, وGo مطلوبون بشكل خاص من الشركات المالية والحكومية.</p>

<p><strong>الخدمات المالية والاستشارية:</strong></p>
<p>محاسب / مستشار ضريبي: €75-130/ساعة. هولندا تعاني من نقص في المحاسبين المؤهلين، والطلب مستمر على مدار العام.</p>
<p>مستشار أعمال: €80-160/ساعة. الشركات التي تريد دخول الأسواق العربية تدفع أكثر للمستشارين ثنائيي اللغة.</p>

<p><strong>التصميم والإبداع:</strong></p>
<p>مصمم UX/UI: €55-105/ساعة. أمستردام مركز التصميم في أوروبا، والطلب على المصممين المتخصصين في Figma وAdobe XD عالٍ.</p>
<p>مصمم جرافيك: €45-85/ساعة. السوق تنافسي أكثر هنا، لكن المتخصصين في هوية الشركات يحصلون على أجور أعلى.</p>

<p><strong>التسويق الرقمي:</strong></p>
<p>متخصص SEO/SEM: €50-95/ساعة. الطلب متوسط إلى عالٍ، خاصة من الشركات الصغيرة والمتوسطة.</p>
<p>مدير وسائل التواصل الاجتماعي: €40-75/ساعة. سوق تنافسي لكن المتخصصين في محتوى عربي لجمهور أوروبي يطلبون أكثر.</p>

<p><strong>الترجمة والخدمات اللغوية:</strong></p>
<p>مترجم عربي-هولندي: €50-90/ساعة. هذا التخصص نادر جداً وأجوره مرتفعة. الطلب يأتي من المحاكم والمستشفيات والشركات التجارية.</p>

<h2>كيف تحسب سعرك الصحيح؟</h2>
<p>الخطأ الشائع هو مقارنة سعرك بالراتب الشهري للموظف فقط. المستقل يتحمل تكاليف إضافية كثيرة: لا يوجد راتب مرضي، لا إجازة مدفوعة، أنت تدفع ضرائبك بالكامل، تكاليف التأمين والمعدات على حسابك.</p>
<p>الصيغة الصحيحة: (الراتب السنوي المطلوب + التكاليف الإضافية) ÷ 1000 ساعة عمل مُدفوعة = سعر الساعة الأساسي. ثم أضف 30% إضافية لتغطية فترات عدم العمل، الإجازات، والمصاريف غير المتوقعة.</p>
<p>مثال: إذا أردت دخلاً صافياً قدره €40,000 سنوياً، ودفع ضرائب €10,000، ومصاريف €5,000 — المجموع €55,000 ÷ 1000 ساعة = €55/ساعة كحد أدنى.</p>

<h2>نصائح للتفاوض على السعر</h2>
<p>ابدأ دائماً بسعر أعلى قليلاً مما تقبل به، لأن العملاء في هولندا كثيراً ما يطلبون تخفيضاً. لا تبرر سعرك كثيراً — قدّمه بثقة. إذا طلب العميل تخفيضاً، اقترح تقليل نطاق العمل بدلاً من تقليل السعر. العملاء الجيدون يدفعون السعر العادل.</p>`,
      nl:`<h2>Gemiddelde ZZP-tarieven per sector (2025)</h2><p><strong>IT en Software:</strong> Full Stack Developer €65-120/uur. AI/ML specialist €95-175/uur. Cybersecurity €85-155/uur.</p><p><strong>Financieel en advies:</strong> Accountant €75-130/uur. Bedrijfsadviseur €80-160/uur.</p><p><strong>Design:</strong> UX/UI Designer €55-105/uur. Grafisch ontwerper €45-85/uur.</p><h2>Hoe bereken je jouw tarief?</h2><p>Formule: (Gewenst jaarsalaris + Kosten) ÷ 1000 factureerbare uren = basis uurtarief. Voeg 30% toe voor perioden zonder opdrachten, vakantie en onverwachte kosten.</p><h2>Onderhandelingstips</h2><p>Begin altijd iets hoger dan u accepteert. Verdedig uw tarief met vertrouwen. Bij verzoek om korting, stel voor het projectscope te verkleinen in plaats van het tarief te verlagen.</p>`,
      en:`<h2>Average Freelance Rates by Sector (2025)</h2><p><strong>IT & Software:</strong> Full Stack Developer €65-120/hour. AI/ML Specialist €95-175/hour. Cybersecurity €85-155/hour.</p><p><strong>Finance & Consulting:</strong> Accountant €75-130/hour. Business Advisor €80-160/hour.</p><p><strong>Design:</strong> UX/UI Designer €55-105/hour. Graphic Designer €45-85/hour.</p><h2>How to Calculate Your Rate</h2><p>Formula: (Desired annual income + Costs) ÷ 1000 billable hours = base hourly rate. Add 30% for non-billable periods, holidays and unexpected expenses.</p><h2>Negotiation Tips</h2><p>Always start slightly higher than your minimum. Present your rate with confidence. If asked for a discount, offer to reduce scope rather than rate.</p>`
    }
  },
  {
    id:"btw-belasting-zzp",
    date:"2025-02-01", readTime:7, image:"💰", color:RED,
    category:{ ar:"ضرائب", nl:"Belastingen", en:"Taxes" },
    title:{
      ar:"ضريبة BTW للمستقلين في هولندا — دليل شامل 2025",
      nl:"BTW voor ZZP'ers — Alles wat je moet weten in 2025",
      en:"VAT (BTW) for Freelancers in the Netherlands — Complete Guide 2025"
    },
    excerpt:{
      ar:"شرح مفصل لضريبة القيمة المضافة في هولندا — كيف تحسبها، متى تدفعها، وكيف تسترد ما دفعت على مصاريفك.",
      nl:"Gedetailleerde uitleg over BTW voor zzp'ers: berekenen, betalen en terugvragen.",
      en:"Detailed explanation of VAT for freelancers: how to calculate, pay and reclaim it."
    },
    content:{
      ar:`<h2>ما هي BTW وكيف تعمل؟</h2>
<p>BTW (Belasting over de Toegevoegde Waarde) هي ضريبة القيمة المضافة الهولندية. النظام بسيط في مبدئه: أنت تجمع الضريبة من عملائك نيابةً عن الحكومة، ثم تدفعها لمصلحة الضرائب (Belastingdienst) في نهاية كل ربع سنة، بعد خصم BTW الذي دفعته أنت على مصاريف شركتك.</p>
<p>المعدلات الحالية في هولندا: المعدل القياسي 21% يُطبق على معظم السلع والخدمات. المعدل المخفض 9% يُطبق على الأغذية، الأدوية، الكتب، والمواصلات العامة. معدل صفر 0% يُطبق على الصادرات خارج الاتحاد الأوروبي والخدمات المقدمة لشركات أوروبية مسجلة في BTW.</p>

<h2>هل أنت ملزم بتحصيل BTW؟</h2>
<p>الإجابة تعتمد على حجم دخلك السنوي. إذا كان دخلك السنوي من النشاط التجاري يتجاوز €20,000، فأنت ملزم قانونياً بالتسجيل في نظام BTW وتحصيلها من عملائك. إذا كان دخلك أقل من €20,000، يمكنك الاستفادة من نظام KOR (Kleineondernemersregeling) الذي يعفيك من تحصيل BTW وتقديم التقارير الفصلية.</p>
<p>تحذير: حتى لو اخترت KOR، فأنت لن تستطيع استرداد BTW الذي دفعته على مصاريف شركتك. لذلك إذا كانت مصاريفك عالية (شراء معدات، برامج، إلخ)، قد يكون التسجيل في BTW العادي أفضل لك مالياً.</p>

<h2>كيف تحسب BTW على فواتيرك</h2>
<p>الحساب بسيط: سعر خدمتك بدون ضريبة (سعر الأساس) × 1.21 = المبلغ الإجمالي للفاتورة. مثال: خدمة بقيمة €1,000 × 1.21 = €1,210 (منها €210 هي BTW). أنت تستلم €1,210 من العميل، تحتفظ بـ €1,000 كدخلك، وتدفع €210 لمصلحة الضرائب.</p>

<h2>كيف تسترد BTW على مصاريفك</h2>
<p>من المزايا الكبرى لتسجيل BTW أنك تستطيع استرداد BTW الذي دفعته على مصاريف شركتك. مثلاً: اشتريت جهاز كمبيوتر بقيمة €1,210 (منها €210 BTW). يمكنك خصم هذا المبلغ من BTW المستحقة على الحكومة. إذا جمعت €500 BTW من عملائك هذا الربع، ودفعت €210 BTW على مصاريفك، فأنت تدفع للحكومة فقط €290.</p>

<h2>التقارير الفصلية (BTW-aangifte)</h2>
<p>كل ربع سنة (يناير-مارس، أبريل-يونيو، يوليو-سبتمبر، أكتوبر-ديسمبر) يجب تقديم تقرير BTW إلكتروني عبر موقع Belastingdienst خلال شهر من انتهاء الربع. مثلاً: تقرير الربع الأول يُقدم قبل 30 أبريل. يمكن تقديمه عبر برامج المحاسبة (Exact, Moneybird, Bokio) أو مباشرة على belastingdienst.nl.</p>

<h2>الأخطاء الشائعة يجب تجنبها</h2>
<p>الخطأ الأول: نسيان إضافة BTW إلى فواتيرك. هذا يعني أنك ستدفع BTW من جيبك الخاص. الخطأ الثاني: عدم الاحتفاظ بفواتير المصاريف. بدون فواتير موثقة، لا يمكنك استرداد BTW. الخطأ الثالث: تأخير تقديم التقارير الفصلية. هولندا تفرض غرامات على التأخير.</p>`,
      nl:`<h2>Hoe werkt BTW?</h2><p>BTW-tarieven in Nederland: 21% standaard, 9% voor voedsel/medicijnen/boeken, 0% voor export. U int BTW van klanten namens de overheid en draagt dit per kwartaal af aan de Belastingdienst, na aftrek van BTW die u zelf betaalde op bedrijfskosten.</p><h2>BTW-plichtig of niet?</h2><p>Bij jaaromzet boven €20.000 bent u BTW-plichtig. Minder? Dan kunt u de KOR aanvragen (vrijstelling). Let op: met KOR kunt u geen BTW terugvragen op kosten.</p><h2>BTW berekenen</h2><p>Uw dienst: €1.000 × 1,21 = €1.210 factuur. De €210 BTW draagt u af aan de Belastingdienst.</p><h2>BTW terugvragen</h2><p>U kunt BTW op zakelijke kosten terugvragen. Computer €1.210: u trekt €210 BTW af van uw afdracht.</p>`,
      en:`<h2>How Does BTW (VAT) Work?</h2><p>Dutch VAT rates: 21% standard, 9% for food/medicines/books, 0% for exports. You collect VAT from clients on behalf of the government and remit it quarterly to the tax authority, minus VAT you paid on business expenses.</p><h2>Are You VAT-Liable?</h2><p>If annual revenue exceeds €20,000, you must register for VAT. Below that, apply for KOR exemption. Note: with KOR, you cannot reclaim VAT on expenses.</p><h2>Calculating VAT</h2><p>Your service: €1,000 × 1.21 = €1,210 invoice. The €210 VAT goes to the tax authority.</p>`
    }
  },
  {
    id:"beste-sectoren-migranten",
    date:"2025-02-10", readTime:9, image:"🏆", color:GOLD,
    category:{ ar:"قطاعات الأعمال", nl:"Beste Sectoren", en:"Best Sectors" },
    title:{
      ar:"أفضل المجالات للمهاجرين في هولندا — قطاعات تزدهر في 2025",
      nl:"Beste sectoren voor migranten-ondernemers in Nederland 2025",
      en:"Best Business Sectors for Migrant Entrepreneurs in the Netherlands 2025"
    },
    excerpt:{
      ar:"تحليل شامل لأكثر القطاعات ربحاً في هولندا مع التركيز على الفرص المتاحة للمهاجرين المقيمين في البلاد.",
      nl:"Analyse van de meest winstgevende sectoren voor migranten-ondernemers in Nederland.",
      en:"Analysis of the most profitable sectors for migrant entrepreneurs in the Netherlands."
    },
    content:{
      ar:`<h2>لماذا هولندا سوق استثنائي؟</h2>
<p>هولندا دولة صغيرة المساحة لكنها عملاق اقتصادي في قلب أوروبا. بعدد سكان يبلغ 17.8 مليون شخص، تحتل المرتبة الخامسة عشرة عالمياً في حجم الاقتصاد، وهي واحدة من أعلى دول العالم في معدل دخل الفرد. روتردام يحتضن أكبر ميناء في أوروبا، وأمستردام تستضيف مقرات شركات عالمية عملاقة مثل ASML، Shell، Unilever، وPhilips.</p>
<p>للمهاجرين تحديداً، هولندا تقدم ميزة فريدة: التنوع الثقافي جزء من هويتها. 20% من السكان من أصول غير هولندية، والشركات الهولندية تقدّر الموظفين والشركاء متعددي اللغات ومتعددي الثقافات.</p>

<h2>أفضل القطاعات للمهاجرين (2025)</h2>
<p><strong>1. تكنولوجيا المعلومات والبرمجة — هامش ربح 28%، نمو 11%:</strong> هولندا تعاني من نقص حاد في المطورين والمهندسين التقنيين. الطلب يفوق العرض بنسبة كبيرة، مما يعني أنك ستجد عملاء بسهولة. ميزة إضافية للمهاجرين: الشركات الهولندية التي تريد التوسع في الأسواق العربية أو الآسيوية تدفع أجوراً أعلى للمطورين ثنائيي اللغات.</p>
<p><strong>2. الترجمة والخدمات اللغوية — هامش ربح 35-50%:</strong> هذا المجال ذهبي للمهاجرين. الترجمة بين العربية والهولندية نادرة جداً، والطلب عليها ضخم من: المحاكم والنيابة العامة، المستشفيات والعيادات، الشركات التجارية، دور النشر، ووكالات الحكومة. المترجمون المعتمدون يحصلون على €60-120/ساعة بسهولة.</p>
<p><strong>3. الطعام والمطاعم — هامش ربح 15-25%:</strong> المطبخ من الشرق الأوسط وأفريقيا يحظى بشعبية متزايدة في هولندا. الهولنديون يحبون تجربة المأكولات الجديدة، ومطاعم الشاورما واللحم المشوي والكسكس والتبولة منتشرة في كل المدن. فرص النجاح عالية إذا كان الطعام طازجاً وعالي الجودة.</p>
<p><strong>4. الاستيراد والتصدير — هامش ربح 10-20%:</strong> هولندا بوابة أوروبا للعالم. الشركات التي تربط هولندا بالأسواق العربية والأفريقية تجني أرباحاً كبيرة. المهاجرون يملكون ميزة تنافسية هائلة هنا: معرفة الأسواق والثقافات والشبكات في بلدانهم الأصلية.</p>
<p><strong>5. الرعاية الصحية والتمريض — هامش ربح 19%:</strong> هولندا تعاني من نقص حاد يبلغ 15,000 ممرض وممرضة. العاملون الصحيون من المهاجرين الذين يتحدثون لغات متعددة مطلوبون بشكل خاص في مناطق ذات جاليات مهاجرة كبيرة.</p>
<p><strong>6. خدمات النظافة والتنظيف — هامش ربح 20-30%:</strong> نشاط مستقر وأقل تأثراً بالأزمات الاقتصادية. العقود مع الشركات والمكاتب الحكومية تضمن دخلاً ثابتاً. يمكن البدء برأس مال صغير.</p>`,
      nl:`<h2>Waarom Nederland?</h2><p>Nederland heeft een sterke economie met 17,8 miljoen inwoners en host multinationals als Shell, ASML en Philips. Voor migranten biedt Nederland unieke kansen vanwege culturele diversiteit en behoefte aan meertalige professionals.</p><h2>Beste sectoren voor migrantenondernemers</h2><p><strong>IT en software:</strong> 28% winstmarge, 11% groei. Groot tekort aan ontwikkelaars.</p><p><strong>Vertaling en taalkundige diensten:</strong> 35-50% marge. Arabisch-Nederlands vertalers zijn zeldzaam en zeer gevraagd.</p><p><strong>Horeca en eten:</strong> 15-25% marge. Internationale keukens zijn populair in Nederland.</p><p><strong>Import en export:</strong> 10-20% marge. Migranten hebben voordeel door kennis van herkomstlanden.</p>`,
      en:`<h2>Why the Netherlands?</h2><p>The Netherlands has a strong economy hosting multinationals like Shell, ASML and Philips. For migrants, it offers unique opportunities due to cultural diversity and demand for multilingual professionals.</p><h2>Best Sectors for Migrant Entrepreneurs</h2><p><strong>IT & Software:</strong> 28% profit margin, 11% growth. Large shortage of developers.</p><p><strong>Translation & Language Services:</strong> 35-50% margin. Arabic-Dutch translators are rare and highly sought.</p><p><strong>Food & Restaurants:</strong> 15-25% margin. International cuisines are popular in the Netherlands.</p><p><strong>Import & Export:</strong> 10-20% margin. Migrants have competitive advantage through knowledge of home markets.</p>`
    }
  },
  {
    id:"statushouder-ondernemen",
    date:"2025-02-20", readTime:8, image:"🌟", color:GREEN,
    category:{ ar:"للمهاجرين", nl:"Statushouders", en:"For Newcomers" },
    title:{
      ar:"فتح شركة في هولندا كحامل وضع اللاجئ — دليل كامل 2025",
      nl:"Ondernemen als statushouder in Nederland — Volledige gids 2025",
      en:"Starting a Business as a Status Holder in the Netherlands — Complete Guide 2025"
    },
    excerpt:{
      ar:"إذا حصلت على وضع اللاجئ في هولندا، يحق لك فتح شركتك الخاصة. دليل خطوة بخطوة للبدء، والدعم المتاح، والأخطاء التي يجب تجنبها.",
      nl:"Als statushouder heeft u recht op ondernemen in Nederland. Stap-voor-stap gids met beschikbare steun.",
      en:"As a status holder you have the right to start a business in the Netherlands. Step-by-step guide with available support."
    },
    content:{
      ar:`<h2>ما هو وضع اللاجئ في هولندا؟</h2>
<p>وضع اللاجئ (statushouder) هو الوضع القانوني الذي يمنحه المكتب الهولندي للهجرة والتجنيس (IND) للأشخاص الذين حصلوا على تصريح إقامة بناءً على طلب لجوء. هذا يشمل: تصريح الإقامة الأساسي (asielvergunning) لمدة 5 سنوات قابلة للتجديد، وتصريح الإقامة الدائمة بعد 5 سنوات من الإقامة القانونية.</p>
<p>حاملو وضع اللاجئ لهم نفس حقوق المواطنين الهولنديين في ممارسة الأعمال التجارية. هذا يعني أنك تستطيع التسجيل في KVK، وفتح حساب تجاري، وإصدار فواتير، والتعامل مع العملاء تماماً كأي هولندي.</p>

<h2>المتطلبات الأساسية</h2>
<p>للبدء في تأسيس شركتك، ستحتاج إلى: تصريح إقامة ساري المفعول (asielvergunning أو verblijfsvergunning)، رقم BSN (Burgerservicenummer) — رقمك في النظام المدني الهولندي، عنوان سكني مسجل في بلدية هولندية (inschrijving in de BRP)، ورقم IBAN لحساب بنكي هولندي (ضروري للفواتير والمدفوعات).</p>

<h2>هل يمكنني الجمع بين الشركة والمساعدة الاجتماعية؟</h2>
<p>هذا سؤال يقلق كثيراً من المهاجرين. الإجابة: في بعض الحالات نعم، لكن يجب الإبلاغ عن أي دخل من نشاطك التجاري. إذا كنت تتلقى bijstand (مساعدة اجتماعية)، يجب إبلاغ البلدية فوراً عند بدء أي نشاط تجاري. البلدية ستقيّم وضعك وتحدد هل تستمر في الحصول على المساعدة أم لا.</p>
<p>نظام Bbz (Besluit bijstandverlening zelfstandigen) هو البديل الخاص: إذا كنت تخطط لبدء شركة مستدامة، يمكنك التقدم لـ Bbz من البلدية. هذا يمنحك دعماً مالياً مؤقتاً أثناء بناء نشاطك، مع الحفاظ على الدخل أثناء فترة التأسيس.</p>

<h2>الدعم المالي المتاح</h2>
<p><strong>Bbz — Besluit bijstandverlening zelfstandigen:</strong> دعم مالي حكومي للمستقلين الجدد. يمنحك دخلاً أثناء بناء شركتك. التقديم عبر البلدية (gemeente). المدة: حتى 36 شهراً.</p>
<p><strong>Qredits — قروض الشركات الصغيرة:</strong> منظمة هولندية تقدم قروضاً بشروط ميسرة للشركات الناشئة. القروض من €5,000 حتى €250,000 بفائدة منخفضة (5-6%). يقبلون أصحاب السوابق المالية المحدودة. موقعهم: qredits.nl.</p>
<p><strong>Stichting Vluchtelingen Ondernemers (SVO):</strong> منظمة متخصصة في دعم رواد الأعمال من اللاجئين في هولندا. تقدم إرشاداً مجانياً، تدريباً، وربطاً بالشبكات التجارية.</p>
<p><strong>VluchtelingenWerk Nederland:</strong> تقدم دعماً شاملاً يشمل المساعدة في الإجراءات البيروقراطية والترجمة وفهم النظام الهولندي.</p>

<h2>التحديات الشائعة وكيف تتجاوزها</h2>
<p>الحاجز اللغوي: حضور دورات هولندية ضروري. معظم إجراءات KVK والبنوك تتطلب الهولندية. لكن KVK تقدم خدمات بالإنجليزية أيضاً. البنك الهولندي: بعض البنوك تطلب إقامة هولندية لفترة معينة. جرب Bunq أو Revolut Business التي أكثر مرونة مع المهاجرين.</p>`,
      nl:`<h2>Wat is een statushouder?</h2><p>Een statushouder heeft een asielvergunning of verblijfsvergunning en heeft dezelfde ondernemersrechten als Nederlandse burgers.</p><h2>Vereisten</h2><p>Geldige verblijfsvergunning, BSN-nummer, geregistreerd woonadres (BRP), en een Nederlandse bankrekening (IBAN).</p><h2>Beschikbare steun</h2><p><strong>Bbz:</strong> Financiële steun van de gemeente tijdens het opbouwen van uw bedrijf. <strong>Qredits:</strong> Leningen €5.000-€250.000 met lage rente. <strong>SVO:</strong> Gratis begeleiding voor vluchtelingen-ondernemers.</p>`,
      en:`<h2>What is a Status Holder?</h2><p>A status holder has an asylum or residence permit and has the same entrepreneurial rights as Dutch citizens.</p><h2>Requirements</h2><p>Valid residence permit, BSN number, registered address (BRP), and a Dutch bank account (IBAN).</p><h2>Available Support</h2><p><strong>Bbz:</strong> Municipal financial support while building your business. <strong>Qredits:</strong> Loans €5,000-€250,000 at low interest. <strong>SVO:</strong> Free coaching for refugee entrepreneurs.</p>`
    }
  },
  {
    id:"amsterdam-vs-rotterdam",
    date:"2025-03-01", readTime:7, image:"🏙️", color:BLUE,
    category:{ ar:"المدن الهولندية", nl:"Steden", en:"Dutch Cities" },
    title:{
      ar:"أمستردام أم روتردام — أين تفتح شركتك في هولندا؟",
      nl:"Amsterdam vs Rotterdam — Waar start je jouw bedrijf?",
      en:"Amsterdam vs Rotterdam — Where to Start Your Business in the Netherlands?"
    },
    excerpt:{
      ar:"مقارنة معمقة بين أبرز مدينتين في هولندا من حيث التكاليف والفرص والسوق المستهدف لمساعدتك في اتخاذ القرار الصحيح.",
      nl:"Diepgaande vergelijking tussen Amsterdam en Rotterdam voor ondernemers die willen starten.",
      en:"In-depth comparison between Amsterdam and Rotterdam to help you make the right decision for your business."
    },
    content:{
      ar:`<h2>مقدمة — اختيار المدينة يؤثر على نجاحك</h2>
<p>هولندا دولة صغيرة لكن مدنها تختلف اختلافاً كبيراً في ثقافة الأعمال والتكاليف والفرص المتاحة. اختيار مدينتك الأولى قرار استراتيجي يؤثر على سهولة إيجاد العملاء، وتكاليف التشغيل، وجودة حياتك اليومية.</p>

<h2>أمستردام — عاصمة الابتكار والإبداع</h2>
<p>أمستردام هي القلب النابض للاقتصاد الهولندي. تستضيف المقرات الأوروبية لشركات عالمية مثل Netflix, Tesla, Uber, Booking.com, Adyen, وAirbnb. تضم أكثر من 1,100 شركة ناشئة وتُصنف بين أفضل 5 مدن في أوروبا لبيئة الأعمال التقنية.</p>
<p><strong>مزايا أمستردام:</strong></p>
<p>سوق عمل نشط للغاية: إيجاد عملاء في قطاعات التقنية والإبداع والتسويق أسهل بكثير. مجتمع دولي متنوع: 180 جنسية تعيش في المدينة، مما يسهّل التواصل باللغة الإنجليزية. وصول سهل للمستثمرين: حفلات التواصل (networking events) يومية في المدينة. بنية تحتية متكاملة: مطار شيبهول، قطارات عالية السرعة، شبكة مواصلات داخلية ممتازة.</p>
<p><strong>عيوب أمستردام:</strong></p>
<p>الإيجار مرتفع جداً: مكتب صغير (20-30 متر مربع) يكلف €2,000-4,000 شهرياً. تكاليف المعيشة مرتفعة عموماً. المنافسة شديدة في قطاعات الإبداع والتقنية.</p>

<h2>روتردام — بوابة أوروبا وعاصمة الموانئ</h2>
<p>روتردام مدينة متجددة وديناميكية. تضم أكبر ميناء في أوروبا الذي يتعامل مع 450 مليون طن من البضائع سنوياً. المدينة تجتذب المهاجرين بقوة — نصف سكانها من أصول غير هولندية.</p>
<p><strong>مزايا روتردام:</strong></p>
<p>أسعار إيجار معقولة: مكتب بنفس المساحة في أمستردام يكلف نصف السعر في روتردام. ميناء هائل: مثالية للشركات اللوجستية والاستيراد والتصدير. قرب من بلجيكا وألمانيا: سهولة الوصول لأسواق إضافية. جالية مهاجرة كبيرة: يمنية، مغربية، تركية، سورية — سوق داخلي قوي لخدمات المجتمع.</p>
<p><strong>عيوب روتردام:</strong></p>
<p>أقل جذباً للشركات التقنية والإبداعية. شبكة التواصل المهني أصغر مقارنة بأمستردام.</p>

<h2>مدن أخرى تستحق الاهتمام</h2>
<p><strong>لاهاي (Den Haag):</strong> عاصمة الحكومة والقانون الدولي. مثالية لشركات الاستشارات القانونية والسياسية والخدمات الحكومية. تضم مقرات دبلوماسية وشركات دفاع عالمية.</p>
<p><strong>أوتريخت (Utrecht):</strong> في قلب هولندا جغرافياً. يمكن الوصول لأي مدينة هولندية خلال 30-45 دقيقة بالقطار. أسعار إيجار معتدلة وجودة حياة عالية.</p>
<p><strong>إيندهوفن (Eindhoven):</strong> عاصمة التصميم الهولندية ومركز شركة Philips. مثالية لشركات التصميم الصناعي والتقنية.</p>

<h2>التوصية النهائية</h2>
<p>IT وTech والاستشارات → أمستردام. اللوجستيات والاستيراد والتصدير والتصنيع → روتردام. الخدمات الحكومية والقانونية → لاهاي. الشركات التي تستهدف المجتمعات المهاجرة → روتردام أو أمستردام (كلاهما يعمل). إذا كنت غير متأكد، ابدأ من المدينة التي تقيم فيها حالياً — هذا يوفر وقت التنقل ويتيح لك التركيز على بناء شركتك.</p>`,
      nl:`<h2>Amsterdam vs Rotterdam voor ondernemers</h2><p><strong>Amsterdam:</strong> Innovatiehub met 1.100+ startups en kantoren van Netflix, Tesla, Booking.com. Hoge huren maar meer netwerkmogelijkheden.</p><p><strong>Rotterdam:</strong> Europa's grootste haven, betaalbare huren, grote migrantengemeenschap. Ideaal voor logistiek en import/export.</p><p><strong>Advies:</strong> IT/Tech → Amsterdam. Logistiek → Rotterdam. Overheidsdiensten → Den Haag.</p>`,
      en:`<h2>Amsterdam vs Rotterdam for Entrepreneurs</h2><p><strong>Amsterdam:</strong> Innovation hub with 1,100+ startups and offices of Netflix, Tesla, Booking.com. Higher rents but more networking opportunities.</p><p><strong>Rotterdam:</strong> Europe's largest port, affordable rents, large migrant community. Ideal for logistics and import/export.</p><p><strong>Recommendation:</strong> IT/Tech → Amsterdam. Logistics → Rotterdam. Government services → The Hague.</p>`
    }
  },
  {
    id:"subsidies-zzp-nederland",
    date:"2025-03-10", readTime:6, image:"🌱", color:GREEN,
    category:{ ar:"دعم حكومي", nl:"Subsidies", en:"Subsidies" },
    title:{
      ar:"الدعم الحكومي للمستقلين في هولندا — منح وخصومات ضريبية 2025",
      nl:"Subsidies en regelingen voor ZZP'ers in Nederland 2025",
      en:"Government Subsidies and Tax Benefits for Freelancers in the Netherlands 2025"
    },
    excerpt:{
      ar:"دليل شامل بالمنح والخصومات الضريبية والقروض الحكومية المتاحة للمستقلين وأصحاب الشركات الصغيرة في هولندا.",
      nl:"Compleet overzicht van subsidies, belastingvoordelen en leningen voor ZZP'ers.",
      en:"Complete guide to subsidies, tax benefits and loans available for freelancers in the Netherlands."
    },
    content:{
      ar:`<h2>لماذا الدعم الحكومي مهم لك؟</h2>
<p>كثير من المستقلين في هولندا لا يعرفون أنهم يتركون آلاف اليوروهات على الطاولة سنوياً بعدم استغلال المزايا والخصومات الضريبية المتاحة لهم. هولندا تدعم المستقلين بشكل كبير لأنهم يشكلون عموداً اقتصادياً مهماً — حوالي 1.5 مليون ZZP في هولندا.</p>

<h2>الخصومات الضريبية للمستقلين</h2>
<p><strong>Zelfstandigenaftrek — خصم العمل المستقل:</strong> €2,470 (2025) خصم سنوي ثابت من دخلك الخاضع للضريبة. الشرط: العمل كمستقل لأكثر من 1,225 ساعة سنوياً (حد الساعات). هذا الخصم يوفر لك ما بين €500-800 سنوياً اعتماداً على شريحتك الضريبية.</p>
<p><strong>MKB-winstvrijstelling — إعفاء أرباح المشاريع الصغيرة:</strong> 13.31% من أرباحك الصافية معفاة من الضريبة تلقائياً. لا تحتاج تقديم طلب. يُطبق تلقائياً عند تقديم إقرارك الضريبي السنوي.</p>
<p><strong>Startersaftrek — خصم المبتدئين:</strong> في أول 3 سنوات من عملك المستقل، تحصل على خصم إضافي €2,123 سنوياً فوق الـ Zelfstandigenaftrek. المجموع في السنوات الأولى: €4,593 خصم سنوي.</p>

<h2>دعم البحث والتطوير (WBSO)</h2>
<p>إذا كنت تطور برنامج جديداً، تقنية مبتكرة، أو حلاً تقنياً لمشكلة موجودة، يمكنك التقدم لـ WBSO (Wet Bevordering Speur- en Ontwikkelingswerk). هذا البرنامج يمنحك تخفيضاً ضريبياً يصل إلى 40% على تكاليف الساعات المستغرقة في البحث والتطوير. التقديم يتم عبر rvo.nl.</p>

<h2>خصم الاستثمارات الصغيرة (KIA)</h2>
<p>إذا استثمرت في معدات لشركتك (جهاز كمبيوتر، كاميرا، أثاث مكتبي، آليات)، يمكنك الاستفادة من KIA (Kleinschaligheidsinvesteringsaftrek). الاستثمارات بين €2,800 و€69,765: خصم 28% من قيمة الاستثمار من دخلك الخاضع للضريبة. مثال: اشتريت معدات بـ €10,000 → تخصم €2,800 إضافية من دخلك الخاضع للضريبة.</p>

<h2>قروض Qredits للشركات الناشئة</h2>
<p>Qredits منظمة هولندية غير ربحية تقدم قروضاً بأسعار فائدة منخفضة (5-6%) للشركات الصغيرة والناشئة. القروض المتاحة: Microkrediet: €5,000-€50,000 (أسبوعين للموافقة). MKB-krediet: €50,000-€250,000. Business Mentor: إرشاد مجاني مع القرض. رابط التقديم: qredits.nl.</p>

<h2>الضريبة على الأرباح — ما تحتاج معرفته</h2>
<p>كمستقل في هولندا، أنت تدفع ضريبة الدخل الشخصي (Inkomstenbelasting) على أرباحك. الشريحة الأولى: دخل حتى €75,518 → ضريبة 36.97%. الشريحة الثانية: دخل فوق €75,518 → ضريبة 49.50%. لكن بعد تطبيق جميع الخصومات المذكورة أعلاه، ضريبتك الفعلية ستكون أقل بكثير.</p>`,
      nl:`<h2>Belastingvoordelen voor ZZP'ers</h2><p><strong>Zelfstandigenaftrek:</strong> €2.470 aftrek bij 1.225+ uur werken per jaar.</p><p><strong>MKB-winstvrijstelling:</strong> 13,31% van de nettowinst is belastingvrij.</p><p><strong>Startersaftrek:</strong> Extra €2.123 per jaar in de eerste 3 jaar.</p><h2>Subsidies</h2><p><strong>WBSO:</strong> Tot 40% belastingkorting op R&D-uren. Aanvragen via rvo.nl.</p><p><strong>KIA:</strong> 28% aftrek op investeringen tussen €2.800-€69.765.</p><p><strong>Qredits:</strong> Leningen €5.000-€250.000 bij 5-6% rente.</p>`,
      en:`<h2>Tax Benefits for Freelancers</h2><p><strong>Zelfstandigenaftrek:</strong> €2,470 deduction when working 1,225+ hours per year.</p><p><strong>MKB-winstvrijstelling:</strong> 13.31% of net profit is tax-free.</p><p><strong>Startersaftrek:</strong> Extra €2,123 per year in the first 3 years.</p><h2>Subsidies</h2><p><strong>WBSO:</strong> Up to 40% tax credit on R&D hours. Apply via rvo.nl.</p><p><strong>KIA:</strong> 28% deduction on investments between €2,800-€69,765.</p><p><strong>Qredits:</strong> Loans €5,000-€250,000 at 5-6% interest.</p>`
    }
  },
  {
    id:"online-winkel-starten",
    date:"2025-03-20", readTime:8, image:"🛒", color:ORANGE,
    category:{ ar:"تجارة إلكترونية", nl:"E-commerce", en:"E-commerce" },
    title:{
      ar:"كيف تبدأ متجراً إلكترونياً في هولندا — دليل E-commerce 2025",
      nl:"Online winkel starten in Nederland — Complete E-commerce gids 2025",
      en:"How to Start an Online Store in the Netherlands — E-commerce Guide 2025"
    },
    excerpt:{
      ar:"دليل عملي شامل لإطلاق متجرك الإلكتروني في هولندا، من اختيار المنصة حتى الامتثال القانوني وطرق الدفع وجذب العملاء.",
      nl:"Praktische gids voor het starten van een succesvolle webshop in Nederland.",
      en:"Practical guide to launching a successful online store in the Netherlands."
    },
    content:{
      ar:`<h2>لماذا هولندا سوق E-commerce مثالي؟</h2>
<p>هولندا تحتل المرتبة السادسة في أوروبا من حيث حجم التجارة الإلكترونية. 93% من سكانها يستخدمون الإنترنت، و90% منهم يتسوقون أونلاين. إجمالي سوق E-commerce الهولندي بلغ €32 مليار في 2024 وينمو بمعدل 8-10% سنوياً. هولندا تمتلك بنية تحتية لوجستية متقدمة — التوصيل خلال 24 ساعة أمر اعتيادي هنا.</p>

<h2>اختيار المنصة المناسبة</h2>
<p><strong>Shopify:</strong> الخيار الأسهل للمبتدئين. من €29 شهرياً. يدعم iDEAL تلقائياً (طريقة الدفع الأكثر استخداماً في هولندا — 70% من المدفوعات). مناسب إذا كنت تبيع منتجات فيزيائية أو رقمية. التطبيق الهولندي متاح. تكاملات كثيرة مع شركات التوصيل الهولندية.</p>
<p><strong>WooCommerce (WordPress):</strong> مجاني ومرن لكنه يحتاج خبرة تقنية. مناسب إذا كان لديك موقع WordPress موجود. يمكن تخصيصه بشكل كبير. تكاليف أقل على المدى البعيد لكن تكلفة الإعداد أعلى.</p>
<p><strong>Bol.com Verkopen:</strong> بيع على أكبر منصة هولندية مباشرة. وصول فوري لـ 12 مليون عميل نشط. عمولة 5-17% حسب الفئة. مثالي للبدء بدون موقع خاص.</p>
<p><strong>Magento / Adobe Commerce:</strong> للشركات الكبيرة والمتوسطة. قوية ومرنة لكن تحتاج فريق تقني.</p>

<h2>طرق الدفع — ما لا يمكنك الاستغناء عنه</h2>
<p><strong>iDEAL — إلزامي:</strong> iDEAL هو نظام الدفع الإلكتروني الأكثر استخداماً في هولندا. 70% من جميع المدفوعات الإلكترونية تتم عبره. بدون iDEAL، ستخسر معظم عملائك الهولنديين. يعمل عبر ربط مباشر مع حساب المشتري البنكي.</p>
<p><strong>Klarna / Afterpay — شائع جداً:</strong> الشراء الآن والدفع بعد 30 يوماً أو بالتقسيط. 40% من الهولنديين يفضلون هذه الطريقة للمشتريات الكبيرة. يزيد معدل إتمام الشراء بنسبة 20-30%.</p>
<p><strong>بطاقات الائتمان:</strong> Visa وMastercard مهمتان للعملاء الدوليين. الهولنديون أقل استخداماً للبطاقات مقارنة بدول أخرى.</p>
<p><strong>PayPal:</strong> ضروري للمشتريات الدولية وللعملاء الذين لا يثقون بإدخال بيانات بطاقتهم مباشرة.</p>

<h2>المتطلبات القانونية</h2>
<p>بموجب القانون الهولندي والأوروبي (GDPR وقانون حماية المستهلك)، يجب أن يتضمن موقعك: رقم KVK ورقم BTW واضحَين، سياسة إرجاع واضحة (14 يوم كحد أدنى بدون ذكر السبب)، سياسة خصوصية متوافقة مع GDPR، أسعار شاملة للضريبة (السعر الإجمالي هو ما يرى العميل)، معلومات تواصل واضحة (عنوان، إيميل، هاتف).</p>

<h2>اللوجستيات والتوصيل</h2>
<p>PostNL: الخيار الأول للشركات الصغيرة. أسعار معقولة وشبكة واسعة. DHL وUPS: أفضل للتوصيل الدولي. Bol.com Logistiek: إذا تبيع على Bol.com، يمكنهم التعامل مع التخزين والتوصيل بالكامل.</p>`,
      nl:`<h2>Waarom Nederland ideaal is voor e-commerce</h2><p>93% van de Nederlanders heeft internet, 90% winkelt online. Marktomvang €32 miljard in 2024, groei 8-10% per jaar.</p><h2>Platform kiezen</h2><p><strong>Shopify:</strong> Eenvoudigst. Vanaf €29/maand. Ondersteunt iDEAL direct.</p><p><strong>WooCommerce:</strong> Gratis maar technische kennis vereist.</p><p><strong>Bol.com:</strong> Direct toegang tot 12 miljoen actieve klanten.</p><h2>Betaalmethoden</h2><p><strong>iDEAL:</strong> Verplicht. 70% van online betalingen.</p><p><strong>Klarna/Afterpay:</strong> Koop nu, betaal later. Verhoogt conversie met 20-30%.</p>`,
      en:`<h2>Why the Netherlands is Ideal for E-commerce</h2><p>93% of Dutch people use internet, 90% shop online. Market size €32 billion in 2024, growing 8-10% annually.</p><h2>Platform Choice</h2><p><strong>Shopify:</strong> Easiest to start. From €29/month. Supports iDEAL natively.</p><p><strong>WooCommerce:</strong> Free but requires technical knowledge.</p><p><strong>Bol.com:</strong> Instant access to 12 million active customers.</p><h2>Payment Methods</h2><p><strong>iDEAL:</strong> Mandatory. 70% of online payments.</p><p><strong>Klarna/Afterpay:</strong> Buy now, pay later. Increases conversion by 20-30%.</p>`
    }
  },
  {
    id:"verzekeringen-zzp",
    date:"2025-04-01", readTime:6, image:"🛡️", color:BLUE,
    category:{ ar:"تأمين", nl:"Verzekeringen", en:"Insurance" },
    title:{
      ar:"التأمين للمستقلين في هولندا — ما تحتاجه وما تستغني عنه",
      nl:"Verzekeringen voor ZZP'ers — Wat heb je écht nodig in 2025?",
      en:"Insurance for Freelancers in the Netherlands — What You Really Need in 2025"
    },
    excerpt:{
      ar:"دليل عملي للتأمينات الضرورية لكل مستقل في هولندا مع مقارنة الأسعار وتوصيات المزودين الرئيسيين.",
      nl:"Praktische gids voor noodzakelijke verzekeringen voor ZZP'ers met prijsvergelijking.",
      en:"Practical guide to essential insurance for freelancers with price comparison and provider recommendations."
    },
    content:{
      ar:`<h2>لماذا التأمين مهم لك كمستقل؟</h2>
<p>الموظف في شركة هولندية يتمتع بشبكة أمان تلقائية: راتب مرضي، تأمين ضد البطالة، معاش تقاعد من صاحب العمل. أنت كمستقل، أنت مسؤول عن كل هذه الحماية بنفسك. فهم التأمينات المتاحة ليس رفاهية — إنه استثمار في استدامة نشاطك التجاري.</p>

<h2>التأمين الصحي — إلزامي لجميع المقيمين</h2>
<p>التأمين الصحي (Zorgverzekering) إلزامي قانونياً لكل شخص يقيم في هولندا. يشمل: زيارات الطبيب العام، العلاج في المستشفى، أدوية موصوفة، وجزء من تكاليف طبيب الأسنان. التكلفة الشهرية: €120-200 تقريباً حسب الخطة المختارة.</p>
<p>الحكومة الهولندية تقدم zorgtoeslag (دعم التأمين الصحي) للأشخاص ذوي الدخل المحدود. إذا كان دخلك السنوي أقل من €38,000 (فرد)، قد تكون مؤهلاً للحصول على هذا الدعم. التقديم عبر belastingdienst.nl.</p>

<h2>تأمين المسؤولية المهنية (Beroepsaansprakelijkheid)</h2>
<p>هذا التأمين يحميك إذا ارتكبت خطأً في عملك أضر بعميلك. مثلاً: قدمت استشارة خاطئة أفضت إلى خسائر مالية، أو صممت موقعاً فيه خلل أضر بأعمال العميل، أو أخطأت في محاسبة مما سبب غرامات ضريبية.</p>
<p>الشركات الكبيرة في هولندا تطلب منك أحياناً شهادة هذا التأمين قبل توقيع العقود. التكلفة: €20-80 شهرياً حسب طبيعة عملك وحجم المخاطر. ضروري جداً لـ: المستشارين، المحاسبين، المصممين، المطورين، الأطباء والممرضين المستقلين.</p>

<h2>تأمين العجز عن العمل (AOV)</h2>
<p>هذا هو الأهم والأكثر إغفالاً. إذا مرضت أو أُصبت وعجزت عن العمل، لا يوجد راتب مرضي بانتظارك كمستقل. دخلك يتوقف فوراً. AOV (Arbeidsongeschiktheidsverzekering) يدفع لك دخلاً شهرياً إذا عجزت عن العمل جراء مرض أو إصابة.</p>
<p>الغطاء عادةً: 70-80% من دخلك اليومي المؤمَّن، لفترة يمكن تمديدها حتى سن التقاعد. التكلفة: €100-350 شهرياً حسب: عمرك، دخلك المؤمَّن، طبيعة عملك، وفترة الانتظار قبل بدء الدفع (30-730 يوم).</p>
<p>نصيحة: يمكنك خفض القسط بزيادة فترة الانتظار. إذا كان لديك احتياطي مالي يكفي 6 أشهر، اختر فترة انتظار 180 يوماً وستوفر 30-40% من القسط.</p>

<h2>تأمينات اختيارية مفيدة</h2>
<p><strong>تأمين المعدات (Inventarisverzekering):</strong> يغطي جهاز الكمبيوتر، الكاميرا، والمعدات المهنية ضد السرقة والتلف. التكلفة: €10-30 شهرياً.</p>
<p><strong>تأمين المسؤولية العامة (Aansprakelijkheidsverzekering):</strong> يحميك إذا تسببت بضرر لممتلكات شخص آخر أو أصبته بأذى أثناء عملك. مثلاً: كسرت شيئاً في مكتب عميلك، أو تعطلت آليات في موقع عمل. التكلفة: €10-25 شهرياً.</p>`,
      nl:`<h2>Zorgverzekering — Verplicht</h2><p>Voor iedereen in Nederland verplicht. Kosten €120-200/maand. Vraag zorgtoeslag aan bij inkomen onder €38.000.</p><h2>Beroepsaansprakelijkheid</h2><p>Dekt schade door fouten in uw werk. Kosten €20-80/maand. Vaak vereist door opdrachtgevers.</p><h2>AOV — Belangrijkste verzekering</h2><p>Dekt inkomensverlies bij ziekte/arbeidsongeschiktheid. Kosten €100-350/maand. Kies langere wachttijd voor lagere premie.</p>`,
      en:`<h2>Health Insurance — Mandatory</h2><p>Required for everyone in the Netherlands. Cost €120-200/month. Apply for zorgtoeslag support if income under €38,000.</p><h2>Professional Liability</h2><p>Covers damage from errors in your work. Cost €20-80/month. Often required by clients.</p><h2>Disability Insurance (AOV) — Most Important</h2><p>Covers income loss due to illness/disability. Cost €100-350/month. Choose longer waiting period for lower premium.</p>`
    }
  },
  {
    id:"pensioen-zzp",
    date:"2025-04-15", readTime:7, image:"👴", color:PURPLE,
    category:{ ar:"تقاعد", nl:"Pensioen", en:"Retirement" },
    title:{
      ar:"التقاعد للمستقلين في هولندا — كيف تبني مستقبلاً مالياً آمناً",
      nl:"Pensioen voor ZZP'ers — Hoe bouw je een financieel veilige toekomst op?",
      en:"Retirement Planning for Freelancers — Building a Financially Secure Future in the Netherlands"
    },
    excerpt:{
      ar:"المستقلون في هولندا لا يحصلون على معاش تقاعد تلقائياً من صاحب العمل. إليك الخيارات المتاحة لبناء مستقبل مالي مستقر.",
      nl:"ZZP'ers bouwen geen automatisch pensioen op. Hier zijn uw opties voor een financieel stabiele toekomst.",
      en:"Freelancers don't automatically build up a pension. Here are your options for a financially stable future."
    },
    content:{
      ar:`<h2>المشكلة — فجوة التقاعد للمستقلين</h2>
<p>في هولندا، نظام التقاعد للموظفين متطور للغاية. الموظف في شركة هولندية يدفع جزءاً من راتبه لصندوق تقاعد مهني (pensioenfonds) يديره صاحب العمل، ويحصل عند التقاعد على معاش شهري لائق. المستقل لا يستفيد من هذا النظام — أنت تتقاعد بما ادخرته وأدرته بنفسك.</p>
<p>الدراسات تُظهر أن 60% من المستقلين في هولندا لا يدخرون كفاية للتقاعد. هذا الموضوع أصبح قضية وطنية، والحكومة الهولندية تدرس تغييرات قانونية لمعالجته.</p>

<h2>AOW — معاش الدولة الأساسي</h2>
<p>كل شخص أقام في هولندا بشكل قانوني يحصل على AOW (Algemene Ouderdomswet) عند بلوغه سن التقاعد (67 سنة في 2025، مرشح للرفع تدريجياً). المبلغ: €1,431/شهر لشخص يعيش منفرداً (2025). €985/شهر لكل فرد من الزوجين.</p>
<p>لكن هذا المبلغ لا يكفي للعيش بكرامة في هولندا. تكاليف المعيشة الشهرية المتوسطة (إيجار + طعام + مواصلات + صحة) تتراوح بين €2,500-3,500 شهرياً في المدن الكبيرة. الفجوة بين AOW ومصاريفك تحتاج أن تغطيها من مدخراتك الخاصة.</p>

<h2>خيار 1 — Lijfrente (أكثر شيوعاً)</h2>
<p>Lijfrente هو حساب تقاعد فردي مع ميزة ضريبية كبيرة. الأموال التي تودعها في هذا الحساب تُخصم من دخلك الخاضع للضريبة الآن، وتُفرض عليها ضريبة عند السحب عند التقاعد (في الغالب ستكون في شريحة ضريبية أقل). الحد الأقصى السنوي للإيداع يحدده Belastingdienst بناءً على ما يسمى jaarruimte (المساحة السنوية).</p>
<p>مزودو Lijfrente في هولندا: البنوك الكبرى (ABN AMRO, ING, Rabobank)، شركات التأمين (Nationale-Nederlanden, Centraal Beheer)، ومزودون متخصصون في التقاعد.</p>

<h2>خيار 2 — Banksparen</h2>
<p>ادخار منتظم في حساب بنكي خاص بالتقاعد. أبسط من Lijfrente وأقل تعقيداً. يوفر مرونة أكبر في الوصول للأموال. يمكن فتحه في أي بنك هولندي. نفس الميزة الضريبية لـ Lijfrente.</p>

<h2>خيار 3 — الاستثمار في صناديق المؤشرات (ETF)</h2>
<p>استثمار شهري منتظم في صناديق المؤشرات الأوروبية أو العالمية. العائد التاريخي للأسهم على المدى الطويل (20-30 سنة) يتراوح بين 7-10% سنوياً. هذا الخيار مناسب للشباب الذين لديهم أفق زمني طويل. الخطر: قيمة الأسهم تتقلب، وقد تنخفض في المدى القصير.</p>

<h2>قاعدة 15-20% للادخار</h2>
<p>القاعدة الذهبية: ادخر 15-20% من دخلك الشهري للتقاعد. إذا كان دخلك الشهري €3,000، فادّخر €450-600 شهرياً للتقاعد. مثال عملي: إذا بدأت الادخار في سن 35 بمبلغ €500 شهرياً بعائد سنوي 7%، ستمتلك عند سن 67 ما يزيد على €680,000.</p>
<p>ابدأ مبكراً — قوة الفائدة المركبة تعمل بشكل رهيب مع الوقت. كل سنة تأخير تكلفك أكثر لاحقاً.</p>`,
      nl:`<h2>Het pensioengat voor ZZP'ers</h2><p>60% van de ZZP'ers spaart onvoldoende voor pensioen. Het AOW bedraagt €1.431/maand (2025) — onvoldoende voor comfortabel leven.</p><h2>Oplossingen</h2><p><strong>Lijfrente:</strong> Fiscaal voordelig pensioenspaarvorm. Inleg fiscaal aftrekbaar nu, belast bij opname op pensioenleeftijd.</p><p><strong>Banksparen:</strong> Eenvoudiger alternatief met zelfde fiscaal voordeel.</p><p><strong>ETF-beleggen:</strong> Maandelijks beleggen in indexfondsen. Historisch rendement 7-10% per jaar.</p><h2>Gouden regel</h2><p>Spaar 15-20% van uw maandinkomen voor pensioen. Begin vroeg — elk jaar wachten kost u meer later.</p>`,
      en:`<h2>The Pension Gap for Freelancers</h2><p>60% of freelancers save insufficiently for retirement. AOW state pension is €1,431/month (2025) — insufficient for comfortable living.</p><h2>Solutions</h2><p><strong>Lijfrente:</strong> Tax-advantaged pension savings. Contributions deductible now, taxed at withdrawal during retirement.</p><p><strong>Bank Savings:</strong> Simpler alternative with same tax advantage.</p><p><strong>ETF Investing:</strong> Monthly investment in index funds. Historical return 7-10% per year.</p><h2>Golden Rule</h2><p>Save 15-20% of monthly income for retirement. Start early — every year of delay costs you more later.</p>`
    }
  },
];

export default function BlogPage({ lang, t, setPage, setBlogPostId }) {
  const [search, setSearch] = useState("");
  const getName = p => lang==="ar" ? p.title.ar : lang==="nl" ? p.title.nl : p.title.en;
  const getExcerpt = p => lang==="ar" ? p.excerpt.ar : lang==="nl" ? p.excerpt.nl : p.excerpt.en;
  const getCat = p => lang==="ar" ? p.category.ar : lang==="nl" ? p.category.nl : p.category.en;

  const L = {
    ar:{ title:"المدونة", sub:"مقالات متخصصة في الأعمال والاقتصاد الهولندي", search:"ابحث في المقالات...", readMore:"اقرأ المقالة ←", readTime:"دقيقة قراءة" },
    nl:{ title:"Blog", sub:"Gespecialiseerde artikelen over ondernemen in Nederland", search:"Zoek in artikelen...", readMore:"Lees artikel →", readTime:"min lezen" },
    en:{ title:"Blog", sub:"Specialized articles on business and the Dutch economy", search:"Search articles...", readMore:"Read article →", readTime:"min read" },
  }[lang]||{};

  const filtered = BLOG_POSTS.filter(p => {
    const q = search.toLowerCase();
    return !q || getName(p).toLowerCase().includes(q) || getExcerpt(p).toLowerCase().includes(q);
  });

  return (
    <div style={{animation:"fadeUp 0.4s ease both",fontFamily:t.font,direction:t.dir}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:22,background:`linear-gradient(135deg,${DARK} 0%,#1a2a3a 100%)`,padding:"36px 28px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`${BLUE}15`,pointerEvents:"none"}}/>
        <div style={{width:60,height:60,borderRadius:16,background:`linear-gradient(145deg,${BLUE},#1e40af)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,boxShadow:`0 6px 20px ${BLUE}44`}}>📝</div>
        <h1 style={{fontSize:24,fontWeight:900,color:"white",margin:"0 0 8px",fontFamily:t.font}}>{L.title}</h1>
        <p style={{color:"#ffffff88",fontSize:13,margin:0}}>{L.sub}</p>
      </div>

      <div id="ad-slot-blog-top" style={{width:"100%",minHeight:90,background:"transparent",marginBottom:16,borderRadius:8,overflow:"hidden"}}/>

      <div style={{background:"white",borderRadius:16,padding:14,marginBottom:18,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.search}
          style={{width:"100%",border:"2px solid #eee",borderRadius:10,padding:"10px 14px",fontSize:13.5,fontFamily:t.font,direction:lang==="ar"?"rtl":"ltr",outline:"none"}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginBottom:20}}>
        {filtered.map((post,i) => (
          <article key={post.id}
            onClick={()=>{ setBlogPostId(post.id); setPage("blog-post"); }}
            style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",cursor:"pointer",border:"2px solid #f0f0f0",transition:"all 0.3s",animation:`fadeUp 0.4s ease ${i*0.05}s both`,position:"relative"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=post.color;e.currentTarget.style.boxShadow=`0 8px 28px ${post.color}22`;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#f0f0f0";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.07)";e.currentTarget.style.transform="none";}}>
            <div style={{height:4,background:`linear-gradient(90deg,${post.color},${post.color}66)`}}/>
            <div style={{padding:"20px 20px 0",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:48,height:48,borderRadius:12,background:`${post.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{post.image}</div>
              <div style={{flex:1,minWidth:0}}>
                <span style={{display:"inline-block",padding:"2px 10px",borderRadius:20,background:`${post.color}12`,color:post.color,fontSize:10.5,fontWeight:700,fontFamily:t.font,marginBottom:4}}>{getCat(post)}</span>
                <div style={{fontSize:11,color:"#666",fontFamily:"monospace"}}>{post.date} · {post.readTime} {L.readTime}</div>
              </div>
            </div>
            <div style={{padding:"12px 20px 20px"}}>
              <h2 style={{fontSize:15,fontWeight:800,color:"#1a1a2e",fontFamily:t.font,lineHeight:1.4,marginBottom:10}}>{getName(post)}</h2>
              <p style={{fontSize:12.5,color:"#666",lineHeight:1.75,fontFamily:t.font,marginBottom:14}}>{getExcerpt(post)}</p>
              <div style={{display:"flex",alignItems:"center",gap:4,color:post.color,fontSize:12.5,fontWeight:700,fontFamily:t.font}}>{L.readMore}</div>
            </div>
          </article>
        ))}
      </div>

      <PageFooter t={t} setPage={setPage}/>
    </div>
  );
}
