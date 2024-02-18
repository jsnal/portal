---
title: Custom CMake Toolchain
tags: [osdev, wiki]
updated: Feb 18 2024
---

When cross-compiling, you want CMake to use a different toolchain than your host's. The following code can do that:

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

It also may be nice to use the actual linker included in the toolchain instead of the compiler. CMake will default to using whatever compiler you specified for the project type, C++ or C basically. The following command can specify a custom link command that actually uses the `ld` command.

```cmake
set(CMAKE_CXX_LINK_EXECUTABLE
    "<CMAKE_LINKER> <LINK_FLAGS> <OBJECTS> -o <TARGET>")
```

Custom link flags can be added using the `LINK_FLAGS` variable.

```cmake
add_link_options(-Map build.map)
```
