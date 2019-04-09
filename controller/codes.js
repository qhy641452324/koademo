const codeModel = require('../sqlite/codeInfo')
class codesController {
    static async createNewInfo(ctx) {
        console.log(ctx)
        let infos = ctx.request.body.infos      
        if (infos) {
            try {
                const ret = await codeModel.createCodeInfo(infos);
                // console.info(ret)
                //const data = await codeModel.querySingle(ret.id);
                ctx.body = {
                    code: 200,
                    msg: '成功',
                    data: ret
                }
            } catch (err) {
                ctx.body = {
                    code: 200,
                    msg: '失败',
                    data: err.message
                }
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    };

    static async getCodeInfo(ctx) {
        // console.log(ctx)
        let id = ctx.params.id;
        if (id) {
            try {
                let data = await codeModel.querySingle(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: ''
            }
        }
    }
}

module.exports = codesController
