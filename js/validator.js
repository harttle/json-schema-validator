define(function (require) {
    var Editor = require('./editor');
    var konsole = require('./konsole');
    var schemas = require('./schemas');
    var json = require('./utils/json');
    var Ajv = require('ajv');
    var zh = require('ajv-i18n/localize/zh');

    /**
     * @class
     */
    function Validator() {
        this.schemaEditor = new Editor('schema-editor');
        this.dataEditor = new Editor('data-editor');

        schemas.loadSchema('./schemas/example.json').then(x => {
            this.schemaEditor.setValue(JSON.stringify(x, null, 4));
            this.schemaEditor.clearSelection();
        });
    }
    Validator.prototype.validate = function () {
        var schema = this.schemaEditor.getValue();
        var data = this.dataEditor.getValue();

        schema = json.parse(schema);
        data = json.parse(data);
        if (!schema) {
            konsole.error('Schema 不合法');
            return;
        }
        if (!data) {
            konsole.error('数据不合法');
            return;
        }

        var ajv = new Ajv({loadSchema: schemas.loadSchema});
        return ajv.compileAsync(schema).then(function (validate) {
            var valid = validate(data);
            if (valid) {
                konsole.info('校验成功');
                return;
            }
            zh(validate.errors);
            validate.errors.forEach(function (err) {
                konsole.error('"' + err.dataPath + '" '
                  + err.message
                  + ' [' + err.schemaPath + ']');
            });
        })
        .catch(function (err) {
            konsole.error('意外错误', err.message);
        });
    };
    Validator.prototype.infer = function () {
        var data = json.parse(this.dataEditor.getValue());
        if (!data) {
            konsole.error('数据不合法');
            return;
        }
        var schema = schemas.generate(data);
        this.schemaEditor.setValue(JSON.stringify(schema, null, 4));
        this.schemaEditor.clearSelection();
        konsole.info('生成 Schema 成功');
    };
    return Validator;
});

