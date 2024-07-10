---
title: Read ELF Symbols
tags: [c++, osdev, wiki]
updated: Jul 10 2024
---

I always seem to forget these commands so here is a list of commands to read
ELF symbols.

## Read ELF Header

`readelf -h /path/to/bin`

## Read Symbols

`objdump` is the best tool for this in my experience.

`objdump -d /path/to/executable`
`objdump -D /path/to/so`
`objdump -s /path/to/a`

Append a `-C` to any of those commands to demangle C++ symbols. The `nm`
command can also be used to read symbols and is very similar to `objdump`.

`nm /path/to/executable`
`nm -gD /path/to/so`
`nm -gs /path/to/a`

## Reading Addresses

Sometimes I want to find the line of code that corresponds to an address. This
can be done using the `addr2line` command.

`addr2line -e /path/to/binary -fp 0xdeadbeef`
