const fs = require("fs");

const POST = (req, res) => {
  const { firstName, lastName, email, phone, password, address } = req.body;
  if (!firstName || !lastName || !email || !phone || !password || !address) {
    res.send("Ma'lumotlar to'liq emas!");
  }
  let users = fs.readFileSync(process.cwd() + "/database/users.json", "UTF-8");
  users = users ? JSON.parse(users) : [];
  req.body.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(req.body);
  fs.writeFileSync(
    process.cwd() + "/database/users.json",
    JSON.stringify(users, null, 2)
  );
  res.json({
    message: "Foydalanuvchi yaratildi!",
    status: 201,
    data: req.body,
  });
};

const LOGIN = (req, res) => {
  const { email, password } = req.body;
  let users = fs.readFileSync(process.cwd() + "/database/users.json", "UTF-8");
  users = users ? JSON.parse(users) : [];

  if (users.every((e) => e.email != email || e.password != password)) {
    return res
      .status(400)
      .json({ success: false, message: "Email yoki password noto'g'ri!" });
  }
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email yoki password kiritilmadi!" });
  } else {
    return res.status(200).json({ success: true /*token qaytariladi*/ });
  }
};

module.exports = {
  POST,
  LOGIN,
};
