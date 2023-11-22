---
title: Freestyle Jenkins Webhook
tags: [selfhost, wiki]
updated: Dec 31 2022
---
1) Create a personal ai token for your user.

`User > Settings > Developer Settings > Personal access tokens`

2) Append the token to repository url.

`https://<API-TOKEN>@github.com/jsnal/<REPO>`

3) Add webhook to Jenkins

`Settings > Webhooks > http://<URL>/github-webhook`
