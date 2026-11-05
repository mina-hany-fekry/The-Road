// DataMaster - Study Curriculum (43 Study Days)
const INITIAL_CURRICULUM = [
  // Week 1
  {
    id: 1, originalDay: 1, defaultDate: "2026-11-03", dayAr: "الثلاثاء", week: 1,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "مقدمة لقواعد البيانات واستعلامات SELECT",
      tag: "SQL Basics",
      details: "مفهوم قواعد البيانات العلائقية (RDBMS)، جملة SELECT، استرجاع الأعمدة، إزالة التكرار بـ DISTINCT، واستخدام الأسماء المستعارة AS.",
      exercise: "استخراج قائمة أسماء العملاء والدول بدون تكرار من جدول Customers."
    },
    python: {
      topic: "بيئة العمل ومتغيرات بايثون",
      lib: "Python Core",
      details: "تثبيت بيئة العمل (Jupyter / VS Code)، المتغيرات، أنواع البيانات الأساسية (int, float, str, bool)، تحويل الأنواع، والطباعة بـ f-strings.",
      exercise: "بناء برنامج بسيط لحساب إجمالي الفاتورة مع الضريبة وطباعة تقرير نصي منسق."
    }
  },
  {
    id: 2, originalDay: 2, defaultDate: "2026-11-04", dayAr: "الأربعاء", week: 1,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "تصفية البيانات (WHERE Clause)",
      tag: "SQL Basics",
      details: "فلترة السجلات بـ WHERE، المعاملات الحسابية والمقارنة (=, !=, <, >, <=, >=)، المعاملات المنطقية (AND, OR, NOT) وترتيب الأسبقية.",
      exercise: "استخراج جميع الطلبات التي تزيد قيمتها عن 500$ وتمت في عام 2026."
    },
    python: {
      topic: "هياكل البيانات: القوائم والصفوف (Lists & Tuples)",
      lib: "Python Core",
      details: "القوائم (Lists): الإضافة، الحذف، التقطيع (Slicing). الصفوف (Tuples) ومفهوم الثبات وعدم التعديل (Immutability).",
      exercise: "تخزين أسعار المنتجات في قائمة وحساب أعلى وأقل سعر ومتوسط الأسعار يدوياً."
    }
  },
  {
    id: 3, originalDay: 3, defaultDate: "2026-11-05", dayAr: "الخميس", week: 1,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "معاملات التصفية المتقدمة والبحث النصي",
      tag: "SQL Basics",
      details: "المعاملات: IN للتحقق من قائمة قيم، BETWEEN للنطاقات، البحث النصي بـ LIKE و Wildcards (% , _)، والتعامل مع القيم المفقودة IS NULL / IS NOT NULL.",
      exercise: "البحث عن موظفين تبدأ أسماؤهم بحرف A ورواتبهم بين 3000$ و 6000$."
    },
    python: {
      topic: "هياكل البيانات: القواميس والمجموعات (Dicts & Sets)",
      lib: "Python Core",
      details: "القواميس (Dictionaries): مفاتيح وقيم، دوال keys(), values(), items(), get(). المجموعات (Sets): التميز ومنع التكرار وعمليات المجموعات الرياضية.",
      exercise: "تخزين سجلات مستخدم في قاموس وفلترة المهارات الفريدة باستخدام Set."
    }
  },

  // Week 2
  {
    id: 4, originalDay: 4, defaultDate: "2026-11-08", dayAr: "الأحد", week: 2,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "الترتيب والتحديد (ORDER BY & LIMIT)",
      tag: "SQL Basics",
      details: "ترتيب النتائج تصاعدياً وتنازلياً (ASC / DESC)، الترتيب بأعمدة متعددة، وتحديد عدد الصفوف بـ LIMIT وتخطي الصفوف بـ OFFSET.",
      exercise: "استخراج أعلى 5 منتجات مبيعاً من حيث السعر بعد ترتيبها تنازلياً."
    },
    python: {
      topic: "التحكم في التدفق: الشروط والحلقات التكرارية",
      lib: "Python Core",
      details: "الجمل الشرطية (if, elif, else)، الحلقات التكرارية (for, while)، واستخدام break, continue, enumerate, zip.",
      exercise: "فرز قائمة درجات حرارة وتصنيفها إلى (حار، معتدل، بارد) واستخراج القيم الشاذة."
    }
  },
  {
    id: 5, originalDay: 5, defaultDate: "2026-11-09", dayAr: "الإثنين", week: 2,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "الدوال التجميعية الأساسية (Aggregate Functions)",
      tag: "SQL Aggregations",
      details: "الدوال الإحصائية: COUNT(), COUNT(DISTINCT), SUM(), AVG(), MIN(), MAX() وقواعد تطبيقها على الأعمدة المختلفة.",
      exercise: "حساب إجمالي المبيعات، متوسط سعر المنتجات، والعدد الكلي للعملاء الفعليين."
    },
    python: {
      topic: "الدوال وتطبيقاتها (Functions & Lambdas)",
      lib: "Python Core",
      details: "إنشاء الدوال def، المعاملات الافتراضية، *args و **kwargs، نطاق المتغيرات (Scope)، والدوال المجهولة Lambda مع map و filter.",
      exercise: "كتابة دالة تقبل قائمة أسعار وتطبق نسبة خصم متغيرة وتعيد القيم بعد الخصم."
    }
  },
  {
    id: 6, originalDay: 6, defaultDate: "2026-11-10", dayAr: "الثلاثاء", week: 2,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "تجميع البيانات باستخدام GROUP BY",
      tag: "SQL Aggregations",
      details: "مفهوم التجميع الفئوي، كيفية تقسيم البيانات لمجموعات وحساب الإحصائيات لكل فئة، وقاعدة الأعمدة المسموح بظهورها في SELECT.",
      exercise: "حساب إجمالي المبيعات وعدد الطلبات لكل دولة ومحافظة."
    },
    python: {
      topic: "List/Dict Comprehensions ومعالجة الأخطاء",
      lib: "Python Core",
      details: "كتابة الأكواد بأسلوب Pythonic أنيق ومختصر بـ Comprehensions، والتعامل الآمن مع الأخطاء عبر try / except / finally.",
      exercise: "تنظيف قائمة نصوص بها أرقام مدمجة وتحويلها لأرقام صحيحة وتجاوز المدخلات الخاطئة."
    }
  },
  {
    id: 7, originalDay: 7, defaultDate: "2026-11-11", dayAr: "الأربعاء", week: 2,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "فلترة المجموعات باستخدام HAVING",
      tag: "SQL Aggregations",
      details: "الفرق الجوهري بين WHERE (قبل التجميع) و HAVING (بعد التجميع)، شروط تصفية المجاميع التراكمية.",
      exercise: "استخراج الفئات التي تجاوز إجمالي إيراداتها 100,000$ ولديها أكثر من 50 طلب مكتمل."
    },
    python: {
      topic: "التعامل مع الملفات والبيئات الافتراضية",
      lib: "Python Core",
      details: "قراءة وكتابة ملفات CSV و JSON برمجياً بمكتبات بايثون القياسية، إنشاء بيئة افتراضية venv وتثبيت حزم Data Science باستخدام pip.",
      exercise: "قراءة ملف بيانات مبيعات CSV وحساب إحصائيات سريعة وتصدير ملخص كـ JSON."
    }
  },
  {
    id: 8, originalDay: 8, defaultDate: "2026-11-12", dayAr: "الخميس", week: 2,
    phase: "المرحلة 1: التأسيس وقواعد الاستعلام",
    sql: {
      topic: "تطبيقات عملية ومسائل على الدوال التجميعية",
      tag: "SQL Practice",
      details: "حل مسائل عملية من منصات المقابلات التقنية (LeetCode / HackerRank) تركز على استعلامات التجميع والتقارير المالية.",
      exercise: "كتابة استعلام لحساب متوسط قيمة الفاتورة الشهرية ومتوسط إنفاق كل عميل."
    },
    python: {
      topic: "🚀 انطلاقة NumPy: إنشاء المصفوفات وهياكلها",
      lib: "NumPy",
      details: "مفهوم ndarray، أهمية NumPy في سرعة الحسابات الرياضية، إنشاء المصفوفات: np.array, np.zeros, np.ones, np.arange, np.linspace، فحص shape, dtype, ndim.",
      exercise: "إنشاء مصفوفات 1D و 2D وفحص أبعادها وأنواع بياناتها والتحويل بينها."
    }
  },

  // Week 3
  {
    id: 9, originalDay: 9, defaultDate: "2026-11-15", dayAr: "الأحد", week: 3,
    phase: "المرحلة 2: ربط الجداول ومكتبات الحسابات",
    sql: {
      topic: "المفاهيم العلائقية والمفاتيح (Keys & ERD)",
      tag: "SQL Joins",
      details: "مفهوم العلاقات (One-to-One, One-to-Many, Many-to-Many)، المفتاح الأساسي (Primary Key)، المفتاح الأجنبي (Foreign Key)، وقراءة مخططات ERD.",
      exercise: "رسم مخطط علائقي مبسط لنظام متجر إلكتروني يوضح العلاقات بين المستخدم والطلب والمنتج."
    },
    python: {
      topic: "تقطيع وفهرسة مصفوفات NumPy",
      lib: "NumPy",
      details: "فهرسة المصفوفات متعددة الأبعاد، التقطيع (Slicing)، والفهرسة الشرطية (Boolean Masking) وفلترة الأرقام بناءً على شروط منطقية.",
      exercise: "استخراج كل القيم الأكبر من المتوسط من مصفوفة أبعادها 5x5 واستبدال القيم السالبة بأصفار."
    }
  },
  {
    id: 10, originalDay: 10, defaultDate: "2026-11-16", dayAr: "الإثنين", week: 3,
    phase: "المرحلة 2: ربط الجداول ومكتبات الحسابات",
    sql: {
      topic: "الربط الداخلي (INNER JOIN)",
      tag: "SQL Joins",
      details: "صيغة ربط جدولين بناء على مفتاح مشترك (ON)، تصفية النتائج المشتركة، وتجنب مشاكل تكرار الأعمدة باستخدام Aliases.",
      exercise: "ربط جدول الطلبات Orders مع جدول العملاء Customers واستخراج اسم كل عميل وقيمة طلبه."
    },
    python: {
      topic: "العمليات الرياضية المتجهة ومفهوم Broadcasting",
      lib: "NumPy",
      details: "العمليات الحسابية بدون حلقات تكرارية (Vectorized Math)، قواعد الـ Broadcasting لدمج مصفوفات ذات أبعاد مختلفة بسرعة فائقة.",
      exercise: "تطبيق معادلة التوحيد القياسي (Standardization) على مصفوفة درجات كاملة في خطوة واحدة."
    }
  },
  {
    id: 11, originalDay: 11, defaultDate: "2026-11-17", dayAr: "الثلاثاء", week: 3,
    phase: "المرحلة 2: ربط الجداول ومكتبات الحسابات",
    sql: {
      topic: "الربط الخارجي الأيسر (LEFT JOIN)",
      tag: "SQL Joins",
      details: "أهمية LEFT JOIN في الحفاظ على جميع صفوف الجدول الأساسي (Left Table)، وكشف السجلات التي لا تحتوي على بيانات مقابلة (معالجة NULLs).",
      exercise: "استخراج جميع العملاء حتى أولئك الذين لم يقوموا بأي عملية شراء حتى الآن."
    },
    python: {
      topic: "الدوال الإحصائية المتقدمة في NumPy",
      lib: "NumPy",
      details: "الدوال الإحصائية الشاملة: np.mean, np.median, np.std, np.var, np.percentile، ودوال البحث عن مواقع القيم: np.argmax, np.argmin.",
      exercise: "حساب المئينات (Percentiles) وتحديد مؤشر أعلى قيمة وأقل قيمة في بيانات تجريبية."
    }
  },
  {
    id: 12, originalDay: 12, defaultDate: "2026-11-18", dayAr: "الأربعاء", week: 3,
    phase: "المرحلة 2: ربط الجداول ومكتبات الحسابات",
    sql: {
      topic: "الربط الأيمن والكامل (RIGHT & FULL JOIN)",
      tag: "SQL Joins",
      details: "مفهوم RIGHT JOIN و FULL OUTER JOIN، متى تستخدم كل منهما، والفروق العملية وكيفية محاكاة FULL JOIN في الأنظمة التي لا تدعمه.",
      exercise: "استخراج تقرير كامل يدمج المنتجات التي لم تُبع والطلبات التي ليس لها منتج مسجل."
    },
    python: {
      topic: "إعادة التشكيل ودمج المصفوفات والجبر الخطي",
      lib: "NumPy",
      details: "إعادة التشكيل: reshape, flatten, ravel. الدمج: concatenate, vstack, hstack. مقدمة الجبر الخطي: الضرب المصفوفي (np.dot, @).",
      exercise: "ضرب مصفوفة ميزات (Features) في مصفوفة أوزان (Weights) لمحاكاة تنبؤ نموذج خطي."
    }
  },
  {
    id: 13, originalDay: 13, defaultDate: "2026-11-19", dayAr: "الخميس", week: 3,
    phase: "المرحلة 2: ربط الجداول ومكتبات الحسابات",
    sql: {
      topic: "الربط الذاتي والديكارتي (Self Join & CROSS JOIN)",
      tag: "SQL Joins",
      details: "ربط الجدول بنفسه (Self Join) لتمثيل الهياكل الهرمية (مثل الموظف ومديره)، ومفهوم الضرب الديكارتي (CROSS JOIN) لتوليد كل التوافيق الممكنة.",
      exercise: "استخراج قائمة بكل موظف واسم المدير المباشر له من نفس جدول الموظفين Employees."
    },
    python: {
      topic: "🐼 انطلاقة Pandas: السلاسل والجداول (Series & DataFrame)",
      lib: "Pandas",
      details: "التعرف على هياكل بيانات Pandas: السلسلة (Series) والجدول (DataFrame)، قراءة ملفات CSV بـ pd.read_csv() وقراءة ملفات Excel.",
      exercise: "تحميل مجموعة بيانات مبيعات أو درجات وتكوين DataFrame وطباعة ملخص عام عن البيانات."
    }
  },

  // Week 4
  {
    id: 14, originalDay: 14, defaultDate: "2026-11-22", dayAr: "الأحد", week: 4,
    phase: "المرحلة 3: تنظيف ومعالجة البيانات المتقدمة",
    sql: {
      topic: "ربط الجداول المتعددة (Multi-table Joins)",
      tag: "SQL Joins",
      details: "ربط 3 إلى 5 جداول في استعلام تحليلي متكامل (العملاء + الطلبات + تفاصيل الطلب + المنتجات + الفئات).",
      exercise: "استخراج تقرير يوضح اسم العميل، والمنتجات التي اشتراها، وفئتها، وإجمالي ما دفعه لكل فئة."
    },
    python: {
      topic: "فحص واستكشاف البيانات في Pandas",
      lib: "Pandas",
      details: "دوال الفحص السريع: .head(), .tail(), .info(), .describe(), .shape, .columns, .dtypes, وفحص استهلاك الذاكرة.",
      exercise: "إجراء فحص أولي لمجموعة بيانات واقعية (مثل Titanic أو Housing) واستخراج الإحصائيات الوصفية."
    }
  },
  {
    id: 15, originalDay: 15, defaultDate: "2026-11-23", dayAr: "الإثنين", week: 4,
    phase: "المرحلة 3: تنظيف ومعالجة البيانات المتقدمة",
    sql: {
      topic: "عمليات المجموعات (UNION & UNION ALL)",
      tag: "SQL Sets",
      details: "دمج نتائج عدة استعلامات عمودياً باستخدام UNION (إلغاء المكرر) و UNION ALL (الاحتفاظ بالمكرر)، وشروط توافق الأعمدة وأنواع البيانات.",
      exercise: "دمج سجلات العملاء النشطين من جدول المبيعات القديم مع جدول المبيعات الجديد في تقرير موحد."
    },
    python: {
      topic: "الفهرسة والفلترة الدقيقة (.loc & .iloc)",
      lib: "Pandas",
      details: "الوصول للبيانات بواسطة التسميات عبر .loc والوصول بواسطة الفهارس الرقمية عبر .iloc، والتصفية بشرط متعدد ودالة .query().",
      exercise: "فلترة الصفوف التي تنطبق عليها عدة شروط واستخراج أعمدة محددة فقط وإجراء تعديل على قيمها."
    }
  },
  {
    id: 16, originalDay: 16, defaultDate: "2026-11-24", dayAr: "الثلاثاء", week: 4,
    phase: "المرحلة 3: تنظيف ومعالجة البيانات المتقدمة",
    sql: {
      topic: "الجمل الشرطية (CASE WHEN)",
      tag: "SQL Conditional",
      details: "بناء منطق شرطي داخل الاستعلام: CASE WHEN condition THEN result ELSE default END، وتصنيف السجلات وإنشاء مؤشرات تحويلية.",
      exercise: "تصنيف العملاء إلى (VIP، متوسط، عادي) بناءً على إجمالي قيمة مشترياتهم."
    },
    python: {
      topic: "إدارة وتعديل الأعمدة والصفوف في Pandas",
      lib: "Pandas",
      details: "إنشاء أعمدة جديدة مشتقة، حذف الأعمدة والصفوف بـ .drop()، إعادة تسمية الأعمدة بـ .rename()، وفرز البيانات بـ .sort_values().",
      exercise: "حساب عمود جديد للربح الصافي وترتيب البيانات حسب أعلى ربح وإعادة تسمية الأعمدة لتصبح مفهومة."
    }
  },
  {
    id: 17, originalDay: 17, defaultDate: "2026-11-25", dayAr: "الأربعاء", week: 4,
    phase: "المرحلة 3: تنظيف ومعالجة البيانات المتقدمة",
    sql: {
      topic: "دوال النصوص (String Functions)",
      tag: "SQL Functions",
      details: "دوال التعامل مع النصوص: CONCAT, SUBSTRING, LENGTH, TRIM, UPPER, LOWER, REPLACE، وتقسيم النصوص والبحث المتقدم.",
      exercise: "دمج الاسم الأول والأخير للعميل في عمود واحد، وتنظيف المسافات الزائدة واستخراج كود المنطقة من البريد."
    },
    python: {
      topic: "التعامل مع القيم المفقودة (Handling Missing Data)",
      lib: "Pandas",
      details: "اكتشاف القيم الفارغة بـ .isna() و .sum()، استراتيجيات الحذف بـ .dropna()، واستراتيجيات التعويض بـ .fillna() بالمتوسط أو الوسيط.",
      exercise: "فحص نسبة القيم المفقودة في كل عمود وتعويض الأعمدة الرقمية بالوسيط والأعمدة النصية بالقيمة الأكثر تكراراً (Mode)."
    }
  },
  {
    id: 18, originalDay: 18, defaultDate: "2026-11-26", dayAr: "الخميس", week: 4,
    phase: "المرحلة 3: تنظيف ومعالجة البيانات المتقدمة",
    sql: {
      topic: "تطبيق عملي: تقارير الأداء المالي والشرائح",
      tag: "SQL Practice",
      details: "دمج مهارات Joins و CASE WHEN ودوال النصوص لبناء تقرير مالي شامل يقسم المبيعات حسب الشرائح الجغرافية والعملاء.",
      exercise: "بناء استعلام لحساب الإيرادات ونسبة العملاء المميزين لكل فرع تجاري."
    },
    python: {
      topic: "تنظيف النصوص وإزالة التكرارات",
      lib: "Pandas",
      details: "العمليات النصية المتجهة عبر .str (lower, strip, replace, contains)، إزالة التكرارات عبر .drop_duplicates()، وتعديل الأنواع عبر .astype().",
      exercise: "تنظيف جدول يحتوي على نصوص غير منتظمة وتكرارات في أرقام الهواتف وتوحيد صيغة التواريخ."
    }
  },

  // Week 5
  {
    id: 19, originalDay: 19, defaultDate: "2026-11-29", dayAr: "الأحد", week: 5,
    phase: "المرحلة 4: التحليل الزمني والرسومات البيانية",
    sql: {
      topic: "دوال التواريخ والوقت (Date & Time)",
      tag: "SQL Dates",
      details: "التعامل مع الحقول الزمنية: EXTRACT, DATE_PART, DATEADD, DATEDIFF, DATE_TRUNC، واستخراج اليوم والشهر والسنة.",
      exercise: "حساب الفارق الزمني بالأيام بين تاريخ إنشاء الحساب وتاريخ أول طلب، وتجميع المبيعات شهرياً."
    },
    python: {
      topic: "التجميع الفئوي في Pandas (.groupby)",
      lib: "Pandas",
      details: "مفهوم Split-Apply-Combine، استخدام .groupby() لحساب المجاميع والمتوسطات لكل فئة، والوصول للمجموعات الفردية.",
      exercise: "حساب متوسط أسعار المبيعات وإجمالي عدد الوحدات المباعة لكل فئة منتجات."
    }
  },
  {
    id: 20, originalDay: 20, defaultDate: "2026-11-30", dayAr: "الإثنين", week: 5,
    phase: "المرحلة 4: التحليل الزمني والرسومات البيانية",
    sql: {
      topic: "الدوال الرياضية وتحويل الأنواع (Math & Casting)",
      tag: "SQL Functions",
      details: "الدوال الرقمية: ROUND, CEIL, FLOOR, ABS, POWER, SQRT، والتحويل بين الأنواع باستخدام CAST(... AS ...) أو CONVERT.",
      exercise: "حساب نسبة الخصم المئوية بدقة وتقريب النتائج لمنزلتين عشريتين مع تحويل البيانات النصية لأرقام."
    },
    python: {
      topic: "التجميع المتقدم والمؤشرات المتعددة (.agg)",
      lib: "Pandas",
      details: "استخدام دالة .agg() لتطبيق دوال مختلفة على أعمدة مختلفة، وتسمية الأعمدة المجمعة بـ Named Aggregations.",
      exercise: "تطبيق .agg() لحساب (الحد الأدنى، الأقصى، المتوسط، والانحراف المعياري) في جدول موحد."
    }
  },
  {
    id: 21, originalDay: 21, defaultDate: "2026-12-01", dayAr: "الثلاثاء", week: 5,
    phase: "المرحلة 4: التحليل الزمني والرسومات البيانية",
    sql: {
      topic: "معالجة القيم الفارغة المتقدمة (COALESCE & NULLIF)",
      tag: "SQL Functions",
      details: "استخدام COALESCE لتحديد قيمة بديلة عند وجود NULL، واستخدام NULLIF لتجنب أخطاء القسمة على صفر (Division by Zero).",
      exercise: "حساب متوسط معدل التحويل مع ضمان عدم حدوث خطأ عند وجود أصفار في عدد الزيارات عبر NULLIF."
    },
    python: {
      topic: "دمج وربط الجداول في Pandas (Merge & Concat)",
      lib: "Pandas",
      details: "ربط الجداول بواسطة الأعمدة بـ pd.merge() (أنواع: inner, left, right, outer)، ودمج الجداول عمودياً وأفقياً بـ pd.concat().",
      exercise: "دمج جدول العملاء مع جدول المعاملات وتحديد السجلات التي لم تحدث فيها أي معاملات."
    }
  },
  {
    id: 22, originalDay: 22, defaultDate: "2026-12-02", dayAr: "الأربعاء", week: 5,
    phase: "المرحلة 4: التحليل الزمني والرسومات البيانية",
    sql: {
      topic: "تحليل الأفواج ومعدلات الاستبقاء (Cohort Analysis)",
      tag: "SQL Analytics",
      details: "مفهوم مجموعات الأفواج (Cohorts) بناءً على تاريخ التسجيل، تتبع سلوك المستخدمين شهرياً وحساب معدل الاستبقاء (Retention).",
      exercise: "كتابة استعلام لحساب عدد المستخدمين الذين قاموا بالشراء في الشهر الثاني والثالث بعد تاريخ تسجيلهم."
    },
    python: {
      topic: "إعادة تشكيل البيانات: Pivot Tables & Melt",
      lib: "Pandas",
      details: "إنشاء الجداول المحورية pd.pivot_table() مع هوامش المجاميع، وعكس الجداول من النمط العريض (Wide) إلى الطويل (Long) بـ pd.melt().",
      exercise: "تحويل تقرير مبيعات سنوي يحتوي على أعمدة للشهور إلى جدول طولي مناسب للرسم البياني."
    }
  },
  {
    id: 23, originalDay: 23, defaultDate: "2026-12-03", dayAr: "الخميس", week: 5,
    phase: "المرحلة 4: التحليل الزمني والرسومات البيانية",
    sql: {
      topic: "الاستعلامات الفرعية البسيطة (Subqueries in WHERE)",
      tag: "SQL Subqueries",
      details: "الاستعلامات الفرعية القياسية (Scalar Subqueries)، استخدام الاستعلامات مع المعاملات IN, NOT IN, ANY, ALL.",
      exercise: "استخراج جميع الموظفين الذين تزيد رواتبهم عن متوسط رواتب قسمهم بالكامل."
    },
    python: {
      topic: "📊 انطلاقة Matplotlib: أساسيات الرسم البياني",
      lib: "Matplotlib",
      details: "هيكل المكتبة: Figure و Axes، رسم المخططات الأساسية (Line Plot, Bar Chart, Scatter Plot, Histogram)، ضبط العناوين والمحاور.",
      exercise: "رسم مخطط خطي لتطور المبيعات اليومية ومخطط أعمدة لمقارنة مبيعات الفئات المختلفة مع تخصيص الألوان."
    }
  },

  // Week 6
  {
    id: 24, originalDay: 24, defaultDate: "2026-12-06", dayAr: "الأحد", week: 6,
    phase: "المرحلة 5: الاستعلامات المتقدمة والتحليل الاستكشفي EDA",
    sql: {
      topic: "الاستعلامات الفرعية المترابطة و EXISTS",
      tag: "SQL Subqueries",
      details: "الاستعلامات المترابطة (Correlated Subqueries) التي تعتمد على صفوف الجدول الخارجي، واستخدام معاملات الكفاءة EXISTS و NOT EXISTS.",
      exercise: "استخراج العملاء الذين قاموا بطلب منتج واحد على الأقل ينتمي لفئة الإلكترونيات باستخدام EXISTS."
    },
    python: {
      topic: "تنسيق متقدم ورسوم بيانية متعددة (Subplots)",
      lib: "Matplotlib",
      details: "إنشاء لوحات متعددة الرسوم بـ plt.subplots()، التحكم في التباعد، إضافة شبكة الدلالة (Grid)، شريط المفاتيح (Legend)، وحفظ الصور عالية الدقة.",
      exercise: "إنشاء لوحة مصفوفة (2x2) تعرض 4 رسوم بيانية مختلفة لملخص بيانات مالي وتصديرها كملف PNG."
    }
  },
  {
    id: 25, originalDay: 25, defaultDate: "2026-12-07", dayAr: "الإثنين", week: 6,
    phase: "المرحلة 5: الاستعلامات المتقدمة والتحليل الاستكشفي EDA",
    sql: {
      topic: "التعبيرات الجدولية العامة (CTEs - Common Table Expressions)",
      tag: "SQL CTEs",
      details: "صياغة جملة WITH، فوائد الـ CTE في جعل الكود مقروءاً وقابلاً للصيانة، وإعادة استخدام النتائج المرحلية داخل نفس الاستعلام.",
      exercise: "إعادة كتابة استعلام مركب متعدد المستويات باستخدام CTE لحساب معدلات النمو وتصنيف العملاء."
    },
    python: {
      topic: "🎨 انطلاقة Seaborn: التوزيعات الإحصائية",
      lib: "Seaborn",
      details: "مميزات Seaborn في الرسم الإحصائي، مخططات التوزيع: sns.histplot, sns.kdeplot، ومخططات الكشف عن القيم الشاذة: sns.boxplot, sns.violinplot.",
      exercise: "رسم توزيع أعمار الركاب وأسعار التذاكر واكتشاف القيم الشاذة (Outliers) باستخدام Boxplot."
    }
  },
  {
    id: 26, originalDay: 26, defaultDate: "2026-12-08", dayAr: "الثلاثاء", week: 6,
    phase: "المرحلة 5: الاستعلامات المتقدمة والتحليل الاستكشفي EDA",
    sql: {
      topic: "التعبيرات الجدولية المتسلسلة (Chained CTEs)",
      tag: "SQL CTEs",
      details: "بناء خطوط معالجة وتحويل بيانات (ETL) داخل SQL باستخدام عدة CTEs متسلسلة تفصل بين مراحل الفلترة والتجميع والتقرير.",
      exercise: "بناء استعلام بـ 3 CTEs متتالية: الأولى لتنظيف البيانات، الثانية لحساب المؤشرات، والثالثة لعرض التقرير النهائي."
    },
    python: {
      topic: "العلاقات والخرائط الحرارية (Heatmaps & Pairplots)",
      lib: "Seaborn",
      details: "تحليل العلاقات بين المتغيرات: sns.scatterplot مع تلوين hue، حساب مصفوفة الارتباط (.corr()) ورسم الخريطة الحرارية sns.heatmap، ورسم sns.pairplot.",
      exercise: "إنشاء خريطة حرارية مصفوفية لمعاملات الارتباط بين ميزات العقارات لتحديد العوامل الأكثر تأثيراً في السعر."
    }
  },
  {
    id: 27, originalDay: 27, defaultDate: "2026-12-09", dayAr: "الأربعاء", week: 6,
    phase: "المرحلة 5: الاستعلامات المتقدمة والتحليل الاستكشفي EDA",
    sql: {
      topic: "التعبيرات التكرارية (Recursive CTEs)",
      tag: "SQL CTEs",
      details: "بنية الـ Recursive CTE (Anchor Member + Recursive Member)، تطبيقات على الأشجار الهرمية، وتوليد سلاسل التواريخ لسد الفجوات الزمنية.",
      exercise: "توليد جدول تقويم يحتوي على جميع تواريخ العام الحالي وربطه بالمبيعات لإظهار الأيام التي لم تحدث فيها مبيعات."
    },
    python: {
      topic: "تحليل السلاسل الزمنية في Pandas (Time Series)",
      lib: "Pandas",
      details: "التعامل مع التواريخ بـ pd.to_datetime()، ضبط التاريخ كفهرس (DatetimeIndex)، وإعادة التجميع الزمني بـ .resample()، والمتوسطات المتحركة بـ .rolling().",
      exercise: "حساب المتوسط المتحرك للمبيعات على مدى 7 أيام و 30 يوماً ورسم المنحنى البياني لاكتشاف الاتجاه العام (Trend)."
    }
  },
  {
    id: 28, originalDay: 28, defaultDate: "2026-12-10", dayAr: "الخميس", week: 6,
    phase: "المرحلة 5: الاستعلامات المتقدمة والتحليل الاستكشفي EDA",
    sql: {
      topic: "الجداول الافتراضية (Views & Materialized Views)",
      tag: "SQL Architecture",
      details: "إنشاء الـ Views (CREATE VIEW)، تحديثها وحذفها، فوائدها للأمان وتجريد البيانات المعقدة، والفرق بين الـ View والـ Materialized View.",
      exercise: "إنشاء View تحليلية لعرض مؤشرات أداء المبيعات شهرياً وتأمين الوصول لأعمدة الرواتب الحساسة."
    },
    python: {
      topic: "🚀 مشروع عملي استكشافي كامل (Full EDA Project)",
      lib: "Pandas + Seaborn",
      details: "تطبيق شامل: تحميل مجموعة بيانات واقعية، فحصها، تنظيف البيانات المفقودة والشاذة، تحليل المتغيرات الفردية والمركبة، وتدوين الملاحظات الاستنتاجية.",
      exercise: "إنهاء مشروع استكشافي ونشر كود الـ EDA مع رسومات بيانية واضحة وخلاصة أعمال تنفيذية."
    }
  },

  // Week 7
  {
    id: 29, originalDay: 29, defaultDate: "2026-12-13", dayAr: "الأحد", week: 7,
    phase: "المرحلة 6: الدوال النافذية وأساسيات تعلم الآلة",
    sql: {
      topic: "🪟 مدخل الدوال النافذية (Window Functions)",
      tag: "SQL Window Functions",
      details: "مفهوم الدوال التحليلية النافذية، جملة OVER()، التقسيم بـ PARTITION BY، والترتيب بـ ORDER BY، والفرق بين التجميع العادي والدوال النافذية.",
      exercise: "حساب نسبة مبيعات كل طلب مقارنة بإجمالي مبيعات القسم دون تقليص عدد الصفوف."
    },
    python: {
      topic: "🤖 انطلاقة Scikit-Learn: مفاهيم تعلم الآلة",
      lib: "Scikit-Learn",
      details: "الفرق بين التعلم الإشرافي (Supervised) وغير الإشرافي (Unsupervised)، مصفوفة الميزات (X) ومتجه الهدف (y)، وتقسيم البيانات بـ train_test_split.",
      exercise: "تجهيز مجموعة بيانات وفصل المتغيرات التابعة والمستقلة وتقسيمها بنسبة 80% تدريب و 20% اختبار مع تثبيت random_state."
    }
  },
  {
    id: 30, originalDay: 30, defaultDate: "2026-12-14", dayAr: "الإثنين", week: 7,
    phase: "المرحلة 6: الدوال النافذية وأساسيات تعلم الآلة",
    sql: {
      topic: "دوال الترتيب النافذية (ROW_NUMBER, RANK, DENSE_RANK)",
      tag: "SQL Window Functions",
      details: "مقارنة دقيقة بين ROW_NUMBER() و RANK() و DENSE_RANK() في معالجة القيم المتساوية، وكيفية استخراج أعلى N عناصر لكل مجموعة.",
      exercise: "استخراج أعلى 3 مندوبي مبيعات تحقيقاً للأرباح في كل منطقة جغرافية."
    },
    python: {
      topic: "معالجة وتدريج الميزات (Feature Scaling)",
      lib: "Scikit-Learn",
      details: "أهمية توحيد الموازين في النماذج الرياضية، المقارنة بين التوحيد القياسي StandardScaler والتدريج الأدنى والأقصى MinMaxScaler، وتطبيق fit_transform.",
      exercise: "تدريج الميزات الرقمية في بيانات التدريب والاختبار بطريقة تمنع تسرب البيانات (Data Leakage)."
    }
  },
  {
    id: 31, originalDay: 31, defaultDate: "2026-12-15", dayAr: "الثلاثاء", week: 7,
    phase: "المرحلة 6: الدوال النافذية وأساسيات تعلم الآلة",
    sql: {
      topic: "دوال الإزاحة وتتبع التغيرات (LAG & LEAD)",
      tag: "SQL Window Functions",
      details: "استخراج قيم الصف السابق بـ LAG() والصف التالي بـ LEAD()، حساب التغير المطلوق والنسبي يومياً (Day-over-Day Growth) ومعدلات النمو.",
      exercise: "حساب نسبة النمو في الإيرادات اليومية مقارنة باليوم السابق واليوم نفسه من الأسبوع الفائت."
    },
    python: {
      topic: "ترميز المتغيرات الفئوية (Categorical Encoding)",
      lib: "Scikit-Learn",
      details: "تحويل النصوص إلى أرقام يفهمها النموذج: One-Hot Encoding بـ pd.get_dummies أو OneHotEncoder، وترميز الترتيب بـ OrdinalEncoder / LabelEncoder.",
      exercise: "تطبيق OneHotEncoder على الأعمدة الفئوية الاسمية وتجهيز مصفوفة ميزات مدمجة وجاهزة للنمذجة."
    }
  },
  {
    id: 32, originalDay: 32, defaultDate: "2026-12-16", dayAr: "الأربعاء", week: 7,
    phase: "المرحلة 6: الدوال النافذية وأساسيات تعلم الآلة",
    sql: {
      topic: "التجميعات التراكمية في الدوال النافذية",
      tag: "SQL Window Functions",
      details: "حساب المجموع التراكمي (Running Total) والمتوسط المتحرك (Moving Average) باستخدام إطارات النافذة ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
      exercise: "بناء تقرير يعرض المبيعات اليومية بجانب الإجمالي التراكمي منذ بداية الشهر."
    },
    python: {
      topic: "نماذج الانحدار الخطي (Linear Regression)",
      lib: "Scikit-Learn",
      details: "نظرية الانحدار الخطي، المعادلة الخطية والأوزان (Weights & Intercept)، تدريب النموذج بـ model.fit()، والتنبؤ بـ model.predict().",
      exercise: "تدريب نموذج انحدار خطي للتنبؤ بأسعار المنازل بناءً على المساحة وعدد الغرف واستخراج معاملات الانحدار."
    }
  },
  {
    id: 33, originalDay: 33, defaultDate: "2026-12-17", dayAr: "الخميس", week: 7,
    phase: "المرحلة 6: الدوال النافذية وأساسيات تعلم الآلة",
    sql: {
      topic: "دوال القيمة المتقدمة وتقسيم الشرائح (NTILE & Values)",
      tag: "SQL Window Functions",
      details: "استخدام FIRST_VALUE و LAST_VALUE، ودالة تقسيم البيانات إلى مجموعات متساوية NTILE(4) لإنشاء الشرائح الربعية (Quartiles).",
      exercise: "تقسيم العملاء إلى 4 شرائح متساوية بناءً على حجم إنفاقهم وتحديد الحد الأدنى لكل شريحة."
    },
    python: {
      topic: "تقييم نماذج الانحدار (Regression Evaluation Metrics)",
      lib: "Scikit-Learn",
      details: "مقاييس الأداء: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), ومعامل التحديد R-Squared (R²).",
      exercise: "حساب جميع مقاييس التقييم على بيانات الاختبار وتفسير معنى قيمة R² عملياً بالنسبة للمشروع."
    }
  },

  // Week 8
  {
    id: 34, originalDay: 34, defaultDate: "2026-12-20", dayAr: "الأحد", week: 8,
    phase: "المرحلة 7: خوارزميات التصنيف والتحليلات المتخصصة",
    sql: {
      topic: "تحليل RFM لتجزئة العملاء عبر SQL",
      tag: "SQL Analytics",
      details: "تطبيق عملي احترافي لحساب أبعاد: الحداثة (Recency)، التكرار (Frequency)، والقيمة المالية (Monetary) وتقسيم العملاء بـ NTILE و CTEs.",
      exercise: "بناء كود SQL كامل يستخرج تصنيف العملاء الأوفياء والعملاء المعرضين للتسرب."
    },
    python: {
      topic: "خوارزميات التصنيف: الانحدار اللوجستي و KNN",
      lib: "Scikit-Learn",
      details: "التنبؤ بالفئات الثنائية، دالة Sigmoid في Logistic Regression، ومفهوم المسافة الإقليدية في K-Nearest Neighbors (KNN).",
      exercise: "تدريب نموذج انحدار لوجستي للتنبؤ بما إذا كان العميل سيشتري منتجاً أم لا وحساب احتمالات التنبؤ بـ predict_proba."
    }
  },
  {
    id: 35, originalDay: 35, defaultDate: "2026-12-21", dayAr: "الإثنين", week: 8,
    phase: "المرحلة 7: خوارزميات التصنيف والتحليلات المتخصصة",
    sql: {
      topic: "حل ألغاز المقابلات: الأيام المتتالية (Islands & Gaps)",
      tag: "SQL Advanced Practice",
      details: "معالجة المسائل المعقدة في SQL: إيجاد سلاسل النشاط المتتالية للمستخدمين ومشاكل الفجوات (Gaps and Islands) باستخدام دوال الترتيب والتواريخ.",
      exercise: "حل مسألة إيجاد أطول سلسلة أيام متتالية قام فيها مستخدم بتسجيل الدخول للتطبيق."
    },
    python: {
      topic: "مصفوفة الارتباك ومقاييس تقييم التصنيف",
      lib: "Scikit-Learn",
      details: "فهم Confusion Matrix: الإيجابيات الحقيقية والكاذبة، حساب الدقة (Accuracy)، الإحكام (Precision)، الاسترجاع (Recall)، F1-Score، ومنحنى ROC-AUC.",
      exercise: "طباعة classification_report ورسم مصفوفة الارتباك وتحديد النموذج الأفضل عند عدم توازن الفئات (Imbalanced Data)."
    }
  },
  {
    id: 36, originalDay: 36, defaultDate: "2026-12-22", dayAr: "الثلاثاء", week: 8,
    phase: "المرحلة 7: خوارزميات التصنيف والتحليلات المتخصصة",
    sql: {
      topic: "لغة تعريف البيانات والقيود (DDL & Constraints)",
      tag: "SQL DDL",
      details: "إنشاء وتعديل الجداول: CREATE TABLE, ALTER TABLE, DROP TABLE، وتطبيق القيود: PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE, DEFAULT.",
      exercise: "إنشاء مخطط جداول متكامل لنظام فواتير مع فرض قيود على الأسعار الموجبة والتاريخ الحالي."
    },
    python: {
      topic: "أشجار القرار (Decision Trees)",
      lib: "Scikit-Learn",
      details: "كيفية عمل شجرة القرار، معايير الانقسام (Gini Impurity, Entropy)، مشاكل فرط التخصيص (Overfitting)، والتحكم في max_depth، ورسم الشجرة بـ plot_tree.",
      exercise: "تدريب شجرة قرار وتحديد العمق الأمثل لمنع الـ Overfitting ورسم الشجرة وتفسير القواعد المستخرجة."
    }
  },
  {
    id: 37, originalDay: 37, defaultDate: "2026-12-23", dayAr: "الأربعاء", week: 8,
    phase: "المرحلة 7: خوارزميات التصنيف والتحليلات المتخصصة",
    sql: {
      topic: "معالجة البيانات والمعاملات (DML & ACID Transactions)",
      tag: "SQL DML",
      details: "إضافة وتحديث وحذف البيانات: INSERT INTO, UPDATE, DELETE، ومبادئ المعاملات المالية ACID واستخدام BEGIN TRANSACTION, COMMIT, ROLLBACK.",
      exercise: "كتابة سيناريو تحويل مالي بين حسابين بنكيين مع ضمان التراجع التلقائي (Rollback) في حالة حدوث خطأ."
    },
    python: {
      topic: "الغابات العشوائية والنماذج التجميعية (Random Forest)",
      lib: "Scikit-Learn",
      details: "مفهوم التعلم التجميعي (Ensemble Learning: Bagging)، الغابات العشوائية RandomForestClassifier/Regressor، واستخراج أهمية المتغيرات (Feature Importance).",
      exercise: "تدريب Random Forest ومقارنة دقته مع شجرة القرار الفردية ورسم بياني لأهم الميزات المؤثرة في القرار."
    }
  },
  {
    id: 38, originalDay: 38, defaultDate: "2026-12-24", dayAr: "الخميس", week: 8,
    phase: "المرحلة 7: خوارزميات التصنيف والتحليلات المتخصصة",
    sql: {
      topic: "تحسين الأداء والفهارس (Query Optimization & Indexes)",
      tag: "SQL Optimization",
      details: "أنواع الفهارس (B-Tree, Clustered, Non-clustered)، قراءة خطة تنفيذ الاستعلام EXPLAIN / EXPLAIN ANALYZE، وتجنب المسح الشامل للجداول (Full Table Scan).",
      exercise: "تحليل أداء استعلام بطيء، وإضافة فهرس مركب وقياس الفارق في زمن التنفيذ."
    },
    python: {
      topic: "خوارزميات تعزيز التدرج (Gradient Boosting & XGBoost)",
      lib: "XGBoost / LightGBM",
      details: "مفهوم الـ Boosting، آلية تصحيح أخطاء الأشجار السابقة، التعرف على مكتبة XGBoost وتدريب أول نموذج تصنيف متقدم بواسطتها.",
      exercise: "بناء نموذج XGBoost ومقارنة نتيجته بدقة النماذج السابقة وضبط معدل التعلم learning_rate."
    }
  },

  // Week 9
  {
    id: 39, originalDay: 39, defaultDate: "2026-12-27", dayAr: "الأحد", week: 9,
    phase: "المرحلة 8: خطوط الإنتاج المتكاملة ومشاريع التخرج",
    sql: {
      topic: "ربط قواعد البيانات ببايثون (SQLAlchemy & DB API)",
      tag: "SQL + Python Integration",
      details: "الاتصال بقواعد البيانات العلائقية من بايثون باستخدام sqlite3 و SQLAlchemy، واسترجاع الاستعلامات كـ Pandas DataFrames بـ pd.read_sql().",
      exercise: "كتابة سكريبت بايثون يتصل بقاعدة بيانات محلية وينفذ استعلاماً تحليلياً ويحول النتيجة لـ DataFrame تلقائياً."
    },
    python: {
      topic: "ضبط المعاملات الفائقة (Hyperparameter Tuning)",
      lib: "Scikit-Learn",
      details: "التحقق المتقاطع (K-Fold Cross-Validation)، والبحث الشامل والبحث العشوائي عن أفضل المعاملات باستخدام GridSearchCV و RandomizedSearchCV.",
      exercise: "تطبيق GridSearchCV للبحث عن أفضل معاملات لنموذج Random Forest وتحديد أفضل دقة ممكنة."
    }
  },
  {
    id: 40, originalDay: 40, defaultDate: "2026-12-28", dayAr: "الإثنين", week: 9,
    phase: "المرحلة 8: خطوط الإنتاج المتكاملة ومشاريع التخرج",
    sql: {
      topic: "مشروع SQL الشامل (الجزء 1): بناء المخطط واستخراج KPIs",
      tag: "Capstone Project",
      details: "مشروع تخرج SQL واقعي: تصميم مخطط البيانات، استيراد مجموعة بيانات تجارة إلكترونية، وكتابة استعلامات استخراج أهم مؤشرات الأداء (KPIs).",
      exercise: "بناء تقرير لوحة معلومات (Dashboard queries) يشمل إجمالي الإيرادات، ومعدل دوران المخزون، ومتوسط قيمة الطلب."
    },
    python: {
      topic: "التعلم غير الإشرافي: التجميع بـ K-Means",
      lib: "Scikit-Learn",
      details: "خوارزمية K-Means Clustering، تحديد عدد المجموعات الأمثل باستخدام طريقة الكوع (Elbow Method) ومقياس Silhouette Score.",
      exercise: "تجميع العملاء في مجموعات سلوكية غير خاضعة للإشراف ورسم المجموعات بيانيا."
    }
  },
  {
    id: 41, originalDay: 41, defaultDate: "2026-12-29", dayAr: "الثلاثاء", week: 9,
    phase: "المرحلة 8: خطوط الإنتاج المتكاملة ومشاريع التخرج",
    sql: {
      topic: "مشروع SQL الشامل (الجزء 2): تحليل المسارات ومعدلات التحويل",
      tag: "Capstone Project",
      details: "إكمال مشروع SQL: تحليل مسار التحويل (Funnel Analysis)، حساب نسب التسرب بين المراحل (Drop-off Rate)، وتوليد مخرجات جاهزة لنموذج الـ ML.",
      exercise: "كتابة استعلام المسار المتسلسل للزيارة -> إضافة للسلة -> إتمام الدفع وتصدير الجدول النهائي للتحليل."
    },
    python: {
      topic: "تقليل الأبعاد وبناء خطوط الإنتاج (PCA & Pipelines)",
      lib: "Scikit-Learn",
      details: "تحليل المكونات الرئيسية (PCA) لضغط الميزات وتصور البيانات متعددة الأبعاد، وبناء خط إنتاج نظيف وقابل للنشر بـ Pipeline و ColumnTransformer.",
      exercise: "بناء Pipeline يدمج خطوات ملء القيم الفارغة، والتدريج، وتدريب النموذج في كائن برمجي واحد."
    }
  },
  {
    id: 42, originalDay: 42, defaultDate: "2026-12-30", dayAr: "الأربعاء", week: 9,
    phase: "المرحلة 8: خطوط الإنتاج المتكاملة ومشاريع التخرج",
    sql: {
      topic: "تكامل البيانات النهائي وتوثيق استعلامات المشروع",
      tag: "Capstone Project",
      details: "مراجعة كفاءة استعلامات المشروع بالكامل، كتابة التوثيق التقني والتعليقات، وإعداد العرض التقديمي للنتائج التراكمية.",
      exercise: "توثيق استعلامات المشروع في ملف SQL منظم ومفهرس جاهز للنشر على GitHub."
    },
    python: {
      topic: "🏆 المشروع الختامي المتكامل (End-to-End Capstone)",
      lib: "Full Stack DS",
      details: "مشروع تخرج البيانات والذكاء الاصطناعي: سحب البيانات من SQL، تنظيفها بـ Pandas، استكشافها بـ Seaborn، وتدريب نموذج ML كامل وحفظه بـ joblib.",
      exercise: "إنهاء كود المشروع وتصدير النموذج المدرب واختباره على بيانات جديدة تماماً."
    }
  },
  {
    id: 43, originalDay: 43, defaultDate: "2026-12-31", dayAr: "الخميس", week: 9,
    phase: "المرحلة 8: خطوط الإنتاج المتكاملة ومشاريع التخرج",
    sql: {
      topic: "🎯 المراجعة الكبرى لمقابلات عمل SQL",
      tag: "Interview Prep",
      details: "مراجعة شاملة لأهم 50 سؤالاً تقنياً في مقابلات عمل مهندسي ومحللي البيانات، وأسرار التفوق في المقابلات الحية (Live Coding).",
      exercise: "حل 5 مسائل متقدمة على منصات LeetCode و StrataScratch بوقت محدد."
    },
    python: {
      topic: "🎉 حفل ختام السنة: مراجعة مقابلات ML وبناء البورتفوليو",
      lib: "Portfolio & Careers",
      details: "مراجعة أسئلة مقابلات Data Science & ML، ترتيب حساب GitHub وتوثيق المشاريع بـ README احترافي، وخطة العام القادم للتخصص في Deep Learning & MLOps.",
      exercise: "نشر مشاريع الشهرين على GitHub وإضافة الوصف وروابط العرض في السيرة الذاتية و LinkedIn."
    }
  }
];
