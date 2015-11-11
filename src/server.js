
import koa from "koa"

const app = new koa()

app.use(renderPage)

app.listen(3000, () => console.log('server started'))