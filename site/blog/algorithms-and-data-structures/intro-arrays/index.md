---
title: Introduction to Arrays
desc: TODO
layout: post
date: 2019-08-21
category: "Algorithms and Data Structures"
eleventyExcludeFromCollections: true
tags:
  - a&ds
  - array
  - Y2019
---

[Plan of the series.](/blog/algorithms-and-data-structures/plan/)

Array is a fundamental data structure. We use it everyday in our work. A lot of other data structures leverage arrays as an underlying data storage – Stacks, Heaps, Hash Tables, multiple graph representations use arrays, Binary trees, etc...

But what is an array?

> **Array** – is a contiguous area of memory which is split in equal-size elements indexed by contiguous integers. An array is stored such that the position of each element can be computed from its index by a mathematical formula.

## Single dimension arrays

For single dimension arrays the formula to calculate the location of an element in memory is quite simple:

```
location = offset + (size * index)

// offset – is an offset of an address in memory
// size   – is a size of an array element
// index  – is an index of an element we are tryign to access
```

Lets consider the following example. Say an offset of our array is 20, which is the starting address of a memory block. That's how our array would've been layed out in memory using the formula above:

```
size:      1
address:   20   21   22   23   24   25
index:     0    1    2    3    4    5
data:      | e1 | e2 | e3 | e4 | e5 | e6 |
```

## Multidimensional arrays

To figure out how accessing elements in multidimensional array works we need to agree on a way of laying out multidimensional arrays in memory. We have two main options here.

But let's start with an example of a multidimensional array:

```
A = [
  [1, 2, 3],
  [4, 5, 6]
]
```

#### Row major order

Row major order means that elements of an array are stored in memory in a way that when going from left-to-right it first goes through all elements of a row before going to next one.

Formula:

```
location = offset + (row_increment * row_index) + (size * column_index)

// offset        – is an offset of an address in memory
// size          – is a size of an array element
// row_index     – is an index of a row in the array
// row_increment – is a row address increment
// column_index  – is an index of a row in the array
```

In memory stored as: `1, 2, 3, 4, 5, 6`

```
| address | element | access  |
|    0    |    1    | A[0][0] |
|    1    |    2    | A[0][1] |
|    2    |    3    | A[0][2] |
|    3    |    4    | A[1][0] |
|    4    |    5    | A[1][1] |
|    5    |    6    | A[1][2] |

```

#### Column major order

Column major order means that elements of an array are stored in memory in a way that when going from left-to-right it first goes through all elements of a column before going to next one.

Formula:

```
location = offset + (size * row_index) + (column_increment * column_index)

// offset           – is an offset of an address in memory
// size             – is a size of an array element
// row_index        – is an index of a row in the array
// column_index     – is an index of a row in the array
// column_increment – is a column address increment
```

In memory stored as: `1, 4, 2, 5, 3, 6`

```

| address | element | access  |
|    0    |    1    | A[0][0] |
|    1    |    4    | A[1][0] |
|    2    |    2    | A[0][1] |
|    3    |    5    | A[1][1] |
|    4    |    3    | A[0][2] |
|    5    |    6    | A[1][2] |

```

> For more in-depth explanation please refer to this wiki page on [row and column major ordering](https://en.wikipedia.org/wiki/Row-_and_column-major_order).

#### Jagged arrays

This formula for accessing elements in multidimensional arrays is only suitable for cases when an array is rectangular, e.g. number of items in rows is equal.

In real life it's quite common for arrays to have different number of elements in rows, these arrays are also called **jagged**, because of the way they look when visualized:

```
A = [
  [1, 2, 3],
  [4, 5, 6, 7],
  [8, 9]
]
```

In memory it'd look something like:

```
[
  pointer, -> [1, 2, 3]
  pointer, -> [4, 5, 6, 7]
  pointer  -> [8, 9]
]
```

## Static vs Dynamic Arrays

## Array's API

#### Complexity

## Arrays in Modern Browsers

#### JavaScript Simple Arrays

#### JavaScript Typed Arrays

## Interesting Coding Challenges to Practice Arrays

## Sub-topics

## Sources

- [Arrays (video)](https://www.coursera.org/lecture/data-structures/arrays-OsBSF)
- [UC Berkeley CS61B - Linear and Multi-Dim Arrays (video)](https://archive.org/details/ucberkeley_webcast_Wp8oiO_CZZE) (Start watching from 15m 32s)
- [Basic Arrays (video)](https://archive.org/details/0102WhatYouShouldKnow/02_04-basicArrays.mp4)
- [Multi-dim (video)](https://archive.org/details/0102WhatYouShouldKnow/02_05-multidimensionalArrays.mp4)
- [Dynamic Arrays (video)](https://www.coursera.org/lecture/data-structures/dynamic-arrays-EwbnV)
- [Jagged Arrays (video)](https://www.youtube.com/watch?v=1jtrQqYpt7g)
- [Jagged Arrays (video)](https://archive.org/details/0102WhatYouShouldKnow/02_06-jaggedArrays.mp4)
- [Resizing arrays (video)](https://archive.org/details/0102WhatYouShouldKnow/03_01-resizableArrays.mp4)
- https://github.com/v8/v8/blob/master/src/builtins/builtins-array.cc
- https://www.ecma-international.org/ecma-262/5.1/#sec-15.4
- https://en.wikipedia.org/wiki/Iliffe_vector
- https://en.wikipedia.org/wiki/Jagged_array
