window.STUDY_WORLD_DATA = {
  "title_ar": "عالم وهندسة البيانات (The World of Data)",
  "title_en": "The World of Data - Key Concepts Every Data Analyst Should Know",
  "description_ar": "المفاهيم الجوهرية لمنظومة البيانات الحديثة: خطوط EPL، البيانات الضخمة (5 V's)، مقارنة مستودع وبحيرة البيانات والـ Lakehouse، ودورة تدفق البيانات وأشهر الأدوات العالمية.",
  "motto_ar": "البيانات هي النفط الجديد، لكن الرؤى واستخلاص المعنى هي الوقود الحقيقي!",
  "motto_en": "Data is the new oil, but insight is the fuel!",
  "sections": [
    {
      "id": "epl",
      "number": 1,
      "title_ar": "ما هي دورة EPL (Extract - Prepare - Load)؟",
      "title_en": "1. What is EPL (Extract - Prepare - Load)?",
      "icon": "🔄",
      "definition_ar": "عملية تكامل وتوحيد البيانات المستخدمة لنقل البيانات الخام من مصادر متعددة وتجهيزها وضخها في نظام تحليلي موحد (مثل مستودع البيانات) لضمان نظافتها وصحتها وهيكلتها قبل التحليل.",
      "definition_en": "EPL is a data integration process used to move data from source systems into a target system (like a Data Warehouse). It ensures data is ready, clean, and structured for analysis.",
      "phases": [
        {
          "letter": "E",
          "name_ar": "الاستخراج (Extract)",
          "name_en": "Extract",
          "desc_ar": "سحب واستخراج البيانات الخام من مختلف المصادر والأنظمة (قواعد البيانات، أنظمة CRM، ERP، ملفات السجلات، وواجهات API).",
          "icon": "📥"
        },
        {
          "letter": "P",
          "name_ar": "التجهيز والتحويل (Prepare)",
          "name_en": "Prepare & Clean",
          "desc_ar": "تنظيف البيانات، إزالة التكرارات، معالجة القيم المفقودة، توحيد الصيغ، والتحقق من صحة القواعد الرياضية والمنطقية.",
          "icon": "⚙️"
        },
        {
          "letter": "L",
          "name_ar": "التحميل والضخ (Load)",
          "name_en": "Load",
          "desc_ar": "تحميل البيانات الجاهزة والنظيفة داخل المستودع النهائي أو طبقة التحليلات لتكون جاهزة للاستعلام الفوري.",
          "icon": "📤"
        }
      ],
      "key_takeaways": [
        "EPL يضمن وصول البيانات الصحيحة، بالصيغة الصحيحة، إلى المكان الصحيح في الوقت المطلوب.",
        "ابدأ دائماً بالسؤال التجاري الصحيح (Start with the right question).",
        "جودة البيانات أمر حاسم وغير قابل للتفاوض (Data quality is critical).",
        "العملية متكررة ومستمرة وليست مهمة تتم لمرة واحدة (Iterative process)."
      ]
    },
    {
      "id": "big_data",
      "number": 2,
      "title_ar": "ما هي البيانات الضخمة وأبعادها الـ 5 (The 5 V's of Big Data)؟",
      "title_en": "2. What is Big Data? The 5 V's",
      "icon": "🌐",
      "definition_ar": "تشير البيانات الضخمة (Big Data) إلى مجموعات بيانات هائلة الحجم وبالغة التعقيد، تتجاوز قدرة أنظمة قواعد البيانات التقليدية على معالجتها وتخزينها بكفاءة.",
      "definition_en": "Extremely large and complex datasets that traditional relational systems cannot handle efficiently.",
      "five_vs": [
        {
          "v": "Volume",
          "name_ar": "الحجم الهائل (Volume)",
          "desc_ar": "كميات ضخمة جداً من البيانات تُقاس بالتيرا بايت (TB) والبيتا بايت (PB).",
          "icon": "📦"
        },
        {
          "v": "Velocity",
          "name_ar": "السرعة الفائقة (Velocity)",
          "desc_ar": "سرعة توليد وضخ ومعالجة البيانات لحظياً (Streaming) مثل بيانات المعاملات المالية وأجهزة الـ IoT.",
          "icon": "⚡"
        },
        {
          "v": "Variety",
          "name_ar": "تنوع الأشكال (Variety)",
          "desc_ar": "تنوع صيغ البيانات بين مهيكلة (SQL Tables)، شبه مهيكلة (JSON, XML)، وغير مهيكلة (صور، فيديو، نصوص).",
          "icon": "🧩"
        },
        {
          "v": "Veracity",
          "name_ar": "الموثوقية والدقة (Veracity)",
          "desc_ar": "درجة صحة ونقاء البيانات وخلوها من الضوضاء والأخطاء لضمان دقة القرارات الناتجة.",
          "icon": "🛡️"
        },
        {
          "v": "Value",
          "name_ar": "القيمة المضافة (Value)",
          "desc_ar": "القدرة على تحويل البيانات الخام المجمعة إلى قيمة تجارية ومالية وقرارات ذات عائد استثماري حقيقي.",
          "icon": "💎"
        }
      ]
    },
    {
      "id": "storage_architectures",
      "number": 3,
      "title_ar": "مقارنة: مستودع البيانات مقابل بحيرة البيانات مقابل الـ Lakehouse",
      "title_en": "3. Data Warehouse vs. Data Lake vs. Data Lakehouse",
      "icon": "🏛️",
      "comparison": [
        {
          "model": "مستودع البيانات (Data Warehouse)",
          "desc_ar": "مستودع مركزي مصمم خصيصاً للبيانات المهيكلة والنظيفة لخدمة التقارير وذكاء الأعمال (BI).",
          "schema": "Schema-on-Write (تحديد المخطط قبل التخزين)",
          "data_types": "بيانات مهيكلة ومصنفة (Structured)",
          "best_for": "تقارير الأعمال، مؤشرات الأداء (KPIs)، واستعلامات SQL السريعة جداً.",
          "cost": "تكلفة تخزين ومعالجة أعلى نسبياً.",
          "flexibility": "مرونة أقل في تغيير الهيكل والمخطط لاحقاً."
        },
        {
          "model": "بحيرة البيانات (Data Lake)",
          "desc_ar": "خزان ضخم يحتفظ بجميع البيانات في شكلها الخام (Raw Data) بأي صيغة دون قيود حتى وقت الحاجة.",
          "schema": "Schema-on-Read (تحديد المخطط وقت القراءة فقط)",
          "data_types": "خام، غير مهيكلة، شبه مهيكلة، ومهيكلة",
          "best_for": "استكشاف البيانات، نماذج تعلم الآلة (ML)، وتطبيقات الذكاء الاصطناعي.",
          "cost": "منخفض التكلفة جداً ويعتمد على Object Storage مثل S3.",
          "flexibility": "مرونة فائقة وقابلية للتوسع غير محدودة، لكنه أصعب في الإدارة."
        },
        {
          "model": "منصة الـ Lakehouse (Modern Data Lakehouse)",
          "desc_ar": "المعمارية الحديثة التي تدمج أفضل ما في النموذجين: مرونة وتكلفة بحيرة البيانات مع حوكمة وسرعة ومعاملات ACID لمستودع البيانات!",
          "schema": "Open Formats مع حوكمة وضمان Schema",
          "data_types": "يدعم جميع أنواع البيانات في طبقة موحدة",
          "best_for": "منصة واحدة موحدة تخدم كلاً من تقارير BI لرجال الأعمال ونماذج الذكاء الاصطناعي في آن واحد.",
          "cost": "فعّال جداً من حيث التكلفة، ويدعم ACID Transactions ومصداقية كاملة للبيانات.",
          "flexibility": "المستقبل المعتمد للشركات العالمية (مثل Databricks و Snowflake)."
        }
      ]
    },
    {
      "id": "data_flow",
      "number": 4,
      "title_ar": "معمارية دورة تدفق البيانات النموذجية (Typical Data Flow Architecture)",
      "title_en": "4. Typical Data Flow Architecture",
      "icon": "🌊",
      "pipeline": [
        {
          "stage": "1. الاستيعاب (Ingestion)",
          "desc": "تجميع البيانات إما على دفعات (Batch) أو تدفق لحظي (Stream) من المواقع، التطبيقات، وأجهزة الاستشعار.",
          "tools": "Kafka, Flink, Airbyte, Stitch"
        },
        {
          "stage": "2. التخزين (Storage)",
          "desc": "حفظ البيانات في بحيرة أو مستودع أو Lakehouse سحابي آمن وعالي التوافر.",
          "tools": "AWS S3, Azure ADLS, Google Cloud Storage, MinIO"
        },
        {
          "stage": "3. المعالجة والتحويل (Processing)",
          "desc": "تنظيف البيانات ودمجها وتطبيق خوارزميات التجميع والتجهيز للتحليل.",
          "tools": "Apache Spark, Databricks, dbt, SQL"
        },
        {
          "stage": "4. التحليلات والتصور (Analytics & Viz)",
          "desc": "بناء لوحات المؤشرات (Dashboards)، التقارير التفاعلية، وتدريب نماذج التعلم الآلي.",
          "tools": "Tableau, Power BI, Looker, Metabase, Python"
        },
        {
          "stage": "5. الرؤى واتخاذ القرار (Insights & Action)",
          "desc": "تحويل مخرجات الرسوم والتحليلات إلى قرارات استراتيجية تنفذها الإدارة لتحقيق أهداف العمل.",
          "tools": "Executive Decisions, Automated Alerts, Optimization"
        }
      ]
    },
    {
      "id": "popular_tools",
      "number": 5,
      "title_ar": "أشهر الأدوات والتقنيات العالمية لمحلل ومهندس البيانات",
      "title_en": "5. Popular Tools & Technologies Matrix",
      "icon": "🛠️",
      "categories": [
        {
          "category_ar": "التخزين السحابي (Cloud Storage)",
          "category_en": "Cloud Storage",
          "tools": [
            "AWS S3 (Amazon)",
            "Azure Data Lake Storage (Microsoft)",
            "Google Cloud Storage (GCS)"
          ]
        },
        {
          "category_ar": "محركات المعالجة (Data Processing)",
          "category_en": "Processing Engines",
          "tools": [
            "Apache Spark (Distributed Computing)",
            "Databricks (Unified Analytics)",
            "Apache Flink (Real-time Streaming)",
            "dbt (Transformations)"
          ]
        },
        {
          "category_ar": "مستودعات البيانات السحابية (Cloud Warehouses)",
          "category_en": "Cloud Warehouses",
          "tools": [
            "Snowflake (Elastic SQL Data Cloud)",
            "Google BigQuery (Serverless Analytics)",
            "Amazon Redshift (Scalable Data Warehouse)"
          ]
        },
        {
          "category_ar": "تصور وذكاء الأعمال (BI & Data Visualization)",
          "category_en": "BI & Data Visualization",
          "tools": [
            "Tableau (Industry Standard Viz)",
            "Microsoft Power BI (Enterprise Dashboards)",
            "Google Looker (Modern Semantic BI)"
          ]
        }
      ]
    }
  ]
};
