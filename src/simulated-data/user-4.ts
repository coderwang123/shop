import { reactive } from 'vue'

const user4 = reactive({
  name: '用户-4',
  userId: 4,
  desc: '我通过了你的朋友验证请求，现在我们可我通过了你的朋友验证请求，现在我们可',
  date: '6月9日',
  avatar: 'user/user-4.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '444',
      type: 1
    },

    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    }
  ]
})

export default user4
