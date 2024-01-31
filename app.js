console.log(`Start of app.js`);
const removeVowels = require("./StringFunction");
const express = require("express");
const app = express();
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
console.log(`About to set the pool connection`);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log(`App listen incoming`);
app.listen(3000);

console.log(`Setting View Engine`);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(`Inside .get for /`);
  res.render("index");
});

app.get("/jokes", async (req, res) => {
  console.log(`Inside .get for /jokes`);
  const jokes = await mainTask();
  console.log(`Inside .get for jokes but just before res.render`);
  res.render("jokes", { jokes });
});

app.get("/rolldie", (req, res) => {
  console.log(`Inside .get for /rolldie`);
  res.render("rolldie", { diceRoll, randomSentence, returnRandomOneToFive });
});

app.get("/warhammer", (req, res) => {
  console.log(`Inside .get for /warhammer`);
  res.render("warhammer", { factions });
});

app.get("/reverse/:word", (req, res) => {
  const wordToReverse = req.params.word;
  reversedWord = reverseString(wordToReverse);
  res.send(`This is your word reversed:  ${reversedWord}`);
});

app.get("/Ihatevowels/:word", (req, res) => {
  const vowelsRemoved = removeVowels(req.params.word);
  res.send(`I've disposed of those vowels for you:  ${vowelsRemoved}`);
});

app.get("/add/:num1/:num2", (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const numTotal = num1 + num2;
  res.send(`You gave me 2 numbers, here is there total: ${numTotal}`);
});

app.use((req, res) => {
  console.log(`Inside .get for 404`);
  res.status(404).render("404");
});

const diceRoll = function rollDice() {
  console.log(`Inside diceRoll Function`);
  return Math.floor(Math.random() * 6) + 1;
};

function randomSentence() {
  console.log(`Inside randomSentence function`);
  const subjects = ["cat", "dog", "tree", "house", "car"];
  const verbs = ["runs", "jumps", "sleeps", "eats", "drives"];
  const adjectives = ["happy", "big", "green", "fast", "loud"];
  return `The ${subjects[returnRandomOneToFive()]} ${
    verbs[returnRandomOneToFive()]
  } ${adjectives[returnRandomOneToFive()]}`;
}

function returnRandomOneToFive() {
  console.log(`Inside returnRandom Function`);
  return Math.floor(Math.random() * 5);
}

const factions = [
  {
    name: "Space Marines",
    description: "Elite superhuman warriors defending the imperium.",
    imageUrl:
      "https://www.warhammer-community.com/wp-content/uploads/2020/02/951b489c.jpg",
  },
  {
    name: "Chaos",
    description: "Corrupted warriors serving the dark powers of Chaos.",
  },
  {
    name: "Orkz",
    description: "Savage and war-loving, green skinned xenos horde.",
  },
  {
    name: "Tyranids",
    description: "Alien Swarm consuming all life for the Hive Mind.",
  },
];

async function mainTask() {
  console.log(`Inside mainTask DB Query Function`);
  const dbResult = await pool.query("select * from jokes");
  return dbResult.rows;
}

function reverseString(inputString) {
  return inputString.split("").reverse().join("");
}
