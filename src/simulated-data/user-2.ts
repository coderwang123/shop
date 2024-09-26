import { reactive } from 'vue'

const user2 = reactive({
  name: '用户-2',
  userId: 2,
  desc: '以上是打招呼的内容',
  date: '6月9日',
  avatar: 'user/user-2.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '222',
      type: 1
    },

    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    }
  ]
})

export default user2
