const {getDb} = require("./db");


module.exports = {
    getAllJokes: async () => {
        return await getDb().models.Jokes.findAll();
    },
    getJokeById: async (id) => {
        return await getDb().models.Jokes.findByPk(id);
    },
    createJoke: async (text,author ,points = 0, userId) => {
        const newJoke = await getDb().models.Jokes.create({
            text,
            author,
            userId,
            points
        });
        const user = await getDb().models.User.findByPk(userId);
        await newJoke.setUser(user);
        return newJoke;
    },
}
