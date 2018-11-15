define(function() {
    function Editor(id) {
        var editor = ace.edit(id);
        editor.setTheme('ace/theme/monokai');
        editor.session.setMode("ace/mode/json");
        editor.session.setUseWrapMode(true);
        editor.$blockScrolling = Infinity;
        return editor;
    }

    return Editor;
});

