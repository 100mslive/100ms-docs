const { updateIndex } = require("./lib/algolia/getRecords")

const main = async() => {
    await updateIndex();
}

main();