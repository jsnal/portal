---
title: C++
description:
---

## Using Valgrind

Valgrind is a programming tool for memory debugging, memory leak detection, and
profiling. It is mostly used when debugging C code that heavily uses `malloc`
function calls.

### Memory leak

You can perform a general memory leak check by running just valgrind on it.

```bash
$ valgrind ./a.out
```

To get things like where the memory leak is from and specific output you can do something like this.

```bash
$ valgrind --verbose --leak-check=full ./a.out
```

## Read ELF Symbols

I always seem to forget these commands so here is a list of commands to read
ELF symbols.

### Read ELF Header

`readelf -h /path/to/bin`

### Read Symbols

`objdump` is the best tool for this in my experience.

```
objdump -d /path/to/executable
objdump -D /path/to/so
objdump -s /path/to/a
```

Append a `-C` to any of those commands to demangle C++ symbols. The `nm`
command can also be used to read symbols and is very similar to `objdump`.

```
nm /path/to/executable
nm -gD /path/to/so
nm -gs /path/to/a
```

### Reading Addresses

Sometimes I want to find the line of code that corresponds to an address. This
can be done using the `addr2line` command.

`addr2line -e /path/to/binary -fp 0xdeadbeef`

## Custom CMake Toolchain

When cross-compiling, you want CMake to use a different toolchain than your
host's. The following code can do that:

```cmake
set(TOOLCHAIN_PATH ${CMAKE_SOURCE_DIR}/path/to/toolchain)

# May not me needed
set(TOOLCHAIN_PREFIX ${TOOLCHAIN_PATH}/i686-pc-os-)

set(CMAKE_C_COMPILER ${TOOLCHAIN_PREFIX}gcc)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PREFIX}g++)
set(CMAKE_ASM_COMPILER ${TOOLCHAIN_PREFIX}as)
set(CMAKE_LINKER ${TOOLCHAIN_PREFIX}ld)
set(CMAKE_RANLIB ${TOOLCHAIN_PREFIX}ranlib)
set(CMAKE_STRIP ${TOOLCHAIN_PREFIX}strip)
set(CMAKE_AR ${TOOLCHAIN_PREFIX}ar)
```

It also may be nice to use the actual linker included in the toolchain instead
of the compiler. CMake will default to using whatever compiler you specified for
the project type, C++ or C basically. The following command can specify a custom
link command that actually uses the `ld` command.

```cmake
set(CMAKE_CXX_LINK_EXECUTABLE
    "<CMAKE_LINKER> <LINK_FLAGS> <OBJECTS> -o <TARGET>")
```

Custom link flags can be added using the `LINK_FLAGS` variable.

```cmake
add_link_options(-Map build.map)
```
