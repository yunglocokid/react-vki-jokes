const {getDb} = require("./db");

const TABLE_NAME = "topics";

module.exports = {
    getAllTopics: async () => {
        return await getDb().models.Topic.findAll();
    },
    getTopicById: async (id) => {
        return await getDb().models.Topic.findByPk(id);
    },

    createTopic: async (author, text, points = 0, userId) => {
        const newTopic = await getDb().models.Topic.create({
            author,
            userId,
            text,
            points,
        });
        const user = await getDb().models.User.findByPk(userId);
        await newTopic.setUser(user);
        return newTopic;
    },
    addPointById: async (id, points) => {
        return await getDb().models.Topic.upsert(
            {
                id: id,
                points: points + 1,
            },)
    },
    deletePointById: async (id, points) => {
        return await getDb().models.Topic.upsert(
            {
                id: id,
                points: points - 1,
            },)
    }
}
