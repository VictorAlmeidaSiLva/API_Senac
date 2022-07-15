const { type } = require ('os')
const { Sequelize, DataTypes } = require ('sequelize')
require ('dotenv').config()

const sequelize = new Sequelize(process.env.DB_LINK, {dialect:'postgres'})

const Manager = sequelize.define('manager', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

const Schedule = sequelize.define('Schedule',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacher: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    
})

const Classroom = sequelize.define('Classroom',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    footage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    extra: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

})

const Block = sequelize.define('Block',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Address = sequelize.define('Address',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cep: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
})

const Relatory = sequelize.define('Relatory',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
})

Block.hasOne(Address)
Address.belongsTo(Block)

Block.hasMany(Classroom)
Classroom.belongsTo(Block)

Classroom.hasMany(Schedule)
Schedule.belongsTo(Classroom)

Manager.hasMany(Schedule)
Schedule.belongsTo(Manager)

Manager.hasMany(Relatory)
Relatory.belongsTo(Manager)

// Relatory.hasOne(Classroom)
Classroom.belongsToMany(Relatory)

Manager.hasMany(Classroom)
Classroom.belongsTo(Manager)

Block.hasMany(Manager)
Manager.belongsTo(Block)

module.exports.Manager = Manager
module.exports.Schedule = Schedule
module.exports.Classroom = Classroom
module.exports.Block = Block
module.exports.Address = Address
module.exports.Relatory = Relatory
module.exports.sequelize = sequelize
