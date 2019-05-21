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
    debugger;
    db.transaction(tx => {
        tx.executeSql(`INSERT INTO ${table} (word) VALUES (?)`, [word]);
    });
}

export const retreiveData = () => {
    const sortedWords = [];
    return new Promise(resolve => {
        db.transaction(tx => {
            for (let table of tables) {
                tx.executeSql(`SELECT * FROM ${table}`, [], (tx, results) => {
                    sortedWords.push({ table: results.rows });
                });
            };
            resolve(sortedWords);
        });
    });
}





