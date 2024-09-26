import { reactive } from 'vue'

const user8 = reactive({
  name: '用户-8',
  userId: 8,
  desc: '[图片]',
  date: '6月9日',
  avatar: 'user/user-8.jpg',
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

export default user8
