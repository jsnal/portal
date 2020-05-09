# Git Patches

## Creating a Git Patch

First make sure the branch you're on has the commits you want to patch. Find a log of your branch with.

```
$ git log --pretty=oneline -3
```

When you're on the branch you want to make patch of run

```
$ git format-patch master --stdout > PATCHNAME.patch
```

## Applying the patch

Before applying you should probably look at the changes that patch comes with.

```
$ git apply --stat PATCHNAME.patch
 CMakeLists.txt |   13 +++++++++++++
 1 file changed, 13 insertions(+)
```

You can also check if there will be any conflicts before applying using

```
$ git apply --check PATCHNAME.patch
```

To actually apply the patch you can run

```
$ git apply PATCHNAME.patch
```

but you may want to sign off on the patch to verify that you checked for conflicts

```
$ git am --signoff < PATCHNAME.patch
```

More info [here](https://git-scm.com/docs/git-apply) and [here](https://git-scm.com/docs/git-am)

---

**Posted:** 07/24/19
