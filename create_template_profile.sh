#!/bin/bash

# ==============================================================================
#   السكربت المخصص لمشروع "القالب الرئيسي الموحد" (Done-For-You)
#   يُنشئ بطاقة تعريف تركز على مكونات الباقة المتكاملة.
# ==============================================================================

OUTPUT_FILE="template_profile.txt"

# --- (قائمة الملفات الهامة المستهدفة لهذا المشروع) ---
# هذه القائمة تحتوي على الملفات المتوقعة في مشروع القالب
IMPORTANT_FILES=(
  "README.md"
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  ".env.local.example"
  
  # ملفات صفحة الهبوط الرئيسية
  "src/app/layout.js"
  "src/app/page.js"
  
  # ملفات السفير الذكي (Widget)
  "src/components/SmartAmbassador.js"
  "public/config/ambassador-config.json"
  
  # ملفات تطبيق الويب التقدمي (PWA)
  "public/manifest.json"
  "public/service-worker.js"
  "src/lib/pwa-installer.js"
  
  # ملفات البيانات القابلة للتخصيص
  "src/data/site-content.json"
)
# ----------------------------------------------------

# دالة لطباعة عنوان قسم
print_header() {
  echo "
##############################################################################
# $1
##############################################################################
" >> "$OUTPUT_FILE"
}

# دالة لتلخيص ملف معين
summarize_file() {
  local file_path=$1
  if [ -f "$file_path" ]; then
    echo "
=======================================
الملف: $file_path
=======================================
" >> "$OUTPUT_FILE"
    echo "--------- (أول 20 سطرًا) ---------" >> "$OUTPUT_FILE"
    head -n 20 "$file_path" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------- (آخر 20 سطرًا) ----------" >> "$OUTPUT_FILE"
    tail -n 20 "$file_path" >> "$OUTPUT_FILE"
  fi
}

# التأكد من وجود أدوات أساسية
if ! command -v jq &> /dev/null; then
    echo "تثبيت أداة 'jq'..."
    sudo apt-get update > /dev/null 2>&1 && sudo apt-get install -y jq > /dev/null 2>&1
fi
if ! command -v tree &> /dev/null; then
    echo "تثبيت أداة 'tree'..."
    sudo apt-get update > /dev/null 2>&1 && sudo apt-get install -y tree > /dev/null 2>&1
fi

# بدء التقرير
rm -f "$OUTPUT_FILE"
echo "تقرير تعريف مشروع القالب المتكامل - تم إنشاؤه في: $(date)" > "$OUTPUT_FILE"
echo "==============================================================" >> "$OUTPUT_FILE"

# --- 1. إنشاء شجرة الملفات ---
print_header "هيكل المشروع (بعمق 5 مستويات)"
tree -L 5 -I "node_modules|.git|.next|dist|build" >> "$OUTPUT_FILE"

# --- 2. استخراج المكتبات المستخدمة ---
print_header "المكتبات المستخدمة (من package.json)"
if [ -f "package.json" ]; then
  echo "Dependencies:" >> "$OUTPUT_FILE"
  jq .dependencies package.json >> "$OUTPUT_FILE" 2>/dev/null
  echo "" >> "$OUTPUT_FILE"
  echo "DevDependencies:" >> "$OUTPUT_FILE"
  jq .devDependencies package.json >> "$OUTPUT_FILE" 2>/dev/null
fi

# --- 3. تلخيص محتوى الملفات الهامة المحددة ---
print_header "ملخص محتويات الملفات الهامة"
for file in "${IMPORTANT_FILES[@]}"; do
  summarize_file "$file"
done

echo "
##############################################################################
# انتهى التقرير
##############################################################################
" >> "$OUTPUT_FILE"

echo "اكتمل إنشاء بطاقة التعريف بنجاح! الملف الناتج هو: $OUTPUT_FILE"
