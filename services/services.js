const { Pool } = require('pg'); 

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'test', 
	password: '1234',
	port: 5432,
});

async function consultaLogin(user,pass) {
	try {
		const query = 'select name,pass from persons where name=\''+user+'\' and pass=\''+pass+'\'';
		var cons = await pool.query(query);
	if (cons.rowCount==1){
		return true;
	}else{
		return false;
	}
	} catch (err) {
		console.error(err);
		console.error('Query failed');
		return false;
	}
}

async function consultaTabla() {
	const query = 'select * from persons;';
	var cons = await pool.query(query);
	return cons.rows;
}
function updateTable(user,pass,action) {
	console.log('updateTable');
	switch(action){
		case 0:
			var query = 'insert into persons(personid,name,pass) values(5,\''+user+'\',\''+pass+'\')';
		break;
		case 1:
			var query = 'delete from persons where name=\''+user+'\' and pass=\''+pass+'\'';
		break;
			default:
	}
	pool.query(query);
	let newQuery = consultaTabla();
	return newQuery;
}
function alterTable(user,pass,newUser,newPass) {
	const query = ' update persons set name=\''+newUser+'\',pass=\''+newPass+'\' where name=\''+user+'\' and pass=\''+pass+'\'';
	pool.query(query);
	let newQuery = consultaTabla();
	return newQuery;
}
module.exports = {
    consultaTabla,
    consultaLogin,
    updateTable,
    alterTable
};