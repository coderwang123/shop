import { reactive } from 'vue'

const user5 = reactive({
  name: '用户-5',
  userId: 5,
  desc: '我通过了你的朋友验证请求，现在我们可我通过了你的朋友验证请求，现在我们可',
  date: '6月9日',
  avatar: 'user/user-5.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '555',
      type: 1
    },

    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    }
  ]
})

export default user5
