import axios from 'axios';

export const getBabyComeHome = async ()  => {
  return await axios.get('https://qzone.qq.com/gy/404/data.js')
}