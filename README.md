```yaml
services:
  app:
    image: ghcr.io/wjdgustn/ModMail:master
    environment:
      TOKEN: BOT_TOKEN
      MONGODB_HOST: host.docker.internal
      MONGODB_PORT: 27017
      MONGODB_USER: root
      MONGODB_PASSWORD: pass
      DBNAME: ModMail

      GUILD_ID: guild_id
      TICKET_CHANNEL_ID: forum_channel_id
```