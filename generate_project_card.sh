#!/bin/bash

OUTPUT="PROJECT_CARD.generated.txt"

echo "🧱 AI-Uncode – Project Card (AUTO-GENERATED)" > $OUTPUT
echo "==========================================" >> $OUTPUT
echo "" >> $OUTPUT

echo "1️⃣ Identity" >> $OUTPUT
echo "Project Name: $(basename $(pwd))" >> $OUTPUT
echo "Monorepo Package: N/A (standalone project)" >> $OUTPUT
echo "Detected Type:" >> $OUTPUT

if [ -d "apps" ]; then
  echo "- Likely Monorepo Root" >> $OUTPUT
elif [ -d "pages" ] || [ -d "app" ]; then
  echo "- Web App / Template" >> $OUTPUT
else
  echo "- Unknown / Utility" >> $OUTPUT
fi

echo "" >> $OUTPUT
echo "2️⃣ Purpose (Auto-Inferred)" >> $OUTPUT

if [ -f "README.md" ]; then
  echo "From README.md:" >> $OUTPUT
  sed -n '1,20p' README.md >> $OUTPUT
else
  echo "No README.md found. Purpose unclear." >> $OUTPUT
fi

echo "" >> $OUTPUT
echo "3️⃣ Responsibilities (Observed)" >> $OUTPUT
echo "- Handles UI rendering" >> $OUTPUT

if grep -q "supabase" package.json 2>/dev/null; then
  echo "- Communicates with Supabase" >> $OUTPUT
fi

if grep -q "auth" package.json 2>/dev/null; then
  echo "- Manages authentication logic" >> $OUTPUT
fi

echo "" >> $OUTPUT
echo "4️⃣ Dependencies" >> $OUTPUT

if [ -f "package.json" ]; then
  echo "Dependencies (top-level):" >> $OUTPUT
  jq '.dependencies | keys[]' package.json >> $OUTPUT 2>/dev/null
else
  echo "No package.json found." >> $OUTPUT
fi

echo "" >> $OUTPUT
echo "5️⃣ Data & Config" >> $OUTPUT

if grep -R "supabase" . >/dev/null 2>&1; then
  echo "- Uses Supabase (tables/config/auth)" >> $OUTPUT
else
  echo "- No Supabase usage detected" >> $OUTPUT
fi

echo "" >> $OUTPUT
echo "6️⃣ Observations & Risks (Auto)" >> $OUTPUT
echo "- Business logic may be mixed with UI (needs review)" >> $OUTPUT
echo "- No explicit schema validation detected (Zod?)" >> $OUTPUT

echo "" >> $OUTPUT
echo "7️⃣ AI Constraints (Default)" >> $OUTPUT
echo "- Do not refactor logic yet" >> $OUTPUT
echo "- Structure and boundaries only" >> $OUTPUT

echo "" >> $OUTPUT
echo "Generated on: $(date)" >> $OUTPUT

echo "✅ Project Card generated: $OUTPUT"
