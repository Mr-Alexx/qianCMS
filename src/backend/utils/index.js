import scriptjs from 'scriptjs'

const fetchScript = async function (url) {
  return new Promise(resolve => {
    scriptjs(url, () => {
      resolve()
    })
  })
}

export {
  fetchScript
}
