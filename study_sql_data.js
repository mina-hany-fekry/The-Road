window.STUDY_SQL_DATA = {
  "title_ar": "ملخص ومذكرات SQL الشاملة (SQL Topper Notes)",
  "title_en": "Complete SQL Basics & Intermediate Topper Notes",
  "description_ar": "مرجع شامل لجميع أوامر وقواعد SQL من البداية وحتى المستوى المتوسط مع أمثلة عملية وشرح الفروق الجوهرية.",
  "sections": [
    {
      "id": "basics",
      "title_ar": "١. أساسيات SQL وأنواع الأوامر (SQL Basics & Command Types)",
      "title_en": "1. SQL Basics & Command Types",
      "icon": "📘",
      "cards": [
        {
          "title": "ما هي لغة SQL؟ (What is SQL?)",
          "details_ar": "SQL تعني (Structured Query Language). هي لغة معيارية للتخاطب مع قواعد البيانات العلائقية (Relational Databases) لإنشاء، قراءة، تحديث، وحذف البيانات (CRUD). اللغة غير حساسة لحالة الأحرف (Not Case-Sensitive).",
          "details_en": "SQL is a domain-specific language used to communicate with databases. It creates, reads, updates, and deletes data.",
          "syntax": "SELECT column1, column2 FROM table_name;",
          "notes_ar": "تذكر: SQL = Query + Filter - Group + Sort = Meaningful Data!"
        },
        {
          "title": "أقسام وأوامر SQL الخمسة (Types of SQL Commands)",
          "details_ar": "تنقسم أوامر SQL إلى 5 تصنيفات رئيسية:\n1. DDL (Data Definition Language): هيكل الجداول.\n2. DML (Data Manipulation Language): معالجة وتعديل البيانات.\n3. DQL (Data Query Language): استرجاع وقراءة البيانات.\n4. DCL (Data Control Language): إدارة الصلاحيات والأمان.\n5. TCL (Transaction Control Language): إدارة العمليات والتعاملات المالية.",
          "details_en": "Five core categories: DDL (structure), DML (data records), DQL (retrieval), DCL (permissions), and TCL (transactions).",
          "table": [
            {
              "category": "DDL",
              "commands": "CREATE, ALTER, DROP, TRUNCATE, RENAME",
              "purpose": "بناء وهدم وتعديل هيكل الجداول"
            },
            {
              "category": "DML",
              "commands": "INSERT, UPDATE, DELETE",
              "purpose": "إدخال وتعديل وحذف سجلات البيانات"
            },
            {
              "category": "DQL",
              "commands": "SELECT",
              "purpose": "استعلام واسترجاع البيانات من الجداول"
            },
            {
              "category": "DCL",
              "commands": "GRANT, REVOKE",
              "purpose": "منح وسحب الصلاحيات للمستخدمين"
            },
            {
              "category": "TCL",
              "commands": "COMMIT, ROLLBACK, SAVEPOINT",
              "purpose": "حفظ أو التراجع عن العمليات المتتالية"
            }
          ]
        }
      ]
    },
    {
      "id": "ddl_dml",
      "title_ar": "٢. أوامر الهيكل والبيانات (DDL & DML in Depth)",
      "title_en": "2. DDL & DML Commands in Depth",
      "icon": "🏗️",
      "cards": [
        {
          "title": "أوامر DDL (هيكل الجداول)",
          "details_ar": "تتعامل مع هيكل ومخطط الجدول (Schema) وليس الصفوف الفردية.",
          "examples": [
            {
              "cmd": "CREATE",
              "desc": "إنشاء جدول جديد",
              "code": "CREATE TABLE student (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  age INT\n);"
            },
            {
              "cmd": "ALTER",
              "desc": "تعديل هيكل الجدول (إضافة عمود)",
              "code": "ALTER TABLE student ADD email VARCHAR(100);"
            },
            {
              "cmd": "DROP",
              "desc": "حذف الجدول وهيكله نهائياً من قاعدة البيانات",
              "code": "DROP TABLE student;"
            },
            {
              "cmd": "TRUNCATE",
              "desc": "تفريغ جميع صفوف الجدول دفعة واحدة مع الحفاظ على الهيكل",
              "code": "TRUNCATE TABLE student;"
            },
            {
              "cmd": "RENAME",
              "desc": "إعادة تسمية الجدول",
              "code": "RENAME TABLE student TO learners;"
            }
          ]
        },
        {
          "title": "أوامر DML (سجلات البيانات)",
          "details_ar": "التحكم في إضافة وتعديل ومسح السجلات الفردية داخل الجدول.",
          "examples": [
            {
              "cmd": "INSERT",
              "desc": "إضافة سجل جديد",
              "code": "INSERT INTO student (id, name, age) VALUES (1, 'Aman', 20);"
            },
            {
              "cmd": "UPDATE",
              "desc": "تعديل بيانات صفوف موجودة (دائماً حدد شرط WHERE!)",
              "code": "UPDATE student SET age = 21 WHERE id = 1;"
            },
            {
              "cmd": "DELETE",
              "desc": "حذف صف أو صفوف معينة تحقق شرطاً",
              "code": "DELETE FROM student WHERE id = 1;"
            }
          ]
        },
        {
          "title": "الفرق الجوهري بين DELETE و TRUNCATE و DROP",
          "details_ar": "سؤال المقابلات الكلاسيكي الأهم:\n• DELETE: أمر DML يحذف صفوفاً محددة، يمكن التراجع عنه (Rollback)، أبطأ لأنه يمر على كل صف.\n• TRUNCATE: أمر DDL يمسح كل الصفوف بضغطة واحدة، يعيد تعيين عداد الـ Auto-Increment، لا يمكن التراجع عنه بسهولة، سريع جداً.\n• DROP: أمر DDL يمسح الجدول بأكمله بالهيكل والبيانات والفهارس نهائياً من الوجود.",
          "table": [
            {
              "feature": "النوع",
              "delete": "DML",
              "truncate": "DDL",
              "drop": "DDL"
            },
            {
              "feature": "شرط WHERE",
              "delete": "يمكن استخدامه",
              "truncate": "لا يقبل WHERE",
              "drop": "غير منطبق"
            },
            {
              "feature": "التراجع (Rollback)",
              "delete": "نعم (يمكن التراجع)",
              "truncate": "غالباً لا (حسب الـ DBMS)",
              "drop": "مستحيل التراجع"
            },
            {
              "feature": "تأثير الهيكل",
              "delete": "لا يؤثر",
              "truncate": "لا يؤثر",
              "drop": "يحذف الهيكل تماماً"
            },
            {
              "feature": "إعادة العداد",
              "delete": "لا يعيد العداد",
              "truncate": "يعيد تصفير العداد",
              "drop": "غير منطبق"
            },
            {
              "feature": "السرعة",
              "delete": "أبطأ",
              "truncate": "سريع جداً",
              "drop": "فوري وسريع جداً"
            }
          ]
        }
      ]
    },
    {
      "id": "constraints",
      "title_ar": "٣. قيود قواعد البيانات ومعاملات البحث (Constraints & Wildcards)",
      "title_en": "3. Constraints & Wildcards",
      "icon": "🔒",
      "cards": [
        {
          "title": "قيود البيانات (Constraints)",
          "details_ar": "قواعد تُفرض على الأعمدة لضمان دقة وسلامة البيانات (Data Integrity):",
          "items": [
            {
              "name": "PRIMARY KEY",
              "desc": "مفتاح فريد يحدد كل صف حصرياً، لا يقبل التكرار ومستحيل أن يكون NULL."
            },
            {
              "name": "FOREIGN KEY",
              "desc": "مفتاح أجنبي يربط الجدول بـ Primary Key في جدول آخر لضمان الـ Referential Integrity."
            },
            {
              "name": "UNIQUE",
              "desc": "يضمن عدم تكرار القيم في العمود، لكنه يسمح بوجود قيمة NULL واحدة (حسب الـ DBMS)."
            },
            {
              "name": "NOT NULL",
              "desc": "يمنع ترك العمود فارغاً دون إدخال قيمة."
            },
            {
              "name": "CHECK",
              "desc": "يتحقق من صحة شرط محدد (مثال: CHECK (age >= 18))."
            },
            {
              "name": "DEFAULT",
              "desc": "يضع قيمة افتراضية للعمود في حال لم يحددها المستخدم."
            }
          ]
        },
        {
          "title": "حروف الاستبدال والبحث النصي (Wildcards)",
          "details_ar": "تُستخدم مع جملة LIKE للبحث عن أنماط معينة في النصوص:\n• % : يمثل أي عدد من الحروف (صفر أو أكثر). مثال: WHERE name LIKE 'A%' (يبدأ بـ A).\n• _ : يمثل حرفاً واحداً بالضبط. مثال: WHERE name LIKE 'A__' (يبدأ بـ A ويليه حرفان بالضبط).",
          "examples": [
            {
              "pattern": "'A%'",
              "meaning": "أي نص يبدأ بحرف A"
            },
            {
              "pattern": "'%A'",
              "meaning": "أي نص ينتهي بحرف A"
            },
            {
              "pattern": "'%data%'",
              "meaning": "أي نص يحتوي على كلمة data في أي موضع"
            },
            {
              "pattern": "'_r%'",
              "meaning": "أي نص يكون حرفه الثاني r"
            }
          ]
        }
      ]
    },
    {
      "id": "querying",
      "title_ar": "٤. التصفية، الترتيب، والتجميع (WHERE, ORDER BY, GROUP BY, HAVING)",
      "title_en": "4. Filtering, Sorting & Grouping",
      "icon": "🔍",
      "cards": [
        {
          "title": "التصفية والترتيب (WHERE & ORDER BY & LIMIT)",
          "details_ar": "• WHERE: لتصفية السجلات قبل إجراء أي حسابات.\n• ORDER BY: لترتيب النتائج تصاعدياً (ASC - الافتراضي) أو تنازلياً (DESC).\n• LIMIT: لتحديد عدد الصفوف الناتجة (مثال: أول 5 صفوف).",
          "code": "SELECT name, marks \nFROM student \nWHERE marks >= 75 \nORDER BY marks DESC \nLIMIT 5;"
        },
        {
          "title": "التجميع والتصفية الجماعية (GROUP BY vs HAVING)",
          "details_ar": "الفرق الأهم في استعلامات التحليل:\n• GROUP BY: تجمع الصفوف المتشابهة لتطبيق الدوال الإحصائية عليها.\n• WHERE: تفلتر الصفوف الفردية قبل التجميع، ولا يمكن استخدام دوال التجميع بداخلها.\n• HAVING: تفلتر المجموعات بعد التجميع، وتسمح باستخدام دوال التجميع مثل COUNT و AVG.",
          "code": "SELECT city, COUNT(*) as total_students, AVG(marks) as avg_marks\nFROM student\nWHERE status = 'Active'     -- WHERE filters rows FIRST\nGROUP BY city\nHAVING COUNT(*) >= 5       -- HAVING filters groups AFTER\nORDER BY avg_marks DESC;"
        },
        {
          "title": "دوال التجميع الإحصائية (Aggregate Functions)",
          "details_ar": "تجري عمليات حسابية على مجموعة قيم وتعيد قيمة واحدة وحيدة. تتجاهل قيم NULL دائماً باستثناء COUNT(*):",
          "items": [
            {
              "fn": "COUNT()",
              "desc": "حساب عدد الصفوف. COUNT(*) يحسب كل الصفوف شاملة NULL، بينما COUNT(col) يتجاهل الـ NULL."
            },
            {
              "fn": "SUM()",
              "desc": "حساب المجموع الإجمالي لعمود رقمي."
            },
            {
              "fn": "AVG()",
              "desc": "حساب المتوسط الحسابي للعمود الرقمي."
            },
            {
              "fn": "MAX()",
              "desc": "إيجاد أعلى قيمة."
            },
            {
              "fn": "MIN()",
              "desc": "إيجاد أقل قيمة."
            }
          ]
        }
      ]
    },
    {
      "id": "joins",
      "title_ar": "٥. دمج الجداول (SQL JOINs Masterclass)",
      "title_en": "5. SQL JOINs Masterclass",
      "icon": "🔗",
      "cards": [
        {
          "title": "أنواع الـ JOIN الأساسية",
          "details_ar": "تُستخدم لدمج بيانات جدولين أو أكثر بناءً على عمود مشترك بينهما:",
          "types": [
            {
              "name": "INNER JOIN",
              "desc": "يعيد فقط الصفوف التي تتطابق قيمها في كلا الجدولين.",
              "code": "SELECT s.name, c.course_name FROM student s INNER JOIN course c ON s.id = c.student_id;"
            },
            {
              "name": "LEFT JOIN",
              "desc": "يعيد كل صفوف الجدول الأيسر + الصفوف المتطابقة من الأيمن (ويضع NULL إذا لم يتطابق).",
              "code": "SELECT s.name, c.course_name FROM student s LEFT JOIN course c ON s.id = c.student_id;"
            },
            {
              "name": "RIGHT JOIN",
              "desc": "يعيد كل صفوف الجدول الأيمن + الصفوف المتطابقة من الأيسر.",
              "code": "SELECT s.name, c.course_name FROM student s RIGHT JOIN course c ON s.id = c.student_id;"
            },
            {
              "name": "FULL JOIN",
              "desc": "يعيد كل السجلات من الجدولين سواء تطابقت أم لا.",
              "code": "SELECT s.name, c.course_name FROM student s FULL OUTER JOIN course c ON s.id = c.student_id;"
            },
            {
              "name": "CROSS JOIN",
              "desc": "الضرب الديكارتي (Cartesian Product): دمج كل صف من الأول مع كل صفوف الثاني.",
              "code": "SELECT * FROM colors CROSS JOIN sizes;"
            }
          ]
        },
        {
          "title": "أنواع الـ JOIN المتقدمة",
          "details_ar": "أنواع هامة جداً لأسئلة المقابلات المتقدمة:",
          "types": [
            {
              "name": "SELF JOIN",
              "desc": "ربط الجدول بنفسه. أشهر مثال: ربط الموظف بمديره المباشر في نفس جدول الموظفين.",
              "code": "SELECT e.name AS Employee, m.name AS Manager FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.id;"
            },
            {
              "name": "NATURAL JOIN",
              "desc": "ربط تلقائي بالاعتماد على الأعمدة التي تحمل نفس الاسم ونفس نوع البيانات في الجدولين.",
              "code": "SELECT * FROM TableA NATURAL JOIN TableB;"
            },
            {
              "name": "NON-EQUI JOIN",
              "desc": "ربط باستخدام معاملات مقارنة أخرى غير المساواة (مثل BETWEEN أو < أو >).",
              "code": "SELECT e.name, g.grade FROM Employees e JOIN SalaryGrades g ON e.salary BETWEEN g.min_sal AND g.max_sal;"
            },
            {
              "name": "SEMI JOIN",
              "desc": "إرجاع صفوف الجدول الأيسر التي لها تطابق في الأيمن دون تكرار ودون إظهار أعمدة الجدول الأيمن (عبر EXISTS).",
              "code": "SELECT e.* FROM Employees e WHERE EXISTS (SELECT 1 FROM Projects p WHERE p.emp_id = e.id);"
            }
          ]
        }
      ]
    },
    {
      "id": "advanced",
      "title_ar": "٦. الاستعلامات الفرعية والمفاهيم المتقدمة (Subqueries, Views, Indexes & ACID)",
      "title_en": "6. Subqueries, Views, Indexes & ACID",
      "icon": "⚡",
      "cards": [
        {
          "title": "الاستعلامات الفرعية (Subqueries)",
          "details_ar": "استعلام مكتوب داخل استعلام آخر. يُنفذ الداخلي أولاً ثم يُمرر للسطحي:\n• Single-row: يُرجع قيمة واحدة فقط (مثل استعلام يحسب AVG).\n• Multiple-row: يُرجع قائمة قيم (يُستخدم مع IN و ANY و ALL).\n• Correlated Subquery: استعلام فرعي يعتمد على عمود من الاستعلام الخارجي، ويعاد تنفيذه لكل صف على حدة.",
          "code": "-- Correlated Subquery Example\nSELECT name, salary \nFROM Employees e1 \nWHERE salary > (\n    SELECT AVG(salary) \n    FROM Employees e2 \n    WHERE e2.department_id = e1.department_id\n);"
        },
        {
          "title": "معاملات المجموعات (Set Operators: UNION vs UNION ALL)",
          "details_ar": "تدمج نتائج استعلامين معاً بشرط تماثل عدد ونوع الأعمدة:\n• UNION: تدمج وتزيل التكرار (أبطأ).\n• UNION ALL: تدمج مع الإبقاء على كل المكررات (أسرع بكثير).\n• INTERSECT: تُرجع الصفوف المشتركة بين الاستعلامين فقط.\n• EXCEPT / MINUS: تُرجع الصفوف الموجودة في الأول وغير موجودة في الثاني.",
          "code": "SELECT name FROM student_2025\nUNION ALL\nSELECT name FROM student_2026;"
        },
        {
          "title": "الجداول الافتراضية والفهارس (Views & Indexes)",
          "details_ar": "• VIEW: جدول وهمي (Virtual Table) ناتج عن استعلام SELECT مخزن. لا يخزن بيانات فيزيائية، بل يسهل الاستعلامات المعقدة ويحمي الخصوصية.\n• INDEX: هيكل بيانات مبني على أعمدة معينة لتسريع استرجاع البيانات وتحسين أداء SELECT بنسب مذهلة، لكنه يستهلك مساحة ويبطئ عمليات INSERT/UPDATE.",
          "code": "-- Create View\nCREATE VIEW top_students AS \nSELECT name, marks FROM student WHERE marks > 90;\n\n-- Create Index\nCREATE INDEX idx_name ON student(name);"
        },
        {
          "title": "خصائص العمليات الآمنة (ACID Properties)",
          "details_ar": "المبادئ الأربعة التي تضمن أمان المعاملات المالية وقواعد البيانات:\n• Atomicity (الذرية): الكل أو لا شيء (All or Nothing). إما أن تتم جميع خطوات العملية معاً أو تُلغى بالكامل.\n• Consistency (الاتساق): الحفاظ على صحة وقيود قاعدة البيانات قبل وبعد المعاملة.\n• Isolation (العزل): كل معاملة تنفذ بمعزل عن المعاملات المتزامنة الأخرى منعاً لتضارب البيانات.\n• Durability (الديمومة): فور تأكيد المعاملة (COMMIT)، تُحفظ التغييرات بشكل دائم حتى لو انقطعت الكهرباء.",
          "code": "BEGIN TRANSACTION;\n  UPDATE Account SET balance = balance - 1000 WHERE id = 1;\n  UPDATE Account SET balance = balance + 1000 WHERE id = 2;\nCOMMIT;"
        }
      ]
    }
  ]
};
