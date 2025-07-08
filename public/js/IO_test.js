const diveLinker = new DiveLinker('dive');

const timer = setInterval(async () => {
    const outputList = diveLinker.getOutputList();

    let isBack;
    for (var key in outputList) {
        if (outputList[key].name === '返回') {
            isBack = outputList[key].value;
            break;
        }
    }

    if (isBack === 1) {
        clearInterval(timer);

        const { account } = sessionStorage;
        let score;
        for (var key in outputList) {
            if (outputList[key].name === '分數') {
                score = outputList[key].value;
            }
        }

        const currentPage = location.href.split('/').pop();
        if (currentPage === 'test_1.html') {
            await DB_API.postTestLog(account, '40音-發音辨讀', score);
        }
        if (currentPage === 'test_2.html') {
            await DB_API.postTestLog(account, '40音-聽力測驗', score);
        }
        if (currentPage === 'test_3.html') {
            await DB_API.postTestLog(account, '單字-聽讀練習', score);
        }
        if (currentPage === 'test_4.html') {
            await DB_API.postTestLog(account, '單字-圖文配合', score);
        }

        location.assign('./select.html');
        sessionStorage.setItem('pageIndex', 2);
    }

}, 500);