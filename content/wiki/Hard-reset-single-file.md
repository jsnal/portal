---
title: Hard reset a single file
tags: [git, wiki]
updated: July 18 2023
---
Usually I just want to reset the whole project using the following command:

```bash
git reset --hard
```

But, sometimes I just need to reset a single file (or a couple of files):

```bash
git checkout HEAD -- path/to/file
```

Since Git 2.23, there is a `restore` command that does the same thing

```bash
git restore path/to/file
```

Or even get the file from another branch/commit.

```bash
git restore -s branch path/to/file
```
