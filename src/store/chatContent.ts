import { defineStore } from 'pinia'
import user1 from '@/simulated-data/user-1'
import user2 from '@/simulated-data/user-2'
import user3 from '@/simulated-data/user-3'
import user4 from '@/simulated-data/user-4'
import user5 from '@/simulated-data/user-5'
import user6 from '@/simulated-data/user-6'
import user7 from '@/simulated-data/user-7'
import user8 from '@/simulated-data/user-8'
import user9 from '@/simulated-data/user-9'
import type { LocationQueryValue } from 'vue-router'

interface IChatContentStore {
  allUserChatList: any[]
  currentUserChatList: any[]
  currentRecordsInfo: any
}

// type 1文字 2图片 3语音

export const useChatContentStore = defineStore('chatContent', {
  state: (): IChatContentStore => {
    return {
      allUserChatList: [
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9
      ],
      currentUserChatList: [],

      currentRecordsInfo: {}
    }
  },
  actions: {
    setCurrentUserChatList(name?: string) {
      if (name) {
        this.currentUserChatList = this.allUserChatList.filter((item) =>
          item.name.includes(name)
        )
      } else {
        this.currentUserChatList = this.allUserChatList
      }
    },
    getCurrentRecordsByUserId(userId: string | null | LocationQueryValue[]) {
      if (userId) {
        this.currentRecordsInfo = this.allUserChatList.find(
          (item) => item.userId == userId
        )
      } else {
        this.currentRecordsInfo = {}
      }
    },
    addRecordByUserId(obj: any) {
      this.currentRecordsInfo.chatList.push(obj)
    },
    switchCurrentRecordRoleData() {
      this.currentRecordsInfo.chatList.forEach((item: any) => {
        if (item.user === 'otherUser') {
          item.user = 'my'
        } else {
          if (item.user === 'my') {
            item.user = 'otherUser'
          }
        }
      })
    }
  }
})
