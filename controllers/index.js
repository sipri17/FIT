const { comparePassword, hashedPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User, Epresence } = require('../models')

class Controller {

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'data not found', message: 'error invalid email or password' }
            const validPassword = comparePassword(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'error invalid email or password' }

            const payload = {
                id: user.id
            }

            const access_token = generateToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }



    static async createEpresence(req, res, next) {
        try {
            const { type } = req.body;
            let waktu = new Date();
            const newEpresence = await Epresence.create({ type, id_user: req.user.id, waktu })

            function convertDateTime(input) {

                const optionsDate = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };

                const optionsClock = {
                    hour12: false,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                }


                const dateParts = input.toLocaleDateString('ja-JP', optionsDate).split('/').join('-');
                const clockParts = input.toLocaleTimeString('en', optionsClock);

                const convertedDateTime = dateParts + ' ' + clockParts

                return convertedDateTime;
            }

            waktu = convertDateTime(waktu)

            res.status(201).json({ type, waktu })
        } catch (error) {
            next(error)
        }
    }

    static async approve(req, res, next) {
        try {
            const { id } = req.params;
            const epresence = await Epresence.findByPk(id)
            await epresence.update({ is_approve: true })

            res.status(200).json({ message: "Epresence has been approved" })
        } catch (error) {
            next(error)
        }
    }

    static async findAllEpresence(req, res, next) {
        try {
            let epresences = await Epresence.findAll({ include: User })

            function convertDateTime(input) {

                const optionsDate = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };

                const optionsClock = {
                    hour12: false,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                }


                const dateParts = input.toLocaleDateString('ja-JP', optionsDate).split('/').join('-');
                const clockParts = input.toLocaleTimeString('en', optionsClock);

                const convertedDateTime = {
                    date: dateParts,
                    clock: clockParts
                };

                return convertedDateTime;
            }

            epresences = epresences.map(data => {
                data.dataValues.waktu = convertDateTime(data.waktu)
                return data
            })

            function groupData(input) {
                const result = {}
                input = input.map(user => user.dataValues)
                for (let x of input) {
                    if (!result[x.id_user]) {
                        result[x.id_user] = {}
                    }
                    if (!result[x.id_user][x.waktu.date]) {
                        result[x.id_user][x.waktu.date] = { nama_user: x.User.dataValues.nama }
                    }
                    if (!result[x.id_user][x.waktu.date][x.type]) {
                        let status;
                        if (x.is_approve) status = "APPROVED"
                        else status = "REJECTED"
                        result[x.id_user][x.waktu.date][x.type] = { clock: x.waktu.clock, status }
                    }

                }
                return result
            }

            const groupedData = groupData(epresences)

            function formatData(input) {
                const result = []
                for (let x in input) {
                    for (let y in input[x]) {
                        console.log('triggered',input[x][y]);
                        const data = {
                            "id_user": x,
                            "nama_user": input[x][y].nama_user,
                            "tanggal": y,
                            "waktu_masuk": input[x][y].IN?.clock,
                            "waktu_pulang": input[x][y].OUT?.clock,
                            "status_masuk": input[x][y].IN?.status,
                            "status_pulang": input[x][y].OUT?.status
                        }
                        result.push(data)
                    }
                }
                return result;

            }

            const formattedData = formatData(groupedData)

            res.status(200).json({message: "Success get data",data: formattedData})
        } catch (error) {
            next(error)
        }
    }




}


module.exports = Controller