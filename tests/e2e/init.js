const detox = require('detox');
const config = require('../package.json').detox;

before(async () => {
  await detox.init(config);
});

beforeEach(async function beforeEach() {
    if (jet.context && jet.root && jet.root.setState) {
        jet.root.setState({
            currentTest: this.currentTest,
        });
    }

    const retry = this.currentTest.currentRetry();

    if (retry > 0) {
        if (retry === 1) {
            console.log('');
            console.warn(`⚠️ A test failed:`);
            console.warn(`️   ->  ${this.currentTest.title}`);
        }

        if (retry > 1) {
            console.warn(`   🔴  Retry #${retry - 1} failed...`);
        }

        console.warn(`️   ->  Retrying... (${retry})`);
        await sleep(3000);
    }
});

after(async () => {
    console.log('Cleaning up...');
    await detox.cleanup(); // TODO hangs - most likely jet internals interfering
    console.log('Detox cleaned up...');
});