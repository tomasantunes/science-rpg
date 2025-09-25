var OpenAI = require('openai');
var secretConfig = require('../secret-config.json');

const openai = new OpenAI({
  apiKey: secretConfig.OPENAI_API_KEY
});

async function getQuest(task) {
  var prompt = "Act as a Dungeon Master in a sci-fi RPG and write me a quest. Leave out the XP reward. Limit your quest to no more than 75 words. The quest should end up in the player doing the following task: ";
  prompt += task.description;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{"role": "user", "content": prompt}],
  });
  console.log(completion.choices[0].message);
  var message = completion.choices[0].message;
  return message.content;
}

async function getReportFeedback(action, report) {
  var prompt = "Act as a Dungeon Master in a sci-fi RPG and give some feedback to the player after he has completed a quest and written the following report: \n\n";
  prompt += action + "\n\n" + report;
  prompt += "\n\nUse no more than 75 words.";
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{"role": "user", "content": prompt}],
  });
  console.log(completion.choices[0].message);
  var message = completion.choices[0].message;
  return message.content;
}

module.exports = {
    getQuest,
    getReportFeedback,
    default: {
        getQuest,
        getReportFeedback
    }
};