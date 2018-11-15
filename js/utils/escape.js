define(function() {
    var div = document.createElement('div');
    function escapeHTML(str) {
        div.textContent = str;
        return div.innerHTML;
    }
    return {
        escapeHTML: escapeHTML
    };
});
