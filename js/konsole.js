define(function (require) {
    var Escape = require('./utils/escape');

    /**
     * @class 控制台
     */
    function Konsole(selector) {
        this.$el = $(selector);
        this.el = this.$el.get(0);
        this.info('控制台初始化完成');
    }

    Konsole.prototype.clear = function () {
        this.$el.empty();
    };

    Konsole.prototype.doLog = function (msgs, level) {
        var msg = msgs ? Array.prototype.join.call(msgs, ' ') : '';
        level = level || 'log';
        var levelStr = level.toUpperCase();
        var timeStr = (new Date()).toISOString();

        var $level = $('<span class="level">').addClass(level).html(levelStr);
        var $time = $('<time>').html(timeStr);
        var $message = $('<span>').html(Escape.escapeHTML(msg));

        var $log = $('<div>').append($level).append($time).append($message);
        this.$el.append($log);
        this.el.scrollTop = this.el.scrollHeight;

        let impl = console[level] || console.log;    // eslint-disable-line
        impl(timeStr, msg);
    };

    Konsole.prototype.log = function () {
        this.doLog(arguments, 'log');
    };

    Konsole.prototype.warn = function () {
        this.doLog(arguments, 'warn');
    };

    Konsole.prototype.info = function () {
        this.doLog(arguments, 'info');
    };

    Konsole.prototype.error = function () {
        this.doLog(arguments, 'error');
    };

    return new Konsole('#konsole');
});

