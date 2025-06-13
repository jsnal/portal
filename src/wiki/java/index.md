---
title: java and kotlin
description:
---

## Javadoc Style Guide

### what to document

all public and protected methods, fields, and classes should be fully
documented. private members may also benefit from being documented but they will
not be held to the same standards as public and protected.

overridden methods should include javadoc if the specifics of the method are
different than the original definition.

### general format

javadoc requires that all comments start with /** and end with a corresponding
*/. on every additional line, there should be a star at the start. the most
basic javadoc for methods and variables follow a form that looks like this:

```java
/**
 * a helpful description sentence about the method that is long and
 * may wrap to the next line.
 */
public void foo(int bar) { … }
```

if the comment can fit on a single line (such as commenting a public variable), then use the following form:

```java
/** a small description that fits on a single line */
public static final int pi = 3.14;
```

### first sentence

the first sentence of a method or class should be a high level overview. avoid
using @link in the first sentence as this distracts from the main point of that
method or class. instead, use a @code tag.

### paragraphs

long javadoc should be split into logical paragraphs to make it more readable.
javadoc makes use of html <p> tags to separate blank lines between paragraphs.
it is expected to place a single <p> tag on the blank line between paragraphs:

```java
/**
 * a long paragraph about some method or class.
 * <p>
 * a second paragraph.
 * <p>
 * maybe even a third paragraph.
  */
public void foo() { … }
```

### line wrap

a line of javadoc should wrap at 100 characters and continue on the following
line. this should be the default android studio wrap setting but if it's not,
navigate to editor > code style. set hard wrap to 100.

### block tags

the following is a list of the javadoc block tags that are expected to be used
and how they are supposed to be used to describe the method or class. a blank
line should be placed in between the last line of the method description and the
first block tag. there should be no blank lines within the block tags. if the
description of the tag needs to wrap to the next line, the start of the line
should be in line with the start of the description.

#### @param

used to name and describe a parameter. the tag should be followed by the name of
the parameter, followed by a small description of what the parameter is. the
description of begins with a lowercase letter and is generally a noun ('the',
'a', etc). the order of the tags should be in the order of the actual
parameters.

``` java
/**
 * …
 *
 * @param file the path to the file
 * @param attempts the number of attempts to open the file
 */
public void openfile(string file, int attempts) { … }
```

#### @return

used to describe the return value of a method with a return. this tag shouldn't
be used for methods that return void or constructors. the same capitalization
that @param should be used for this tag too.

#### @throws

used for every checked exception as declared in the throws part of the method
signature, and any unchecked expectations that the programmer may want to catch.
it's not necessary for all expectations to be documented for all methods, just
reasonably important ones. the tag should be followed by a description of when
the exception is thrown and usually starts with the word 'if'. follows the same
capitalization rules as @param.

#### @see

used to reference another class or method that may be helpful for readers
understanding. for example, it may be helpful to the reader to see the
implementation of an abstract base class.

#### @since

specifies the version of the sdk since this api was added. if an entire class or
interface was added in one version, just add the tag to the class javadoc and
not every method. only subsequent new methods will be annotated with this tag.
after this tag is written, it should never be changed unless the method is
removed completely.

#### order

block tags should be in the following order: @param, @return, @throws, @see,
@since

#### Full Example

```java
/**
 * …
 * @param dividend the number which is getting divided
 * @param divisor the number that divides the dividend
 * @return the quotient of the operation
 * @throws ArithmeticException if the divisor is equal to zero
 */
public int divide(int dividend, int divisor) { … }
```

```java
/**
 * …
 * @param bar an example of a long description of this variable and
 *            where it would wrap on the next line
 * @param baz followed by a shorter one
 */
public void foo(int bar, int baz) { … }
```

#### Getters and Setters

For simple getters and setters, some block tags can be left out. This should
only be done for self-explanatory methods that don't need any extra description
other than "Returns the value". A single line form can be used in this case.

#### Good example

This method doesn't need any further explanation other than that it returns that
person's name.

```java
/** Returns the person's name */
public String getName() { … }
```

#### Bad example

This method could benefit from what type the time will be when it's returned and
what the format will be. The programmer will not know how to properly use this
method.

```java
/** Returns the time */
public long getTime() { … }
```

### Abstract Members

Abstract classes and methods should be documented on how they are used
internally in the class and how they should be implemented. Be specific and
focus on higher level details that are necessary for the base class. For
implementation specific details, add a "Implementation notes" header where
implementation specific details are provided.

```java
/**
 * …
 * <h4>Implementation notes</h4>
 * Be aware that implementations of this class need to manage…
 */
```
