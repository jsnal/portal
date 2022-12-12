---
tags: android wiki
created: 06/26/20
---
When building native NDK cpp code I frequently get an error that looks something like this...

```
Source path/to/libfoo.so and destination path/to/libfoo.so must be different
```

After looking into it I found that the root cause was that the model generation task was broken if ran from a non-clean build. It seems the temporary fix for now is to run clean, refresh the linked C++ projects, and then finally build the project. If this doesn't work, it'll likely something in the build is causing the project to regenerate. The best solution in that case is to downgrade gradle from plugin 4.0.0 to 3.6.2.

There is a issue thread [here](https://issuetracker.google.com/issues/158317988). A fix has been scheduled to be released with gradle plugin 4.0.1.
