import styles from './TabBar.module.css'

import { TabButton } from '@/UI/TabButton/TabButton'
import type { Info } from '@/types/types'

interface TabBar {
  setArrFilter: (filter: 'all' | 'inWork' | 'completed') => void
  arrFilter: 'all' | 'inWork' | 'completed'
  info: Info
}

export const TabBar = ({ setArrFilter, arrFilter, info }: TabBar) => {
  return (
    <>
      <div className={styles.tabBar}>
        <TabButton
          isDisabled={arrFilter === 'all'}
          text={'Все'}
          count={info.all}
          setArrFilter={() => {
            setArrFilter('all')
          }}
        />
        <TabButton
          text={'Активные'}
          isDisabled={arrFilter === 'inWork'}
          setArrFilter={() => {
            setArrFilter('inWork')
          }}
          count={info.inWork}
        />
        <TabButton
          text={'Завершенные'}
          isDisabled={arrFilter === 'completed'}
          setArrFilter={() => {
            setArrFilter('completed')
          }}
          count={info.completed}
        />
      </div>
    </>
  )
}
