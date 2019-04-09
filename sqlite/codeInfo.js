const sequelize = require('sequelize');
const crypto = require('crypto');
const mySqliteDB = require('./index')
const {
    TEXT
} = sequelize;
//创建codes表
const Code = mySqliteDB.define('codes', { 
    info: {
        type: TEXT
    }
});
const getRandomString = (len = 6) => {
    const buf = crypto.randomBytes(len);
    return buf.toString('hex');
};

module.exports = {
    createTable : async () => {
        // 如果 force 为 true, 则每次都会重建表 CODES
        await Code.sync({
            force: true,
        });
    },
    createCodeInfo : async (infos) => {
        return await Code.create({
            info: infos
        });
    },
    querySingle : async (id) => {
        return await Code.findOne({
            where: {
                id,
            },
        })
    },
    queryAll : async () => {
    // 查询所有的结果
    const codes = await Code.findAll();
    // codes.forEach((codes) => console.log('findAll', 'id' + codes.id, codes.name, codes.des));
    },
    update : async () =>{
        const codes3 = Code.build({
            id: 2
        });
        const result3 = await codes3.update({
            info:'11222222'
        });
        // console.log('result3: ', JSON.stringify(result3));
    }

}
