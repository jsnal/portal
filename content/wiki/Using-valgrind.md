---
title: Using Valgrind
tags: [c++, wiki]
---
Valgrind is a programming tool for memory debugging, memory leak detection, and profiling. It is mostly used when debugging C code that heavily uses `malloc` function calls.

## Memory leak

You can perform a general memory leak check by running just valgrind on it.

```bash
$ valgrind ./a.out
```

To get things like where the memory leak is from and specific output you can do something like this.

```bash
$ valgrind --verbose --leak-check=full ./a.out
```
