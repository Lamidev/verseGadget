const Subscriber = require("../../models/subscriber");

const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        const checkExisting = await Subscriber.findOne({ email });

        if (checkExisting) {
            return res.status(400).json({
                success: false,
                message: "You are already subscribed to our newsletter!",
            });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({
            success: true,
            message: "Successfully subscribed to our newsletter!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

module.exports = { subscribeToNewsletter };
