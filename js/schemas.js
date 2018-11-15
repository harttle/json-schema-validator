define(function (require) {
    var axios = require('axios');
    var konsole = require('./konsole');
    var generator = require('jsg07');
    var json = require('./utils/json');

    function generate(data) {
        var schema = JSON.stringify(generator.infer(data), null, 4);
        schema = json.parse(schema) || {};
        schema.$schema = 'http://json-schema.org/draft-07/schema#';
        return schema;
    }

    function loadSchema(uri) {
        konsole.log('正在获取', uri, '...');
        return axios.get(uri)
            .then(x => {
                konsole.info(uri, '获取完成');
                return x.data;
            })
            .catch(e => {
                konsole.error(uri, '获取失败:', e.message);
                throw e;
            });
    }

    return {loadSchema: loadSchema, generate: generate};
});
