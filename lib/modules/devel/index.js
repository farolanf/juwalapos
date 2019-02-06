module.exports = {

  afterConstruct(self) {
    self.addTasks()
  },

  construct(self, options) {

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