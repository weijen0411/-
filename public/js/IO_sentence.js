const diveLinker = new DiveLinker('dive');

setInterval(() => {
    const outputList = diveLinker.getOutputList();

    let data;
    for (var key in outputList) {
        if (outputList[key].name === '返回') {
            data = outputList[key].value;
            break;
        }
    }

    if (data === 1)
        location.assign('./class_sentence.html');

}, 500);