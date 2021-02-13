#!/bin/bash

PAGES=(
    "index"
    "schulte-table"
    "addition"
    "subtraction"
    "multiplication-9x9"
    "multiplication-19x19"
    "clock"
)
LANG_CODES=()

main() {
    npm run build
    rm -rf docs 
    mv build docs

    copyPages
    copyFolderByLangCodes
    cp docs/en/* docs/
    cp docs/index.html docs/404.html

    exportSitemap
}

exportSitemap() {
    cat << EOF > docs/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

    for langCode in "${LANG_CODES[@]}"; do
        for page in "${PAGES[@]}"; do
cat << EOF >> docs/sitemap.xml
  <url>
   <loc>https://math-exercise.johnwu.cc/${langCode}/${page}.html</loc>
   <lastmod>$(date -u +"%Y-%m-%dT%H:%M:%SZ")</lastmod>
  </url>
EOF
        done
    done
  cat << EOF >> docs/sitemap.xml
</urlset>
EOF
}

copyPages() {
    mkdir -p docs/en/
    for page in "${PAGES[@]}"; do
        cp docs/index.html docs/en/$page.html
    done
}

copyFolderByLangCodes() {
    for langCode in $(ls src/locales/ | sed 's/\.[^.]*$//'); do
        LANG_CODES+=($langCode)
        if [ "$langCode" == "en" ]; then continue; fi
        cp -R docs/en/ docs/$langCode/
    done
}

main "$@"