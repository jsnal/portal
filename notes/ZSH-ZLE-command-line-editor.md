# Zsh zle(Zsh command line editor)

Using the built-in zsh zle functionality

## Keymaps:

Set zsh to emacs keybinds

```
bindkey -e
```

Create a simple function

```
function edit-zshrc() {
  vim $HOME/.zshrc

}
```

Create a new zle widget

```
zle -N edit-zshrc
```

Call the widget

```
bindkey '^e' edit-zshrc
```

## Standard Widgets:

```
forward-word           Go forward by one word
backward-word          Go backward by one word
kill-whole-line        Remove all text on the current line
backward-kill-word     Kill one word backwards
kill-word              Kill one word forwards

See zshzle(1) line 855
```

## Loading Built-in Widgets:

```
autoload -U edit-command-line
zle -N edit-command-line

bindkey '^x^x' edit-command-line
```

## Other commands:

Delete widget

```
zle -D [widget]
```

Alias a widget to another widget

```
zle -A [old-widget] [new-widget]
```

See zshzle(1) for more info

---

**Posted:** 06/02/19
