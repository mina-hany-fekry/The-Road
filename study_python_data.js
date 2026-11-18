window.STUDY_PYTHON_DATA = {
  "title_ar": "خارطة طريق بايثون الشاملة (Python Roadmap)",
  "title_en": "Complete Python Roadmap for Data & Beyond",
  "description_ar": "مسار تعليمي متكامل من الصفر (Beginner) وحتى التخصص في علوم وهندسة البيانات والذكاء الاصطناعي، مستوحى من المنهج المرفق.",
  "levels": [
    {
      "id": "beginner",
      "number": "1",
      "name_ar": "المستوى التأسيسي (Beginner)",
      "name_en": "Beginner Level",
      "badge": "تأسيس صلب",
      "color": "emerald",
      "topics": [
        {
          "title": "المتغيرات وأنواع البيانات (Variables & Data Types)",
          "summary_ar": "اللبنات الأساسية لأي كود بايثون: تعريف المتغيرات، الأنواع الرقمية (int, float)، النصوص (str)، والقيم المنطقية (bool).",
          "summary_en": "Core building blocks: variable assignment, dynamic typing, numeric types, strings, and booleans.",
          "code": "# Variables and primitive data types\nname = \"Mina\"\nage = 28\ngpa = 3.92\nis_active = True\n\n# Dynamic type casting and f-string\nprint(f\"User {name} is {age} years old (Active: {is_active})\")\nprint(f\"Type of age: {type(age)}, float GPA: {float(age)}\")",
          "tips_ar": "بايثون تعتمد على Dynamic Typing؛ لا تحتاج لتحديد نوع المتغير مسبقاً، لكن استخدم Type Hinting في المشاريع الكبيرة للوضوح."
        },
        {
          "title": "التحكم في المسار والتكرار (Flow Control: If & Loops)",
          "summary_ar": "اتخاذ القرارات عبر if/elif/else والتكرار عبر for و while loops، مع كلمات التحكم break و continue.",
          "summary_en": "Conditional decision making and iteration over ranges and sequences.",
          "code": "# Conditional branching\nscore = 88\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelse:\n    grade = 'C'\n\n# Iteration with for-loop and enumerate\nskills = ['Python', 'SQL', 'Statistics', 'Tableau']\nfor idx, skill in enumerate(skills, start=1):\n    print(f\"{idx}. {skill}\")",
          "tips_ar": "استخدم enumerate() دائماً عندما تحتاج لرقم العنصر وقيمته في نفس الوقت بدلاً من استخدام عداد يدوي."
        },
        {
          "title": "الدوال وإعادة استخدام الكود (Functions & Lambdas)",
          "summary_ar": "بناء الدوال عبر def، المعاملات الافتراضية، *args و **kwargs، والدوال المجهولة السريعة lambda.",
          "summary_en": "Modular reusable code blocks, parameter passing, return values, and lambda expressions.",
          "code": "def calculate_net_salary(gross, tax_rate=0.14, bonus=0):\n    \"\"\"Calculates net salary after tax deduction with bonus.\"\"\"\n    tax = gross * tax_rate\n    return round(gross - tax + bonus, 2)\n\n# Lambda expression for quick data mapping\nsquare = lambda x: x ** 2\nnumbers = [1, 2, 3, 4, 5]\nsquares = list(map(lambda n: n**2, numbers))\nprint(\"Net:\", calculate_net_salary(10000, bonus=500))\nprint(\"Squares:\", squares)",
          "tips_ar": "احرص على كتابة Docstrings ثلاثية الاقتباس داخل كل دالة لتوضيح المدخلات والمخرجات للتوثيق المهني."
        }
      ]
    },
    {
      "id": "intermediate",
      "number": "2",
      "name_ar": "المستوى المتوسط (Intermediate)",
      "name_en": "Intermediate Level",
      "badge": "كود احترافي",
      "color": "amber",
      "topics": [
        {
          "title": "معالجة الأخطاء والاستثناءات (Exceptions Handling)",
          "summary_ar": "حماية البرنامج من الانهيار عند حدوث أخطاء غير متوقعة عبر try / except / else / finally وإنشاء استثناءات مخصصة عبر raise.",
          "summary_en": "Graceful error recovery, raising exceptions, and cleanup via finally blocks.",
          "code": "def safe_division(numerator, denominator):\n    try:\n        result = numerator / denominator\n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero!\")\n        return None\n    except TypeError as e:\n        print(f\"Type error occurred: {e}\")\n        return None\n    else:\n        print(\"Calculation completed successfully.\")\n        return result\n    finally:\n        print(\"Operation cycle closed.\")",
          "tips_ar": "لا تستخدم except فارغة أبداً؛ حدد دائماً نوع الاستثناء مثل ValueError أو ZeroDivisionError لتجنب إخفاء الأخطاء الحقيقية."
        },
        {
          "title": "البرمجة كائنية التوجه (Object-Oriented Programming - OOP)",
          "summary_ar": "تنظيم الكود حول الكائنات والفئات (Classes & Objects) وتطبيق مبادئ الوراثة (Inheritance)، التغليف (Encapsulation)، وتعدد الأشكال (Polymorphism).",
          "summary_en": "Classes, constructors (__init__), instance methods, inheritance, and encapsulation.",
          "code": "class DataAnalyst:\n    def __init__(self, name, level=\"Junior\"):\n        self.name = name\n        self.level = level\n        self.__projects = []  # Private attribute\n        \n    def add_project(self, project_name):\n        self.__projects.append(project_name)\n        print(f\"Project '{project_name}' assigned to {self.name}.\")\n        \n    def summary(self):\n        return f\"{self.name} ({self.level}) - {len(self.__projects)} completed projects\"\n\n# Inheritance\nclass SeniorAnalyst(DataAnalyst):\n    def __init__(self, name):\n        super().__init__(name, level=\"Senior\")\n        self.specialty = \"Machine Learning\"",
          "tips_ar": "دالة __init__ هي الـ Constructor التلقائي الذي يتم استدعاؤه فور إنشاء أي كائن جديد من الـ Class."
        },
        {
          "title": "الوحدات وحزم العمل (Modules & Virtual Environments)",
          "summary_ar": "تقسيم المشروع لملفات متعددة (Modules)، استخدام import، وإدارة المكتبات والبيئات المنعزلة عبر pip و venv.",
          "summary_en": "Project structuring, importing libraries, requirements.txt, and virtual environments.",
          "code": "# Terminal commands:\n# python -m venv venv\n# source venv/bin/activate (Mac/Linux) or .\\venv\\Scripts\\activate (Windows)\n# pip install pandas numpy scikit-learn\n\nimport math\nfrom datetime import datetime\nimport os\n\nprint(\"Today:\", datetime.now().strftime(\"%Y-%m-%d %H:%M\"))\nprint(\"Current Directory:\", os.getcwd())",
          "tips_ar": "اعزل كل مشروع بايثون في بيئة افتراضية خاصة به لتجنب تعارض إصدارات المكتبات بين المشاريع."
        },
        {
          "title": "التعامل مع الملفات (File Handling & Serialization)",
          "summary_ar": "قراءة وكتابة ملفات النصوص (Text)، الـ CSV، والـ JSON باستخدام مدير السياق الآمن with open.",
          "summary_en": "Reading/writing text, CSV and JSON safely using context managers.",
          "code": "import json\n\ndata = {\n    \"analyst\": \"Mina Hany\",\n    \"skills\": [\"Python\", \"SQL\", \"Statistics\"],\n    \"status\": \"Ready for interview\"\n}\n\n# Safe JSON file writing\nwith open('analyst_profile.json', 'w', encoding='utf-8') as f:\n    json.dump(data, f, indent=4, ensure_ascii=False)\n\n# Reading\nwith open('analyst_profile.json', 'r', encoding='utf-8') as f:\n    loaded = json.load(f)\n    print(\"Loaded data:\", loaded[\"analyst\"])",
          "tips_ar": "استخدم دائماً with open(...) لأنها تضمن إغلاق الملف تلقائياً حتى لو حدث خطأ أثناء القراءة أو الكتابة."
        }
      ]
    },
    {
      "id": "advanced",
      "number": "3",
      "name_ar": "المستوى المتقدم (Advanced)",
      "name_en": "Advanced Level",
      "badge": "أدوات الإنتاج",
      "color": "rose",
      "topics": [
        {
          "title": "واجهات برمجة التطبيقات (APIs & HTTP Requests)",
          "summary_ar": "استهلاك وإرسال البيانات عبر بروتوكول HTTP باستخدام مكتبة requests، وفهم استجابات GET و POST وحالات الرد (Status Codes).",
          "summary_en": "Consuming REST APIs, endpoints, authentication tokens, GET/POST methods, and status codes.",
          "code": "import requests\n\nurl = \"https://api.github.com/users/octocat\"\nresponse = requests.get(url)\n\nif response.status_code == 200:\n    user_data = response.json()\n    print(f\"User: {user_data.get('login')}\")\n    print(f\"Public Repos: {user_data.get('public_repos')}\")\nelse:\n    print(f\"Failed to fetch data, status: {response.status_code}\")",
          "tips_ar": "تحقق دائماً من response.status_code == 200 قبل محاولة استخراج JSON عبر response.json() لتفادي تعطل الكود."
        },
        {
          "title": "اختبار الكود وجودة البرمجيات (Testing & Quality)",
          "summary_ar": "كتابة اختبارات الوحدة (Unit Tests) باستخدام مكتبة pytest أو unittest للتأكد من سلامة الدوال والمشروع قبل التسليم.",
          "summary_en": "Unit testing, assertions, test suites, and regression testing with pytest.",
          "code": "# Using standard unittest\nimport unittest\n\ndef add_tax(price, rate=0.14):\n    return round(price * (1 + rate), 2)\n\nclass TestFinanceCalculations(unittest.TestCase):\n    def test_tax_calculation(self):\n        self.assertEqual(add_tax(100), 114.0)\n        self.assertEqual(add_tax(200, 0.10), 220.0)\n\nif __name__ == '__main__':\n    unittest.main()",
          "tips_ar": "الكود الذي يمتلك اختبارات وحدة قوية يمنحك الثقة لتعديل أو تطوير المشروع مستقبلاً دون خوف من انهيار الوظائف السابقة."
        },
        {
          "title": "استخلاص بيانات الويب (Web Scraping)",
          "summary_ar": "سحب وتحليل البيانات من صفحات الإنترنت غير المزودة بـ API باستخدام BeautifulSoup و requests.",
          "summary_en": "Parsing HTML trees, extracting elements via CSS selectors, and data extraction pipelines.",
          "code": "from bs4 import BeautifulSoup\n\nhtml_content = \"\"\"\n<div class='product-list'>\n  <div class='item'><span class='title'>SQL Guide</span><span class='price'>$29</span></div>\n  <div class='item'><span class='title'>Python Pro</span><span class='price'>$39</span></div>\n</div>\n\"\"\"\n\nsoup = BeautifulSoup(html_content, 'html.parser')\nfor item in soup.find_all('div', class_='item'):\n    title = item.find('span', class_='title').text\n    price = item.find('span', class_='price').text\n    print(f\"{title}: {price}\")",
          "tips_ar": "احترم ملف robots.txt لكل موقع وتجنب إرسال طلبات مكثفة قد تتسبب في حظر الـ IP الخاص بك."
        }
      ]
    },
    {
      "id": "paths",
      "number": "4",
      "name_ar": "اختر مسارك التخصصي (Pick Your Path)",
      "name_en": "Specialized Career Tracks",
      "badge": "التخصص المهني",
      "color": "sky",
      "specializations": [
        {
          "code": "4.1",
          "title_ar": "هندسة البيانات (Data Engineering)",
          "title_en": "Data Engineering",
          "icon": "⚙️",
          "skills": [
            "PySpark",
            "ETL Pipelines",
            "Airflow",
            "Data Automation"
          ],
          "description_ar": "بناء وتأمين خطوط تدفق البيانات الضخمة (Data Pipelines) من مصادرها وحتى مستودعات وبحيرات البيانات.",
          "sample": "# PySpark sample\nfrom pyspark.sql import SparkSession\nspark = SparkSession.builder.appName(\"ETLPipeline\").getOrCreate()\ndf = spark.read.parquet(\"s3://company-lake/transactions/\")\nsummary = df.groupBy(\"country\").count()\nsummary.write.mode(\"overwrite\").parquet(\"s3://company-warehouse/agg_summary/\")"
        },
        {
          "code": "4.2",
          "title_ar": "علم وتحليل البيانات (Data Science)",
          "title_en": "Data Science & Analysis",
          "icon": "📊",
          "skills": [
            "Pandas",
            "NumPy",
            "Plotly",
            "Seaborn",
            "Jupyter"
          ],
          "description_ar": "تنظيف وفحص واستكشاف البيانات (EDA)، تحليل الاتجاهات، وصياغة التقارير التفاعلية لاتخاذ القرارات.",
          "sample": "# Data Science standard workflow\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\ndf['Revenue'] = df['Quantity'] * df['UnitPrice']\ntop_products = df.groupby('Product')['Revenue'].sum().nlargest(5)\nprint(top_products)"
        },
        {
          "code": "4.3",
          "title_ar": "الذكاء الاصطناعي وتعلم الآلة (AI & Machine Learning)",
          "title_en": "AI & Machine Learning",
          "icon": "🧠",
          "skills": [
            "PyTorch",
            "Transformers",
            "TensorFlow",
            "Scikit-Learn"
          ],
          "description_ar": "تدريب النماذج التنبؤية، الشبكات العصبية العميقة، ونماذج معالجة اللغة الطبيعية والرؤية الحاسوبية.",
          "sample": "# Scikit-Learn Machine Learning pipeline\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\n\nX = df[['experience_years', 'education_level']]\ny = df['salary']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression().fit(X_train, y_train)\nprint(f\"Model R2 Score: {model.score(X_test, y_test):.2f}\")"
        },
        {
          "code": "4.4",
          "title_ar": "تطوير الويب (Web Development)",
          "title_en": "Web Development",
          "icon": "🌐",
          "skills": [
            "FastAPI",
            "Flask",
            "Django",
            "Requests"
          ],
          "description_ar": "بناء لوحات التحكم وواجهات برمجة التطبيقات وسيرفرات الويب لتغذية التطبيقات بالبيانات.",
          "sample": "# FastAPI lightweight microservice\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/api/v1/kpis\")\ndef get_kpis():\n    return {\"status\": \"healthy\", \"active_users\": 1420, \"retention\": 0.94}"
        }
      ]
    }
  ]
};
