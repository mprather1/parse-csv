#!/usr/bin/env bash

printf "#!/usr/bin/env bash\nHOME=\$HOME /usr/local/bin/node $(pwd)/index.js \$(pwd) \$1" > parse-csv && \
chmod +x parse-csv && \
sudo cp parse-csv /usr/bin && \
rm parse-csv && \
echo "success..."