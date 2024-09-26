import { reactive } from 'vue'

const user3 = reactive({
  name: '用户-3',
  userId: 3,
  desc: '以上是打招呼的内容',
  date: '6月9日',
  avatar: 'user/user-3.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '333',
      type: 1
    }
  ]
})

export default user3
