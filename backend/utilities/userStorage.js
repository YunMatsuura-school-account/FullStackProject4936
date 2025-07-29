const fs = require("fs");
const path = require("path");

const userFilePath = path.join(__dirname, "../data/users.json");

function getAllUsers() {
  try {
    if (!fs.existsSync(userFilePath)) {
      return [];
    } else {
      const data = fs.readFileSync(userFilePath, "utf8");
      return JSON.parse(data || "[]");
    }
  } catch {
    console.error("Error reading users file: ", err);
    return [];
  }
}

function saveUser(user) {
  const allUsers = getAllUsers();
  allUsers.push(user);

  try {
    fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, 2));
  } catch (err) {
    console.error("Error writing users file: ", err);
  }
}

module.exports = { getAllUsers, saveUser };
