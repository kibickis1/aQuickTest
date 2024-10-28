const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    res.write("<h1>Hello!</h1>");
    return res.end();
  }

  if (req.url === "/users") {
    res.write("<html>");
    res.write("<head><title>Enter Message:</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul>"
    );
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Submit</button></form></body>"
    );
    return res.end();
  }

  if (req.url === "/create-user" && req.method === "POST") {
    const chunkContainer = [];
    req.on("data", (chunk) => {
      chunkContainer.push(chunk);
    });
    req.on("end", () => {
      const decodedChunks = Buffer.concat(chunkContainer).toString();
      const finalDecodedValue = decodedChunks.split("=")[1];
      console.log(`FINAL VALUE IS = ${finalDecodedValue}`);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end(); //REQUIRED FOR ACTION TO END (something like redirect )
    });
  }
});

server.listen(3001);
