#!/bin/sh

generate_html() {
    pandoc --from markdown \
        --to html5 \
        --toc \
        --toc-depth=2 \
        --mathml \
        --standalone \
        --variable=date:"$(date)" \
        --include-before-body="templates/header.html" \
        --include-after-body="templates/footer.html" \
        --template="templates/$3.html" \
        --output $2 \
        $1
}

make() {
    for entry in $1/*; do
        if [ -f $entry ]; then
            base=$(echo $entry | cut -d/ -f2)
            path=$(dirname $(echo $entry | cut -d/ -f2-))

            [ ! -d build/$path ] && mkdir -p build/$path

            if [ ${entry#*.} = "md" ]; then
                if [ $path = "." ]; then
                    output=build/$(basename $entry .md).html
                else
                    output=build/$path/$(basename $entry .md).html
                fi

                if echo $path | grep -qE "wiki/[[:alnum:]]"; then
                    generate_html $entry $output wiki
                else
                    generate_html $entry $output base
                fi
                echo "Generated $output"
            else
                cp $entry build/$path
                echo "Copied build/$entry"
            fi
        elif [ -d $entry ]; then
            make $entry
        fi
    done
}

make src

