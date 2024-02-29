const config = {
    paths: ['src/tests/feature_files/*.feature'],
    require: ['src/tests/step_definitions/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: [
        'json:reports/cucumber-report.json',
        'html:reports/report.html',
        'summary',
        'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' }
};

module.exports = {
    default: config
}