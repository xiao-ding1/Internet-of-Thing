import qs from 'qs'
const Authorization = sessionStorage.getItem('token')
const query = qs.stringify({ Authorization })
const ws_switch = new WebSocket('ws://113.45.133.116:9999/api/pushMessage/A' + '?' + query)//硬件开关
const ws_num = new WebSocket('ws://113.45.133.116:9999/api/pushMessage/D' + '?' + query)//传感器信息
export{
  ws_switch,
  ws_num
}