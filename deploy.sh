#!/usr/cat ./docker-compose.yml | ssh broken@brokenhand.ga -p 2200 "$( cat <<'EOT'
echo "These commands will be run on: $( uname -a )"
echo "They are executed by: $( whoami )"
EOT
)"
