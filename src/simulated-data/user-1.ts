import { reactive } from 'vue'

const user1 = reactive({
  name: '用户-1',
  userId: 1,
  desc: '我通过了你的朋友验证请求，现在我们可我通过了你的朋友验证请求，现在我们可',
  date: '6月9日',
  avatar: 'user/user-1.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '',
      type: 1
    },
    {
      user: 'otherUser',
      content: '1111111111111',
      type: 1
    },
    {
      user: 'otherUser',
      content: '2222222222222222',
      type: 1
    },

    {
      user: 'otherUser',
      content: '33333333333333333333333333333333333333333333333333333333333',
      type: 1
    },
    {
      user: 'otherUser',
      content: 'test/2.jpg',
      type: 2
    },

    {
      user: 'my',
      content: '4444',
      type: 1
    },
    {
      user: 'my',
      content: '555',
      type: 1
    },
    {
      user: 'otherUser',
      content: 'feng-shang.mp3',
      isAssets: true,
      time: 40,
      type: 3,
      id: 8
    },
    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    },
    {
      user: 'my',
      content: 'huang.mp3',
      isAssets: true,
      time: 10,
      type: 3,
      id: 10
    }
  ]
})

export default user1
