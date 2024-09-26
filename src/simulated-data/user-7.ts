import { reactive } from 'vue'

const user7 = reactive({
  name: '用户-7',
  userId: 7,
  desc: '[转账]已收款',
  date: '6月9日',
  avatar: 'user/user-7.jpg',
  chatList: [
    {
      user: 'otherUser',
      content: '',
      type: 1
    },
    {
      user: 'otherUser',
      content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      type: 1
    },
    {
      user: 'otherUser',
      content:
        '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      type: 1
    },
    {
      user: 'otherUser',
      content:
        '111111111111111111111111111111122222222222222222222222222222233333333333333333333',
      type: 1
    },
    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    },
    {
      user: 'otherUser',
      content: '',
      type: 1
    },
    {
      user: 'otherUser',
      content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      type: 1
    },
    {
      user: 'otherUser',
      content:
        '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      type: 1
    },
    {
      user: 'otherUser',
      content:
        '111111111111111111111111111111122222222222222222222222222222233333333333333333333',
      type: 1
    },
    {
      user: 'my',
      content: 'test/2.jpg',
      type: 2
    }
  ]
})

export default user7
