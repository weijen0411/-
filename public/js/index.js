const init = async () => {
    const { account } = sessionStorage;
    const courseProgress = await DB_API.getCourseProgress(account);

    const toggleCourseBtnLocked = (elementId, isLock) => {
        const domElement = document.querySelector(`#${elementId}`);

        if (isLock) {
            domElement.classList.add('locked');
            domElement.classList.remove('unlocked');
            domElement.disabled = true;
        }
        else {
            domElement.classList.remove('locked');
            domElement.classList.add('unlocked');
            domElement.disabled = false;
        }
    }

    const fourtyProgress = courseProgress.find(el => el.courseName === 'class_fourty');
    for (var key in fourtyProgress) {
        const value = fourtyProgress[key];

        //如果有四十音課程還沒上完
        if (typeof (value) === 'boolean' && !value) {
            //鎖住第二課的按鈕
            toggleCourseBtnLocked('class-2', true);
            //鎖住測驗一跟二的按鈕
            toggleCourseBtnLocked('test-1', true);
            toggleCourseBtnLocked('test-2', true);
            break;
        }
    }

    const wordProgress = courseProgress.find(el => el.courseName === 'class_word');
    for (var key in wordProgress) {
        const value = wordProgress[key];

        //如果有單字課程還沒上完
        if (typeof (value) === 'boolean' && !value) {
            {
                //鎖住課程三的按鈕
                toggleCourseBtnLocked('class-3', true);
                //鎖住測驗一跟二的按鈕
                toggleCourseBtnLocked('test-3', true);
                toggleCourseBtnLocked('test-4', true);
                break;
            }
        }
    }


    const wrappers = document.querySelectorAll('.btn_wrapper');
    for (var wrapper of wrappers) {
        console.log(wrapper.children);
        break;
    }
}

init();