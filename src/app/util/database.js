export const tables = ['affiliate', 'marketing', 'influencer'];

export const db = openDatabase("wordsDatabase", '1.0', "My WebSQL Database", 5 * 1024 * 1024);

export const createTables = () => {
    db.transaction(tx => {
        tables.forEach(table => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${table} (word text)`);
        })
    });
}

export const insertToDB = (table, word) => {
    db.transaction(tx => {
        tx.executeSql(`INSERT INTO ${table} (word) VALUES (?)`, [word]);
    });
}

export const retreiveData = () => {
    return new Promise(resolve => {
        const promises = [];
        for (let table of tables) {
            promises.push(getSqlPromise(table));
        };
        Promise.all(promises)
            .then(array => {
                const sortedArray = array.reduce((map, obj) => {
                    map[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
                    return map;
                }, {})
                resolve(sortedArray);
            })
    });
}

const getSqlPromise = (table) => {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${table}`, [], (tx, results) => {
                resolve({ [table]: results.rows });
            })
        });
    })
}





