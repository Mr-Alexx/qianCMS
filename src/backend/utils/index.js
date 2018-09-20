import scriptjs from 'scriptjs'

const fetchScript = async function (url) {
  return new Promise(resolve => {
    scriptjs(url, () => {
      resolve()
    })
  })
}

const cloneDeep = (data) => {
  return JSON.parse(JSON.stringify(data))
}

export {
  fetchScript,
  cloneDeep
}
