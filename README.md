```yaml
services:
  app:
    image: ghcr.io/wjdgustn/modmail:main
    extra_hosts:
      - host.docker.internal:host-gateway
    labels:
      com.centurylinklabs.watchtower.enable: true
    environment:
      TOKEN: BOT_TOKEN
      MONGODB_HOST: host.docker.internal
      MONGODB_PORT: 27017
      MONGODB_USER: root
      MONGODB_PASSWORD: pass
      DBNAME: ModMail

      TICKET_CHANNEL_ID: forum_channel_id
      DISABLE_ANONYMOUS_TICKET: false
```