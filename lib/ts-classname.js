const camelCase = require('camelcase');

module.exports = (componentName, clasess) => {
return (
`export const style = {
  ${
    Object.keys(clasess).map(c => {
      return ` ${camelCase(c)}: '${clasess[c]}'\n`
    })
  },
};
`);
}
