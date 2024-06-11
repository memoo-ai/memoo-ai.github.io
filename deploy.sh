# #!/bin/sh

# # building
# pnpm build

# # upload builded files
# echo "Starting to sftp…"
# sftp -i ~/.ssh/envomusic_server_web.pem root@101.132.121.3 <<EOF
# cd /opt/envo/envomusic_ui_crm
# put -r ./dist/*
# cd /etc/nginx
# put ./nginx.conf nginx.envomusic_ui_crm.conf
# bye
# EOF
