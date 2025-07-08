const firebaseConfig = {
    apiKey: "AIzaSyC9y3cEJL_EGBD3Qby6R_09VJq2lTEby-8",
    authDomain: "learn-korean-453d5.firebaseapp.com",
    projectId: "learn-korean-453d5",
    storageBucket: "learn-korean-453d5.appspot.com",
    messagingSenderId: "972426028673",
    appId: "1:972426028673:web:0efb10d93df88da1880f80"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


class API {
    //取得所有使用者資料
    async getUsers() {
        const getUsers = await db.collection('users').get();
        return getUsers.docs.map(user => user.data());
    }

    //輸入:帳號,密碼
    //輸出:是否有該使用者
    async getUser(account, password) {
        const getUser = await db.collection('users').where('account', '==', account).get();
        if (getUser.empty) return 'user not found';

        const userData = getUser.docs[0].data();
        if (userData.password !== password) return 'wrong password';

        return 'logged in';
    }

    //輸入:帳號、課程名稱、章節
    //完成課程
    async finishCourse(account, courseName, chapter) {
        const getUser = await db.collection('users').where('account', '==', account).get();
        if (getUser.empty) return 'user not found';

        const getCourse = await getUser.docs[0].ref.collection('courses').where('courseName', '==', courseName).get();

        const updateData = {};
        updateData[chapter] = true;
        await getCourse.docs[0].ref.update(updateData);

        return 'success';
    }

    //輸入:帳號
    //輸出:該帳號上課進度
    async getCourseProgress(account) {
        const getUser = (await db.collection('users').where('account', '==', account).get()).docs[0];
        if (!getUser) return 'user not found';

        const getCourses = await getUser.ref.collection('courses').get();

        return getCourses.docs.map(course => course.data());
    }

    //輸入:帳號
    //輸出:該帳號所有測驗紀錄
    async getTestLogs(account) {
        const getUser = (await db.collection('users').where('account', '==', account).get()).docs[0];
        if (!getUser) return 'account not found';

        const getTestLogs = await getUser.ref
            .collection('testLogs')
            .orderBy('time', 'desc')
            .get();

        return getTestLogs.docs.map(log => log.data());
    }

    //輸入:帳號、測驗主題、分數
    //輸出:success/error
    async postTestLog(account, title, score) {
        const getUser = (await db.collection('users').where('account', '==', account).get()).docs[0];
        if (!getUser) return 'account not found';

        const getTimeString = (dateObj) => {
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const date = dateObj.getDate();

            const hour = dateObj.getHours().toString();
            const minute = dateObj.getMinutes().toString();

            return `${year}/${month}/${date} ${hour.length === 1 ? '0' + hour : hour}:${minute.length === 1 ? '0' + minute : minute}`;
        }

        const time = getTimeString(new Date());
        await getUser.ref.collection('testLogs').add({ title, score, time });

        return 'success';
    }
}

const DB_API = new API();