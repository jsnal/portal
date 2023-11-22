---
title: Change Git Author
tags: [git, wiki]
updated: Nov 10 2023
---

Change the author for the last commit:

```
git commit --amend --author 'Jason Long <jasonlongball@gmail.com>'
```

Change the author for the last N commits:

```
git rebase -i HEAD~4 -x "git commit --amend --author 'Jason Long<jasonlongball@gmail.com>' --no-edit"
```

Drop the `--no-edit` flag to get confirmation from amend operation. Use`git rebase -i` for manual rebasing for each commit.
