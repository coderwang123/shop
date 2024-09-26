import { reactive } from 'vue'

const user6 = reactive({
  name: '用户-6',
  userId: 6,
  desc: '[图片]',
  date: '6月9日',
  avatar: 'user/user-6.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '666',
      type: 1
    },

    {
      user: 'my',
      content:
        'mymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymymy',
      type: 1
    }
  ]
})

export default user6
