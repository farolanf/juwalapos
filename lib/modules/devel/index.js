const HttpStatus = require('http-status-codes')

module.exports = {

  afterConstruct(self) {
    self.addTasks()
    self.useMiddleware()
  },

  construct(self, options) {

    self.useMiddleware = () => {
      self.apos.app.use((req, res, next) => {
        const output = req.method.padEnd(8, ' ') + req.path
        next()
        const color = res.statusCode === 200 ? '\x1b[92m' : '\x1b[91m'
        const status = `${res.statusCode} - ${HttpStatus.getStatusText(res.statusCode)}`
        console.log(color + output, status + '\x1b[0m')
      })
    }

    self.addTasks = () => {
      self.apos.tasks.add(self.__meta.name, 'routes', async (apos, argv) => {
        const routes = apos.app._router.stack
          .filter(layer => layer.route && layer.route.path)
          .map(layer => {
            const methods = Object.keys(layer.route.methods).join(',').toUpperCase()
            return `${methods}\t${layer.route.path}`
          })
        console.log(routes.join('\n'))
      })
    }
  }
}