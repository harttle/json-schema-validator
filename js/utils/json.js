define(function () {
    function parse(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    }
    function stringify(obj) {
        return JSON.stringify(obj, null, 4);
    }
    return {parse: parse, stringify: stringify};
});
