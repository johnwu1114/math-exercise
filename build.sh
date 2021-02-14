#!/bin/bash

PAGES=(
    ""
    "schulte-table"
    "addition"
    "subtraction"
    "multiplication-9x9"
    "multiplication-19x19"
    "clock"
)

main() {
    npm run build
    rm -rf docs 
    mv build docs

    exportSitemap
}

exportSitemap() {
    cat << EOF > docs/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

    for page in "${PAGES[@]}"; do
        echo "  <url>" >> docs/sitemap.xml
        echo "    <loc>https://math-exercise.johnwu.cc/en/${page}</loc>" >> docs/sitemap.xml
        echo "    <lastmod>$(date -u +'%Y-%m-%dT%H:%M:%SZ')</lastmod>" >> docs/sitemap.xml
        
        for langCode in $(ls src/locales/ | sed 's/\.[^.]*$//'); do
            echo "    <xhtml:link rel=\"alternate\" hreflang=\"${langCode}\" href=\"https://math-exercise.johnwu.cc/${langCode}/${page}\" />" >> docs/sitemap.xml
        done

        echo "  </url>" >> docs/sitemap.xml
    done
    
  echo "</urlset>" >> docs/sitemap.xml
}

main "$@"