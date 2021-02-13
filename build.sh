#!/bin/bash

main() {
    npm run build
    rm -rf docs 
    mv build docs

    copyPages
    copyFolderByLangCodes
    cp docs/en/* docs/
}

copyPages() {
    mkdir -p docs/en/

    local pages=(
        "index"
        "404" 
        "schulte-table"
        "addition"
        "subtraction"
        "multiplication-9x9"
        "multiplication-19x19"
        "clock"
    )
    IFS=' ' read -r -a local pages <<< "$@"
    for page in "${pages[@]}"; do
        cp docs/index.html docs/en/$page.html
    done
}

copyFolderByLangCodes() {
    for langCode in $(ls src/locales/ | sed 's/\.[^.]*$//'); do
        if [ "$langCode" == "en" ]; then continue; fi
        cp -R docs/en docs/$langCode
    done
}

main "$@"