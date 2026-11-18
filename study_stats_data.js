window.STUDY_STATS_DATA = {
  "title_ar": "منهج الإحصاء لتحليل البيانات (Statistics for Data Analysis)",
  "title_en": "Statistics for Data Analysis - Complete Guide",
  "description_ar": "المرجع الإحصائي المعتمد لمحللي البيانات: مقاييس النزعة المركزية والتشتت، أنواع البيانات، التوزيعات، الاختبارات الإحصائية، والانحدار والارتباط باللغتين العربية والإنجليزية.",
  "golden_rule_ar": "التحليل الإحصائي الجيد = بيانات جيدة + طريقة صحيحة + تفسير منطقي.",
  "golden_rule_en": "Good Analysis = Good Data + Right Method + Logical Interpretation.",
  "sections": [
    {
      "id": "intro",
      "number": 1,
      "title_ar": "ما هو الإحصاء؟ والعملية الإحصائية",
      "title_en": "What is Statistics? & The Statistical Process",
      "icon": "🎯",
      "definition_ar": "هو علم جمع البيانات وتنظيمها وتحليلها وتفسيرها لاستخلاص نتائج تساعدنا في اتخاذ قرارات أفضل.",
      "definition_en": "Statistics is the science of collecting, organizing, analyzing, and interpreting data to extract useful insights and make better decisions.",
      "steps": [
        {
          "step": 1,
          "name_ar": "جمع البيانات",
          "name_en": "Collect Data",
          "icon": "📋"
        },
        {
          "step": 2,
          "name_ar": "تنظيم البيانات",
          "name_en": "Organize Data",
          "icon": "📁"
        },
        {
          "step": 3,
          "name_ar": "تحليل البيانات",
          "name_en": "Analyze Data",
          "icon": "📊"
        },
        {
          "step": 4,
          "name_ar": "تفسير النتائج",
          "name_en": "Interpret Results",
          "icon": "💡"
        },
        {
          "step": 5,
          "name_ar": "اتخاذ القرار",
          "name_en": "Make Decisions",
          "icon": "🎯"
        }
      ],
      "importance": [
        "فهم البيانات والوصول إلى معانٍ ورؤى عملية مفيدة.",
        "تلخيص مجموعات البيانات الضخمة في مؤشرات مركزية موجزة.",
        "اكتشاف الأنماط والعلاقات الخفية بين المتغيرات المختلفة.",
        "دعم اتخاذ القرار التجاري والتقني وتقليل نسبة المخاطرة والشك."
      ]
    },
    {
      "id": "data_types",
      "number": 2,
      "title_ar": "أنواع البيانات (Types of Data)",
      "title_en": "Types of Data (Categorical vs. Numerical)",
      "icon": "🏷️",
      "types": [
        {
          "category_ar": "بيانات وصفية / نوعية (Qualitative / Categorical)",
          "category_en": "Qualitative (Categorical) Data",
          "desc_ar": "تصف صفات أو فئات ولا تقاس بالأرقام المباشرة.",
          "subtypes": [
            {
              "name_ar": "اسمية (Nominal)",
              "name_en": "Nominal",
              "rule_ar": "لا يوجد أي ترتيب منطقي بينها (No order)",
              "examples": "الجنس (ذكر / أنثى)، ألوان المنتجات، الحالة الاجتماعية (أعزب / متزوج)."
            },
            {
              "name_ar": "ترتيبية (Ordinal)",
              "name_en": "Ordinal",
              "rule_ar": "لها ترتيب وتدرج واضح (Has logical order)",
              "examples": "التقييمات (ضعيف، متوسط، جيد، ممتاز)، رتب التعليم (بكالوريوس، ماجستير، دكتوراه)."
            }
          ]
        },
        {
          "category_ar": "بيانات كمية / رقمية (Quantitative / Numerical)",
          "category_en": "Quantitative (Numerical) Data",
          "desc_ar": "تُقاس بالأرقام ويمكن إجراء العمليات الحسابية والرياضية عليها.",
          "subtypes": [
            {
              "name_ar": "منفصلة (Discrete)",
              "name_en": "Discrete",
              "rule_ar": "أعداد صحيحة ناتجة عن العد (Whole numbers)",
              "examples": "عدد الطلاب في الفصل، عدد طلبات الشراء، عدد السيارات."
            },
            {
              "name_ar": "مستمرة (Continuous)",
              "name_en": "Continuous",
              "rule_ar": "أي قيمة رقمية كسرية ضمن مدى معين (Continuous range)",
              "examples": "الطول، الوزن، درجة الحرارة، الراتب، الوقت المستغرق."
            }
          ]
        }
      ],
      "note_ar": "💡 نصيحة جوهرية: اختيار الاختبار الإحصائي ونوع الرسم البياني المناسب يعتمد كلياً على نوع البيانات ونوع السؤال المراد الإجابة عنه."
    },
    {
      "id": "central_tendency",
      "number": 3,
      "title_ar": "مقاييس النزعة المركزية (Measures of Central Tendency)",
      "title_en": "Measures of Central Tendency",
      "icon": "📍",
      "desc_ar": "تُستخدم لوصف مركز البيانات وتحديد القيمة التمثيلية النمطية التي تعبر عن المجموعة ككل.",
      "measures": [
        {
          "name_ar": "المتوسط الحسابي (Mean)",
          "name_en": "Mean (Arithmetic Average)",
          "formula": "x̄ = (∑ x) / n",
          "desc_ar": "مجموع كل القيم مقسوماً على عددها الإجمالي.",
          "example": "البيانات: 2, 4, 6, 8, 10 ➔ المجموع = 30، العدد = 5 ➔ المتوسط = 6",
          "alert_ar": "يتأثر بشدة بالقيم الشاذة والمتطرفة (Outliers)!"
        },
        {
          "name_ar": "الوسيط (Median)",
          "name_en": "Median (Middle Value)",
          "formula": "القيمة المنتصفة بعد الترتيب التصاعدي",
          "desc_ar": "القيمة التي تقسم البيانات إلى نصفين متساويين: 50% أقل منها و50% أكبر منها.",
          "example": "البيانات المرتبة: 2, 4, 6, 8, 10 ➔ الوسيط = 6",
          "alert_ar": "المقياس الأفضل والأكثر موثوقية في حالة وجود قيم متطرفة أو توزيع ملتوي (مثل متوسط الرواتب)."
        },
        {
          "name_ar": "المنوال (Mode)",
          "name_en": "Mode (Most Frequent)",
          "formula": "القيمة الأكثر تكراراً وشيوعاً",
          "desc_ar": "القيمة أو الفئة التي تكررت أكبر عدد من المرات في مجموعة البيانات.",
          "example": "البيانات: 2, 2, 3, 4, 4, 4, 5 ➔ المنوال = 4",
          "alert_ar": "المقياس الوحيد الصالح للاستخدام مع البيانات الوصفية الاسمية (Nominal)."
        }
      ],
      "symmetry_rule_ar": "قاعدة التماثل: كلما كانت البيانات متماثلة (Symmetric)، اقتربت هذه المقاييس الثلاثة وتطابقت (Mean = Median = Mode)."
    },
    {
      "id": "dispersion",
      "number": 4,
      "title_ar": "مقاييس التشتت والتباين (Measures of Dispersion)",
      "title_en": "Measures of Dispersion (Variability)",
      "icon": "📏",
      "desc_ar": "توضح وتصف مدى تباعد وانتشار البيانات حول مركزها أو متوسطها.",
      "measures": [
        {
          "name_ar": "المدى (Range)",
          "name_en": "Range",
          "formula": "Range = Max - Min",
          "desc_ar": "الفرق البسيط بين أكبر قيمة وأصغر قيمة في مجموعة البيانات.",
          "example": "إذا كانت القيم من 2 إلى 10 ➔ المدى = 10 - 2 = 8"
        },
        {
          "name_ar": "التباين (Variance - σ²)",
          "name_en": "Variance",
          "formula": "σ² = ∑ (x - x̄)² / n",
          "desc_ar": "متوسط مربعات انحرافات القيم عن متوسطها الحسابي.",
          "example": "يقيس درجة تشتت النقاط عن المتوسط، ولكن بوحدات مربعة يصعب تفسيرها عملياً."
        },
        {
          "name_ar": "الانحراف المعياري (Standard Deviation - σ)",
          "name_en": "Standard Deviation (SD)",
          "formula": "σ = √ Variance",
          "desc_ar": "الجذر التربيعي للتباين، وهو المقياس الأكثر شهرة واستخداماً لأنه يعود لنفس وحدة قياس البيانات الأصلية.",
          "example": "في التوزيع الطبيعي: 68% من البيانات تقع ضمن ±1 انحراف معياري، و 95% ضمن ±2 انحراف معياري."
        },
        {
          "name_ar": "المدى الربيعي (Interquartile Range - IQR)",
          "name_en": "Interquartile Range (IQR)",
          "formula": "IQR = Q3 - Q1",
          "desc_ar": "الفرق بين الربيع الثالث (المئوي 75) والربيع الأول (المئوي 25)، ويمثل انتشار الـ 50% الوسطى من البيانات.",
          "example": "هو أساس اكتشاف القيم الشاذة (Outliers) في Box Plot: أي قيمة خارج [Q1 - 1.5×IQR, Q3 + 1.5×IQR] تعتبر قيمة متطرفة!"
        }
      ]
    },
    {
      "id": "distributions",
      "number": 5,
      "title_ar": "التوزيعات الاحتمالية الشائعة (Probability Distributions)",
      "title_en": "Common Probability Distributions",
      "icon": "🔔",
      "items": [
        {
          "name_ar": "التوزيع الطبيعي (Normal Distribution)",
          "name_en": "Normal / Gaussian Distribution",
          "shape": "شكل الجرس المتماثل (Bell-shaped curve)",
          "desc_ar": "التوزيع الأكثر أهمية وشيوعاً في الظواهر الطبيعية والبشرية (الطول، الذكاء، أخطاء القياس). يتطابق فيه المتوسط والوسيط والمنوال في المركز تماماً.",
          "use_case": "التحليل الاستدلالي واختبارات الفرضيات والتنبؤ."
        },
        {
          "name_ar": "التوزيع الثنائي (Binomial Distribution)",
          "name_en": "Binomial Distribution",
          "shape": "توزيع متقطع للاحتمالات الثنائية",
          "desc_ar": "يصف عدد مرات النجاح في عدد ثابت من التجارب المستقلة ذات الخيارين فقط (نجاح / فشل، نعم / لا، تحويل / عدم تحويل).",
          "use_case": "اختبارات A/B Testing، نسبة النقر للظهور (CTR)، ومعدلات إتمام المعاملات."
        },
        {
          "name_ar": "توزيع بواسون (Poisson Distribution)",
          "name_en": "Poisson Distribution",
          "shape": "توزيع للأحداث النادرة عبر الزمن",
          "desc_ar": "يصف عدد مرات حدوث حدث نادر ومستقل خلال فترة زمنية محددة أو مساحة جغرافية ثابتة بمعدل ثابت معروف (λ).",
          "use_case": "عدد زوار الموقع في الدقيقة، عدد مكالمات مركز الدعم في الساعة، وعدد الأعطال في الأسبوع."
        }
      ]
    },
    {
      "id": "hypothesis_tests",
      "number": 6,
      "title_ar": "الاختبارات الإحصائية الأساسية (Basic Statistical Tests)",
      "title_en": "Basic Statistical Tests (Hypothesis Testing)",
      "icon": "⚖️",
      "tests": [
        {
          "name_ar": "اختبار تي (t-test)",
          "name_en": "Student's t-test",
          "purpose_ar": "مقارنة متوسط مجموعتين اثنتين لتحديد هل الفرق بينهما ذو دلالة إحصائية حقيقية أم مجرد صدفة.",
          "example": "مقارنة متوسط درجات فصلين دراسيين، أو مقارنة مبيعات صفحة الهبوط القديمة والجديدة في A/B Test."
        },
        {
          "name_ar": "اختبار كاي تربيع (Chi-Square Test - χ²)",
          "name_en": "Chi-Square Test (χ²)",
          "purpose_ar": "فحص ودراسة العلاقة والاستقلالية بين متغيرين وصفيين فئويين (Two Categorical Variables).",
          "example": "فحص هل تفضيل منتج معين (هاتف / تابلت) مرتبط بجنس العميل (ذكر / أنثى)."
        },
        {
          "name_ar": "تحليل التباين (ANOVA - Analysis of Variance)",
          "name_en": "ANOVA (One-Way / Two-Way)",
          "purpose_ar": "مقارنة متوسط أكثر من مجموعتين في وقت واحد (3 مجموعات أو أكثر) لتفادي أخطاء تكرار اختبار t-test.",
          "example": "مقارنة كفاءة 3 أدوية مختلفة، أو مقارنة متوسط مبيعات 4 مناطق جغرافية مختلفة."
        }
      ]
    },
    {
      "id": "correlation_regression",
      "number": 7,
      "title_ar": "الارتباط والانحدار (Correlation & Regression)",
      "title_en": "Correlation & Linear Regression",
      "icon": "📉",
      "concepts": [
        {
          "name_ar": "الارتباط (Correlation - r)",
          "name_en": "Correlation (Pearson's r)",
          "range": "-1.0 <= r <= +1.0",
          "desc_ar": "يقيس قوة واتجاه العلاقة الخطية بين متغيرين كميين:\n• r > 0 : علاقة طردية موجبة (كلما زاد الأول زاد الثاني).\n• r < 0 : علاقة عكسية سالبة (كلما زاد الأول نقص الثاني).\n• r = 0 : لا توجد علاقة خطية إطلاقاً.",
          "golden_warning": "⚠️ الارتباط لا يعني السببية حتماً (Correlation does NOT imply Causation)!"
        },
        {
          "name_ar": "الانحدار الخطي (Linear Regression)",
          "name_en": "Linear Regression Model",
          "formula": "y = a + b·x",
          "desc_ar": "نموذج رياضي للتنبؤ بقيمة المتغير التابع (y) اعتماداً على قيمة المتغير المستقل (x).\n• y: المتغير المراد التنبؤ به (Dependent variable مثل المبيعات).\n• x: المتغير المؤثر (Independent variable مثل ميزانية الإعلانات).\n• a: نقطة التقاطع مع محور الصادات (Intercept).\n• b: ميل الخط المستقيم / معامل التأثير (Slope)."
        }
      ]
    },
    {
      "id": "steps",
      "number": 8,
      "title_ar": "خطوات التحليل الإحصائي في تحليل البيانات",
      "title_en": "Steps of Statistical Analysis in Data Analysis",
      "icon": "🧭",
      "process": [
        {
          "num": "1",
          "title_ar": "تحديد السؤال أو المشكلة",
          "title_en": "Define the Question or Business Problem"
        },
        {
          "num": "2",
          "title_ar": "جمع البيانات المناسبة",
          "title_en": "Collect Relevant Data"
        },
        {
          "num": "3",
          "title_ar": "استكشاف وفحص البيانات (EDA)",
          "title_en": "Exploratory Data Analysis (EDA)"
        },
        {
          "num": "4",
          "title_ar": "التحليل الإحصائي وتطبيق النماذج",
          "title_en": "Statistical Modeling & Testing"
        },
        {
          "num": "5",
          "title_ar": "تفسير النتائج بالأدلة",
          "title_en": "Interpret Results with Confidence"
        },
        {
          "num": "6",
          "title_ar": "عرض النتائج واتخاذ القرار",
          "title_en": "Present Insights & Drive Action"
        }
      ]
    }
  ]
};
